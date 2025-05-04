from fastapi import APIRouter, HTTPException, Query, Body
from typing import List, Optional
from .schema import Office, OfficeDto
from .service import search, find_all, create, update, is_office_used, delete

router = APIRouter()


@router.get("/", response_model=List[Office])
async def get_(query: Optional[str] = Query(None)):
    if query:
        return await search(query)
    return await find_all()


@router.post("/", response_model=Office)
async def create_(office: Office = Body(...)):
    return await create(office)


@router.put("/{id}", response_model=Office)
async def update_(id: str, update_office: OfficeDto = Body(...)):
    result = await update(id, update_office)
    if not result:
        raise HTTPException(status_code=404, detail="Office not found")
    return result


@router.delete("/{id}")
async def delete_(id: str):
    # Проверка, используется ли офис
    in_use = await is_office_used(id)
    if in_use:
        raise HTTPException(status_code=400, detail="Cannot delete office because it is in use by an employee.")
    await delete(id)
    return {"message": "Office deleted"}
