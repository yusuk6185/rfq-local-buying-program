# Request for Quote Web Service for Local Buying Program
> Web application for tender and proposals management developed by IFN 711 Group 5 of QUT. 
> <br/>
> Project Period - March 2021 to June 2021.

## Prerequisites

- [nodejs](https://nodejs.org/en/)
- [docker](https://www.docker.com/)

## Overview
![image of home page](https://user-images.githubusercontent.com/35501963/135051674-6cd2cc2e-1318-4503-8e67-bf630e9f5456.png)

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

## Motivation
**Local Buying Program (LBP)**  is being operated in which small local businesses can supply goods and services to large business partners. Large scale buyers should be able to post their sourcing needs to the web portal requesting a quote from the small local businesses. **A RFQ system is not present in the current web portal.** Therefore sourcing supply and matching buyers require manual input. An online RFT system will free up LBP employees, allow for quicker response times and broader partner matching, **resulting in more competitive tender prices.**

## Design
The web application consists of a solution design that incorporates a large majority of
skills and knowledge that were acquired during the Master of Information Technology
degree. 

### Application Structure and Framework
The application has two parts, **front-end side** and **back-end side**. The front-end side
consists of web pages, which allow users to interact with the application visually. The
back-end side contains APIs and server services to handle front-end requests and database
queries. To develop the application, **NextJS was used as the core framework** to develop both the
client-side and server-side. Other libraries and frameworks such as **React-Bootstrap** were used for the visual design
components in the web pages, and **Sequelize** was used as the ORM (Object Relational
Mapping) framework to query data. The database of the application uses **PostgreSQL**.

## Site Map
![image of site map](https://user-images.githubusercontent.com/35501963/135054475-83a140c9-168e-47b4-ab35-bc6f3ff509d5.png)

## RESTful API
This section shows the **route between pages and APIs**. RESTful API is an interface
used for client-side functions to communicate with server-side functions. It has several
benefits such as flexible and concise routing.
Same as the site map above, the **colour of points represents the roles** of the user or
shared pages, and yellow points are the corresponding APIs. The routes of pages are also
included in the pictures.

#### User API
![image of user api](https://user-images.githubusercontent.com/35501963/135069740-9d610533-7797-4bb2-8e07-1328b3c45243.png)

#### Supplier API
![image of supplier api](https://user-images.githubusercontent.com/35501963/135069855-e0f120a4-53ae-4d8d-a5c0-b47e48b1b514.png)

#### Buyer API
![image of buyer api](https://user-images.githubusercontent.com/35501963/135069932-f72ebc92-5561-4194-97c2-fd8399250cf7.png)

## Detail View
#### Quote Submission Page
![image for quote submission page](https://user-images.githubusercontent.com/35501963/135072240-2853a20b-1bfc-470b-bc34-f729ab7577ed.png)

#### Project Detail Page
![image for project detail page](https://user-images.githubusercontent.com/35501963/135073237-b28dbec1-0443-471b-a42b-8552a483386f.png)

#### My Projects Page
![image for my projects page](https://user-images.githubusercontent.com/35501963/135072472-782e5e60-51ac-44f3-803a-c4276e23e1dd.png)

