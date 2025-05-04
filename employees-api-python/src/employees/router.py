from fastapi import APIRouter, HTTPException, Query, Body
from typing import List, Optional
from .schema import Employee, EmployeeCreateUpdate
from .service import search, create, update, delete, find_all

router = APIRouter()


@router.get("/", response_model=List[Employee])
async def get_(query: Optional[str] = Query(None)):
    if query:
        return await search(query)
    return await find_all()


@router.post("/", response_model=Employee)
async def create_(employee: EmployeeCreateUpdate = Body(...)):
    return await create(employee)


@router.delete("/{id}")
async def delete_(_id: str):
    try:
        await delete(_id)
        return {"message": "Employee deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{id}", response_model=Employee)
async def update_(_id: str, employee: EmployeeCreateUpdate = Body(...)):
    updated_employee = await update(_id, employee)
    if not updated_employee:
        raise HTTPException(status_code=400, detail="Employee not found.")
    return updated_employee
