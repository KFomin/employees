export interface Tag {
  _id: string;
  name: string;
}

export interface Office {
  _id: string;
  name: string;
  city: string;
}

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  officeId: Office;
  birthdate: string;
  phoneNo: string;
  tags: Tag[];
}
