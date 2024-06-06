# models.py
from pydantic import BaseModel, Field
from typing import Optional,Literal

class ItemModel(BaseModel):
    title: str
    description: str
    status: Literal['todo', 'completed']
    

class UpdateItemModel(BaseModel):
    title: Optional[str]=None
    description: Optional[str]=None
    status:Optional[ Literal['todo', 'completed']]=None

def individual_data(todo):
    return{
    'id':str(todo["_id"]),
    'title': todo["title"],
    'description': todo["description"],
    'status': todo["status"]

    }

def all_datas(todos):
    return [individual_data(todo) for todo in todos]
   