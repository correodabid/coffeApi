# COFFEE API

Coffee stock system manager

* [Install and Run](#install)
* [Docker](#docker)
* [Testing](#test)
* [API](#api)


<a name="install"></a>
## Install and Run
To install coffee-api, simply use npm:

```
npm install
npm start
```

<a name="docker"></a>
## Run in docker
To run in a docker container, first of all, change deploy options at config.ts

* const deployDocker = true;

then, simply:

```
npm install
npm run build
docker-compose build
docker-compose up
```

<a name="test"></a>
## Launch tests
To launch test, first of all, you have to start the api, with or without docker.

Then, simply:

```
npm test
```

<a name="api"></a>
## API

  * <a href="#auth"><code><b>POST /api/v1/auth</b></code></a>
  * <a href="#createUser"><code><b>POST /api/v1/users</b></code></a>
  * <a href="#usersList"><code><b>GET /api/v1/users</b></code></a>
  * <a href="#createCoffee"><code><b>POST /api/v1/coffees</b></code></a>
  * <a href="#coffeeList"><code><b>GET /api/v1/coffees</b></code></a>
  * <a href="#makeOrders"><code><b>POST /api/v1/orders</b></code></a>
  * <a href="#ordersList"><code><b>GET /api/v1/orders</b></code></a>

-------------------------------------------------------
<a name="auth"></a>
### POST /api/v1/auth

Return an user valid token

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"admin","password":"1234"}' \
  http://localhost:8006/api/v1/auth
```

-------------------------------------------------------
<a name="createUser"></a>
### POST /api/v1/users

Create customers -Only admin users-

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request POST \
  --data '{"username":"customer1","password":"1234", "role":"customer"}' \
  http://localhost:8006/api/v1/users
```

-------------------------------------------------------
<a name="usersList"></a>
### GET /api/v1/users

Create customers -Only admin users-

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request POST \
  http://localhost:8006/api/v1/users
```

-------------------------------------------------------
<a name="createCoffee"></a>
### POST /api/v1/coffees

Create coffees -Only admin users-

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request POST \
  --data '{"name":"ristretto","intensity":"10", "price":"3", "stock":"20"}' \
  http://localhost:8006/api/v1/coffees
```

-------------------------------------------------------
<a name="coffeeList"></a>
### GET /api/v1/coffees

Create coffees -Only admin users-

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request GET \
  http://localhost:8006/api/v1/coffees
```

-------------------------------------------------------
<a name="makeOrders"></a>
### POST /api/v1/orders

Make coffe orders

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request POST \
  --data '{"user_id": < USER ID >,"coffee_id": < COFFEE ID >, "quantity":"3"}' \
  http://localhost:8006/api/v1/orders
```

-------------------------------------------------------
<a name="ordersList"></a>
### GET /api/v1/orders

List of orders -Only admin users-

```
curl --header "Content-Type: application/json" \
  --header "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZGF0ZSI6IjIwMTktMDctMDZUMDc6NTU6MTYuNTIyWiIsImlhdCI6MTU2MjM5OTcxNiwiZXhwIjoxNTYyNDg2MTE2fQ.sDu7EeeH5ilfz6lV_WDQ7Wd4TjGLbT02vabqZI__4Ew" \
  --request GET \
  http://localhost:8006/api/v1/orders
```
