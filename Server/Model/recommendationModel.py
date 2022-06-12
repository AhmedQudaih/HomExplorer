print("Welcome in recommendation")

import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pandas as pd
from surprise import Dataset
from surprise import accuracy
from surprise import KNNWithMeans
from surprise import Reader
from operator import itemgetter

#pip install surprise to install model libs
#pip install pymongo to install mongo for python

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
UserID = ""# the userID should be in this form "625cc5d60803f00590a76333" ## user id in strinfy form
estate_results = Estate_collection.find()
myestates = []
for estate in estate_results:
   myestates.append(str(estate["_id"]))
predections = []
for estate in myestates:
   predection = {"iid": estate,
   "rate": algo.predict(uid=UserID, iid=estate).est
   }
   predections.append(predection)
   print(predection)
recommended = sorted(predections, key=itemgetter('rate'), reverse=True)
## return recommended
