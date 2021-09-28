# Request for Quote Web Service for Local Buying Program
> Web application for tender and proposals management developed by Queensland University of Technology IFN 711. 
> <br/>
> Project Period - March 2021 to June 2021.

## Overview
![image of home page](https://user-images.githubusercontent.com/35501963/135051674-6cd2cc2e-1318-4503-8e67-bf630e9f5456.png)

## Motivation
**Local Buying Program (LBP)**  is being operated in which small local businesses can supply goods and services to large business partners. Large scale buyers should be able to post their sourcing needs to the web portal requesting a quote from the small local businesses. **A RFQ system is not present in the current web portal.** Therefore sourcing supply and matching buyers require manual input. An online RFT system will free up LBP employees, allow for quicker response times and broader partner matching, **resulting in more competitive tender prices.**

## Site Map
![image of site map](https://user-images.githubusercontent.com/35501963/135054475-83a140c9-168e-47b4-ab35-bc6f3ff509d5.png)

## Restful API
### User API
![image of user api](https://user-images.githubusercontent.com/35501963/135068676-be3f9488-4093-4f0c-ba43-fed9e5ca8c79.png)

### Supplier API
![image of supplier api](https://user-images.githubusercontent.com/35501963/135068735-9a9b0436-a11d-41ef-ac18-cba49f8fb87b.png)

### Buyer API
![image of buyer api](https://user-images.githubusercontent.com/35501963/135068763-d30fa176-8b02-471e-90ac-f1cbd16e35fa.png)

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
