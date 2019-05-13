import pymongo

from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')

db = client['lotr']
collection = db.movies
print (collection)
