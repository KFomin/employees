from .schema import EmployeeCreateUpdate
from bson import ObjectId
from ..db import db
import datetime

employee_collection = db.employees


async def find_all():
    cursor = employee_collection.find()
    employees = []
    async for document in cursor:
        document['id'] = str(document['_id'])
        # Обработка birthdate
        if isinstance(document.get('birthdate'), datetime.datetime):
            document['birthdate'] = document['birthdate'].date()
        # Обработка офисных ID
        if 'officeId' in document:
            document['officeId'] = str(document['officeId'])
        # Обработка тегов
        if 'tags' in document:
            document['tags'] = [str(tag_id) for tag_id in document['tags']]
        employees.append(document)
    return employees


async def search(query: str):
    if not query:
        return await find_all()
    regex = {'$regex': query, '$options': 'i'}
    pipeline = [
        {
            '$lookup': {
                'from': 'tags',
                'localField': 'tags',
                'foreignField': '_id',
                'as': 'tagDetails'
            }
        },
        {
            '$lookup': {
                'from': 'offices',
                'localField': 'officeId',
                'foreignField': '_id',
                'as': 'officeDetails'
            }
        },
        {
            '$match': {
                '$or': [
                    {'firstName': regex},
                    {'lastName': regex},
                    {'phoneNo': regex},
                    {'tagDetails.name': regex},
                    {'officeDetails.name': regex}
                ]
            }
        },
        {
            '$project': {
                '_id': 1,
                'firstName': 1,
                'lastName': 1,
                'phoneNo': 1,
                'birthdate': 1,
                'officeId': {'$arrayElemAt': ['$officeDetails', 0]},
                'tags': '$tagDetails'
            }
        }
    ]
    cursor = employee_collection.aggregate(pipeline)
    result = []
    async for doc in cursor:
        doc['id'] = str(doc['_id'])
        result.append(doc)
    return result


async def create(employee_data: EmployeeCreateUpdate):
    doc = employee_data.dict()
    result = await employee_collection.insert_one(doc)
    new_employee = await employee_collection.find_one({'_id': result.inserted_id})
    new_employee['id'] = str(new_employee['_id'])
    return new_employee


async def delete(_id: str):
    result = await employee_collection.delete_one({'_id': ObjectId(_id)})
    if result.deleted_count == 0:
        raise Exception("Employee not found")


async def update(_id: str, employee_data: EmployeeCreateUpdate):
    update_result = await employee_collection.find_one_and_update(
        {'_id': ObjectId(_id)},
        {'$set': employee_data.dict()},
    )
    if not update_result:
        return None
    update_result['id'] = str(update_result['_id'])
    return update_result
