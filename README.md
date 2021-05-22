# RFQ - CRES
> Web Application for Tender and Proposals Management

## Prerequisites

- [nodejs](https://nodejs.org/en/)
- [docker](https://www.docker.com/)

## Local Environment

1. Clone the project
2. Run the following commands

```
cd rfq-local-buying-program
docker-compose up
npm install
npm run db:migrate
npm run dev
```

3. You should be able to access the website on `localhost:3000`

**Main Branches:**

- master
- develop (Default target branch)
