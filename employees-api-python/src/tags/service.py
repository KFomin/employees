from bson import ObjectId
from .schema import Tag, TagDto
from ..db import db

tag_collection = db.tags


async def find_all():
    cursor = tag_collection.find()
    tags = []
    async for doc in cursor:
        doc['id'] = str(doc['_id'])
        tags.append(doc)
    return tags


async def search(search_text: str):
    regex = {'$regex': search_text, '$options': 'i'}
    cursor = tag_collection.find({'name': regex})
    tags = []
    async for doc in cursor:
        doc['id'] = str(doc['_id'])
        tags.append(doc)
    return tags


async def create(tag: Tag):
    result = await tag_collection.insert_one(tag.dict())
    new_tag = await tag_collection.find_one({'_id': result.inserted_id})
    new_tag['id'] = str(new_tag['_id'])
    return new_tag


async def update(_id: str, update_tag: TagDto):
    res = await tag_collection.find_one_and_update(
        {'_id': ObjectId(_id)},
        {'$set': update_tag.dict()},
        return_document=True
    )
    if not res:
        return None
    res['id'] = str(res['_id'])
    return res


async def delete(_id: str):
    await tag_collection.delete_one({'_id': ObjectId(_id)})
