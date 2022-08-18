# Storefront Backend Project



## Install Dependencies

```
npm install
```


## Database Setup (postgresSQL)

- Database info:

* Host: 127.0.0.1
* Database user: "wanje"
* Database name: "second_db"
* Test database name: "second_test_db"

- Database setup:

```
  CREATE USER wanje WITH PASSWORD 'password123' SUPERUSER;
  CREATE DATABASE second_db OWNER wanje ENCODING UTF8; 
  CREATE DATABASE second_test_db OWNER wanje ENCODING UTF8; 
 
```


## Environment variables

* Create a .env file and copy the following into it:

```
POSTGRES_HOST=127.0.0.1 
POSTGRES_DB=second_db
POSTGRES_TEST_DB=second_test_db
POSTGRES_USER=wanje 
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=solana-is-the-best! 
SALT_ROUNDS=10
TOKEN_SECRET=profchoi-is-the-best!

```

### 2.  DB Creation and Migrations


``` 
npm run migrate:up
```

### 3. Starting the project
```
npm start
```

### 4. Running the tests
```
npm test
```
