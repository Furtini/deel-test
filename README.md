# DEEL BACKEND

This backend exercise involves building a Node.js/Express.js app that will serve a REST API.

## Data Models

> **All models are defined in src/models/index.js**

### Profile

- A profile can be either a `client` or a `contractor`.
- Clients create contracts with contractors.
- A contractor does jobs for clients and get paid.
- Each profile has a balance property.

### Contract

- A contract is a link between a client and a contractor.
- Contracts have 3 statuses, `new`, `in_progress`, `terminated`.
- Contracts are considered active only when in status `in_progress`
- Contracts group jobs within them.

### Job

- A contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. Using node>=16.

1. Start by cloning this repository.

2. In the repo root directory, run `yarn install` to gather all dependencies.

3. Next, `yarn run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

4. Then run `yarn start` which should start both the server and the React client.

5. For debuggin, thers a .vscode folder with a Launch.json configuration for vscode.

## Technical Notes

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## Project structure

The project is organize as follows:

- The `domain` folder contains all the basic business domains.

  - Each domain have a set of routes, controllers and services
  - The majority of the business rules are implemented in the services class

- The database calls are under `infra/db` folder.
  - Each model have its corresponding repository, responsible for building and running the queries.
  - It is still missing some basic queries.

## APIs Implemented

1. **_GET_** `/contracts/:id` - Return the contract based on the profile_id passed in the request header.

   1. When theres no contract for a given profile, return NotFount(404)

2. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list contains non terminated contracts.

   1. When there is no contract for a given profile, return empty array

3. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.

   1. When there is no unpaid job, return empty array

4. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount is moved from the client's balance to the contractor balance.

   1. Setting the payment date to now()
   2. The amount is passed in the request body as { "amount": number }
   3. I'm not sure if I should valided the profile requesting the payment. Leaving without this validation for now.

5. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client. A client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

   1. Throws and error when trying to deposit mode then 25% of his total jobs to pay.
   2. I'm assuming the client jobs to pay includes new and in_progress jobs.

6. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

   1. Returns:`{ [key: Profession]: number }`
   2. If there's a tie beetween professions, returns all of then.

7. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients that paid the most for jobs in the query time period. Limiting by query parameter, default limit is 2.

   1. I could not think of a single query to do all, so I limit the result after I found all clients and there payments. I need to think more about this query to avoid bringing all jobs to memory.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

## Improvements

I did not make all validations necessary, for lack of time. So I'm assuming we are passing the correct values and date types. Another improvment will be adding this type of validations.

1.  Create more testes (maybe adding supertest for http requests)
    1.  Add unity tests for some basic operations, like checking the 25% rule.
2.  Create a error handler class to handle erros
3.  Create specific error classes. Eg. NotFoundError, UnauthorizedError, etc
4.  Encapsulate the express framework
5.  Improve the queries, if possible (specially the admin ones).
6.  Add typescript when possible
7.  Add eslint
8.  Break the model file into especific ones for each model.
9.  Add more repo functions and completelly remove model requirement from domain folder.
10. Add more query builder helper functions.
11. Add route validations
