# HackerTrail assessment

This project is built on top of Next.js with Typescript, Prisma Client, Nexus Schema and GraphQl. It uses a SQLite database file with some initial dummy data populated using Faker.js through a seeder script.
<br/><br/>

## Getting started

<br/>

### 1. Install dependencies using "yarn" or "npm"

<br/>

The default package manager that's been used for this project is Yarn.

<br/>

```
yarn install
```

```
npm install
```

<br/>

### 2. Run the project after the installation is done using:

<br/>

```
yarn dev
```

```
npm run dev
```

You'll be be able to access the web app through <strong>http://localhost:4001</strong> where you'll be redirected to the account settings page of the first user, queried by the system.

<br/><br/>

## Inspect dummy data in the database

<br/>

Using Prisma Studio, you'll have access to a visual interface to the data in the database.
You can access the tool using:

<br/>

```
yarn run:studio
```

<br/><br/>

## Reset and re-seeding the database

<br/>

```
yarn reset:db
```
