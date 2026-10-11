# Task Management REST API

A REST API built using Node.js, Express.js, and MongoDB to manage user tasks securely.

## Features

* User registration and login
* Password hashing
* JWT authentication
* Create a task
* Get all tasks
* Get a single task
* Update a task
* Delete a task
* User-specific task access

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* Postman

## Installation and Setup

1. Clone this repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/task_api
   JWT_SECRET=your_private_random_secret
   JWT_EXPIRES_IN=1d
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. The API runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint             | Purpose         |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register a user |
| POST   | `/api/auth/login`    | Log in          |
| POST   | `/api/tasks`         | Create a task   |
| GET    | `/api/tasks`         | Get all tasks   |
| GET    | `/api/tasks/:id`     | Get one task    |
| PUT    | `/api/tasks/:id`     | Update a task   |
| DELETE | `/api/tasks/:id`     | Delete a task   |

Task endpoints require a valid JWT Bearer token.

## Testing

API endpoints were tested using Postman.

## Author

Nisha Waghmare
