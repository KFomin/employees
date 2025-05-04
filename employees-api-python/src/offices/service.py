from bson import ObjectId
from .schema import Office, OfficeDto
from ..db import db

office_collection = db.offices
employee_collection = db.employees


async def find_all():
    cursor = office_collection.find()
    offices = []
    async for doc in cursor:
        doc['id'] = str(doc['_id'])
        offices.append(doc)
    return offices


async def search(search_text: str):
    regex = {'$regex': search_text, '$options': 'i'}
    cursor = office_collection.find({
        '$or': [
            {'name': regex},
            {'city': regex}
        ]
    })
    offices = []
    async for doc in cursor:
        doc['id'] = str(doc['_id'])
        offices.append(doc)
    return offices


async def create(office: Office):
    result = await office_collection.insert_one(office.dict())
    new_office = await office_collection.find_one({'_id': result.inserted_id})
    new_office['id'] = str(new_office['_id'])
    return new_office


async def update(_id: str, update_office: OfficeDto):
    res = await office_collection.find_one_and_update(
        {'_id': ObjectId(_id)},
        {'$set': update_office.dict()},
        return_document=True
    )
    if not res:
        return None
    res['id'] = str(res['_id'])
    return res


async def delete(_id: str):
    await office_collection.delete_one({'_id': ObjectId(_id)})


async def is_office_used(_id: str) -> bool:
    count = await employee_collection.count_documents({'officeId': ObjectId(_id)})
    return count > 0
