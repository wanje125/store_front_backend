# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products Endpoints
* Index all products : [GET] '/products'

* Show product by Id: [GET] '/products/:id'

* Create new product : [POST] '/products'

{ 
    "name": "laptop1",
    "price": 200,
    "category": "laptop" 
}

* Delete product by Id: [DELETE] '/products/:id'


#### Users
* Index all users (token required): [GET] '/users'

* Show user by Id (token required): [GET] '/users/:id'

* Create new user (token required): [POST] '/users'

{
    "firstName": "chris",
    "lastName": "cho",
    "password": "1234",
}


#### Orders
* get user's order (token required): [GET] '/users/:id/orders'


* Create new order (token required): [POST] '/users/:id/orders'

{
    "status": "active",
    "user_id": 8
}

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

Table: products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100)
);
#### User
- id
- firstName
- lastName
- password
Table: Users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- 
Table: Order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL
    status VARCHAAR(100)
)
