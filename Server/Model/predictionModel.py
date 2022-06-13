import sys
import os
import json
import streamlit as st
import pandas as pd
import warnings
from sklearn.model_selection import train_test_split
from sklearn import datasets
from sklearn import ensemble
warnings.filterwarnings('ignore')

cwd = os.getcwd()
df = pd.read_csv("../Data/predictionModelData.csv") #read data
X = df.drop(["price","Address","Title"],axis=1)
Y = df["price"]
X_train, X_test, y_train, y_test = train_test_split(X,Y,test_size=.2, random_state=5)

clf = ensemble.GradientBoostingRegressor(n_estimators=300,max_depth=2,learning_rate=0.15,loss="huber")
clf.fit(X_train,y_train)
#print("accuracy:",clf.score(X_test,y_test)) #model accuracy

data = sys.argv[1].split(",")
print(clf.predict([data])[0])  #prdict price
