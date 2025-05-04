from pydantic import BaseModel

class OfficeDto(BaseModel):
    name: str
    city: str

class Office(OfficeDto):
    id: str

    class Config:
        orm_mode = True
