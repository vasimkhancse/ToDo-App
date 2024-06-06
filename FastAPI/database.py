from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId

uri = "mongodb+srv://vasimkhancse:12345@cluster.igi9r0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

database = client.my_database
collection = database['todo']
