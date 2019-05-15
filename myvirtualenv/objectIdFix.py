from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
mydb = client["lotr"]
mycol = mydb["characters"]

string = "ObjectId(1234)"
newString = string.split("(")[1]
print(newString)
finalString = newString.split(")")[0]
print(str(finalString))