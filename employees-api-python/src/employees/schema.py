from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class EmployeeBase(BaseModel):
    firstName: str
    lastName: str
    phoneNo: str
    birthdate: date
    officeId: str
    tags: List[str]

class EmployeeCreateUpdate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: str

    class Config:
        orm_mode = True
