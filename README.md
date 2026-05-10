# Split Bill API

A RESTful API for managing shared bills, bill items, and friendships.

Built using:

* NodeJS
* ExpressJS
* Sequelize ORM
* MySQL
* JWT Authentication

---

# Features

## Authentication

* Register
* Login
* Logout
* JWT protected routes

## Users

* View users
* View authenticated profile

## Friends

* Send friend requests
* Accept requests
* Reject requests
* Delete friends
* View friends
* View friend requests

## Bills

* Create bills
* View bills
* View bill details
* Add friends to bill
* Remove friends from bill

## Items

* Create items
* Update items
* Delete items
* Automatic bill total recalculation
* Automatic subtotal recalculation

---

# Tech Stack

| Technology         | Purpose           |
| ------------------ | ----------------- |
| NodeJS             | Runtime           |
| ExpressJS          | Backend framework |
| Sequelize          | ORM               |
| MySQL              | Database          |
| JWT                | Authentication    |
| bcrypt             | Password hashing  |
| express-rate-limit | Rate limiting     |

---

# Project Structure

```txt
split-bill-api/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── migrations/
 ├── models/
 ├── routes/
 ├── seeders/
 ├── tests/
 ├── .env
 ├── package.json
 └── server.js
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository_url>
```

```bash
cd split-bill-api
```

---

# Install Dependencies

```bash
npm install
```

---

# Database Setup

## Create MySQL Database

```sql
CREATE DATABASE split_bill_api;
```

---

# Environment Variables

Create a `.env` file in the project root.

## .env

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=split_bill_api

JWT_SECRET=split_bill_secret
```

---

# Run Database Migrations

```bash
npx sequelize-cli db:migrate
```

---

# Run Database Seeders

```bash
npx sequelize-cli db:seed:all
```

---

# Start Development Server

```bash
npm run dev
```

API runs on:

```txt
http://localhost:3000
```

---

# Default Seeded Users

| Name     | Email                                           | Password |
| -------- | ----------------------------------------------- | -------- |
| Joseph   | [joseph@gmail.com](mailto:joseph@gmail.com)     | 123456   |
| Reuben   | [reuben@gmail.com](mailto:reuben@gmail.com)     | 654321   |
| Bautista | [bautista@gmail.com](mailto:bautista@gmail.com) | 123456   |
| Maiko    | [maiko@gmail.com](mailto:maiko@gmail.com)       | 123456   |
| Jaye     | [jaye@gmail.com](mailto:jaye@gmail.com)         | 123456   |
| Rikako   | [rikako@gmail.com](mailto:rikako@gmail.com)     | 123456   |
| Elijah   | [elijah@gmail.com](mailto:elijah@gmail.com)     | 123456   |

---

# API Endpoints

# Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |
| POST   | `/api/auth/logout`   |

---

# Users

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/users`    |
| GET    | `/api/users/me` |

---

# Friends

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| POST   | `/api/users/friend-request`        |
| POST   | `/api/users/friend-request/action` |
| GET    | `/api/users/friends`               |
| GET    | `/api/users/friend-requests`       |

---

# Bills

| Method | Endpoint                   |
| ------ | -------------------------- |
| GET    | `/api/bills`               |
| POST   | `/api/bills`               |
| GET    | `/api/bills/:id`           |
| POST   | `/api/bills/add-friend`    |
| DELETE | `/api/bills/remove-friend` |

---

# Items

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | `/api/items?bill_id=1` |
| POST   | `/api/items`           |
| PUT    | `/api/items/:id`       |
| DELETE | `/api/items/:id`       |

---

# Authentication

Protected routes require:

```txt
Authorization: Bearer <token>
```

---

# Example Login Request

## Endpoint

```txt
POST /api/auth/login
```

## Request Body

```json
{
  "email": "joseph@gmail.com",
  "password": "123456"
}
```

## Response

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Joseph",
    "email": "joseph@gmail.com"
  }
}
```

---

# Running Tests

## Run Tests

```bash
npm test
```

---

# Code Structure

## Controllers

Business logic.

## Routes

API endpoint definitions.

## Models

Sequelize models and associations.

## Middleware

Authentication and reusable request logic.

## Migrations

Database schema changes.

## Seeders

Initial test data.

---

# Security Features

* Password hashing using bcrypt
* JWT authentication
* Rate limiting
* Protected routes
* Duplicate friend request prevention
* Bill access validation

---

# Future Improvements

* Docker support
* Swagger documentation
* Unit and integration tests
* Refresh tokens
* Real-time updates using WebSockets
* Uneven bill splitting
* Notifications
* File uploads

---

# Author

Joseph Bautista
