import pymongo
import os
import pickle
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pandas as pd
from surprise import Dataset
from surprise import accuracy
from surprise import KNNWithMeans
from surprise import Reader
from operator import itemgetter
import warnings
warnings.simplefilter("ignore", category=RuntimeWarning)
cwd = os.getcwd()
client = MongoClient("mongodb://wamb:wamb123@homeexplorerdb-shard-00-00.ykmn0.mongodb.net:27017,homeexplorerdb-shard-00-01.ykmn0.mongodb.net:27017,homeexplorerdb-shard-00-02.ykmn0.mongodb.net:27017/?ssl=true&replicaSet=atlas-l781p1-shard-0&authSource=admin&retryWrites=true&w=majority")
try:
   client.admin.command('ismaster')
except ConnectionFailure:
   print("Server not available")
userid=[]
estateid=[]
rates=[]

db = client["HomExplorer"]
rate_collection = db["rates"]
Estate_collection = db["estates"]
results  = rate_collection.find()
for result in results:
   userid.append(str(result['userId']))
   estateid.append(str(result['estateId']))
   rates.append(result['rate'])
myratings = {
"item" : estateid,
"user" : userid,
"rate": rates
}
df = pd.DataFrame(myratings)

reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(df[["user", "item", "rate"]],reader=reader)
sim_options ={
   "name": "cosine",
   "user_based": False
}
algo = KNNWithMeans(sim_options=sim_options)
trainingSet = data.build_full_trainset()
algo.fit(trainingSet)

with open (cwd+"\Data\estateRecommendationModel",'wb') as f:
    pickle.dump(algo,f)

print("Model Trained")
