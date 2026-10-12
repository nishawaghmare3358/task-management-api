# Task Management REST API

A RESTful API built using Node.js, Express.js, and MongoDB to manage user tasks securely with JWT authentication.

## Features

* User registration and login
* Password hashing using bcryptjs
* JWT-based authentication
* Create, read, update, and delete tasks (CRUD)
* Retrieve all tasks or a single task
* User-specific task access and ownership checks
* Input validation and error handling

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* Postman

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/nishawaghmare3358/task-management-api.git
cd task-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_api
JWT_SECRET=your_private_random_secret
JWT_EXPIRES_IN=1d
```

Replace `your_private_random_secret` with a strong, randomly generated secret of at least 32 characters. Never upload your actual `.env` file to GitHub.

### 4. Start the server

```bash
npm run dev
```

Ensure MongoDB is running before starting the API.

The API will be available at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint             | Purpose                                  |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register` | Register a new user                      |
| POST   | `/api/auth/login`    | Log in and receive a JWT                 |
| POST   | `/api/tasks`         | Create a task                            |
| GET    | `/api/tasks`         | Get all tasks for the authenticated user |
| GET    | `/api/tasks/:id`     | Get a single task                        |
| PUT    | `/api/tasks/:id`     | Update a task                            |
| DELETE | `/api/tasks/:id`     | Delete a task                            |

### Authentication

Task endpoints require a valid JWT Bearer token.

In Postman, select **Authorization → Bearer Token** and enter the token received after login.

Users should only be able to access and modify their own tasks.

## Testing

The API was tested using Postman, including:

* User registration and login
* CRUD operations
* Requests without authentication tokens
* Invalid token handling
* User-specific task access checks

## Author

**Nisha Waghmare**

GitHub: [nishawaghmare3358](https://github.com/nishawaghmare3358)
