from fastapi import APIRouter, HTTPException, Query, Body
from typing import List, Optional
from .schema import Tag, TagDto
from .service import search, find_all, update, delete, create

router = APIRouter()


@router.get("/", response_model=List[Tag])
async def get_(query: Optional[str] = Query(None)):
    if query:
        return await search(query)
    return await find_all()


@router.post("/", response_model=Tag)
async def create_(tag: Tag = Body(...)):
    return await create(tag)


@router.put("/{id}", response_model=Tag)
async def update_(_id: str, update_tag: TagDto = Body(...)):
    result = await update(_id, update_tag)
    if not result:
        raise HTTPException(status_code=404, detail="Tag not found")
    return result


@router.delete("/{id}")
async def delete_(_id: str):
    await delete(_id)
    return {"message": "Tag deleted"}
