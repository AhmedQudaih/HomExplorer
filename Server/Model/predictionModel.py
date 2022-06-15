import pickle
import sys
import os
import warnings
warnings.filterwarnings('ignore')

cwd = os.getcwd()
data = sys.argv[1].split(",")

with open (cwd+"\Data/estatePredicitonModel",'rb') as f:
    mymodel=pickle.load(f)
    print(mymodel.predict([data])[0])
