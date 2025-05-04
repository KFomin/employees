from pydantic import BaseModel

class TagDto(BaseModel):
    name: str

class Tag(TagDto):
    id: str

    class Config:
        orm_mode = True
