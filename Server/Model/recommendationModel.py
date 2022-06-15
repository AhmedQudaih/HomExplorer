import sys
import pymongo
import json
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


db = client["HomExplorer"]
Estate_collection = db["estates"]
UserID = sys.argv[1]
estate_results = Estate_collection.find({'status':"approve"})


with open (cwd+"\Data\estateRecommendationModel",'rb') as f:
    mymodel=pickle.load(f)

myestates = []

for estate in estate_results:
   myestates.append(str(estate["_id"]))
predections = []
for estate in myestates:
   predection = {"iid": estate,
   "rate": mymodel.predict(uid=UserID, iid=estate).est
   }
   predections.append(predection)

recommended = sorted(predections, key=itemgetter('rate'), reverse=True)
recommendedIds = []
for id in recommended[:20]:
   recommendedIds.append(id["iid"])
print(json.dumps(recommendedIds))
