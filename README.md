# Employee Management API 🌐

This project provides a simple API for managing employees, offices, and tags. It is built using NestJS and connects to a MongoDB database. Below you'll find details on the database structure, setup instructions, and how to run both the API and client.

## Database Structure 🗄️

The database named **employees_db** contains the following collections:

### 1. Employees Collection

Each employee document has the following structure:

```json
{
  "_id": {
    "$oid": "6800c9ae84576fa09f487074"
  },
  "firstname": "John",
  "lastname": "Doe",
  "officeId": {
    "$oid": "6800c43fbe5364fb0fd1c533"
  },
  "birthdate": {
    "$date": "1990-01-01T00:00:00.000Z"
  },
  "phoneNo": "123-456-7890",
  "tags": [
    {
      "$oid": "6800c4e6599a60acb2a69a5d"
    }
  ]
}
```

### 2. Offices Collection

Each office document has the following structure:

```json
{
  "_id": {
    "$oid": "6800c43fbe5364fb0fd1c533"
  },
  "name": "Tallinn Office",
  "city": "Tallinn"
}
```

### 3. Tags Collection

Each tag document has the following structure:

```
{
  "_id": {
    "$oid": "6800c4e6599a60acb2a69a5d"
  },
  "name": "Tag1"
}
```

### Connecting to MongoDB 📦

To connect to the MongoDB database, we are using a connection string stored in a .env file. This file is not included in the repository for security reasons.

Steps to create a .env file:
Create a file named .env in the root of the project.

Add the following line to the .env file:

```
MONGODB_URI=*I'll provide value for URI in e-mail letter*
```

### Setting Up and Running the API Locally 🚀

Clone the repository:

```
git clone https://github.com/KFomin/employees/tree/main/employees-api
```

Move to the folder:

```
cd employees-api
```

Install dependencies:

```
npm install
```

Create your .env file using the instructions provided above.

Run the API:

```
npm run start
```

The API will be running on http://localhost:3000.

### Setting Up and Running the Client Locally 💻

Clone the client repository (if separate) or navigate to the client folder in the main repository.

```
git clone https://github.com/KFomin/employees/tree/main/employees-client
```

```
cd employees-client
```

Install dependencies:
```
npm install
```
Run the client:

```
ng serve
```
The client will be running on http://localhost:4200.
