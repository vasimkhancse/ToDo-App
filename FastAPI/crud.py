# crud.py
from bson import ObjectId
from database import collection
from models import ItemModel, UpdateItemModel,all_datas

async def create_item(item: ItemModel) -> dict:
    item = item.dict()
    collection.insert_one(item)
    return item

async def retrieve_item(id: str) -> dict:
    item =  collection.find_one({"_id": ObjectId(id)})
    return item

async def retrieve_items() -> list:
    items = collection.find()
    return all_datas(items)

async def update_item(id: str, data: UpdateItemModel) -> bool:
    data = {k: v for k, v in data.dict().items() if v is not None}
    if len(data) == 0:
        return False
    result =  collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return result.modified_count > 0

async def delete_item(id: str) -> bool:
    result =  collection.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
