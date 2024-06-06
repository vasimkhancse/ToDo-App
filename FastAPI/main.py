# main.py
from typing import List
from fastapi import FastAPI, HTTPException
from models import ItemModel, UpdateItemModel
from crud import (
    create_item, retrieve_item, retrieve_items, update_item, delete_item
)
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost:5173",  # Vite's default port for frontend development
    "http://127.0.0.1:5173",  # Vite's default port for frontend development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/add_todo/", response_description="Add new item", response_model=ItemModel)
async def add_item(item: ItemModel):
    new_item = await create_item(item)
    return new_item

@app.get("/todo/{id}", response_description="Get a single item", response_model=ItemModel)
async def get_item(id: str):
    item = await retrieve_item(id)
    if item is None:
        raise HTTPException(status_code=404, detail=f"Item {id} not found")
    return item

@app.get("/show_todos/", response_description="List all items")
async def get_items():
    items = await retrieve_items()
    return items

@app.put("/update_todo/{id}", response_description="Update an item",response_model=UpdateItemModel)
async def update_item_data(id: str, item: UpdateItemModel):
    updated = await update_item(id, item)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Item {id} not found")
    return await retrieve_item(id)

@app.delete("/delete_todo/{id}", response_description="Delete an item")
async def delete_item_data(id: str):
    deleted = await delete_item(id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Item {id} not found")
    return {"message": "Item deleted successfully"}

