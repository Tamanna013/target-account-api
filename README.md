# target-account-api
For Force Equals AI hiring challenge

This project implements a **RESTful API** for a **Target Account Matching system**. The API allows a client to log in, fetch a list of companies with match scores, and update the status of a target account. The backend is built using **Node.js**, **Express**, **JWT**, **bcryptjs**, and **body-parser**.

## Requirements
- **Node.js**: The backend is built using Node.js.
- **npm**: Used for managing dependencies and running the server.

## Project Structure

```
├── data.js               // Contains user and company data (create this file)
├── index.js              // Main server file (Express app)
├── middleware            // Contains authentication middleware
│   └── auth.js
└── package.json          // npm package configuration
```

### How to Generate Password Hash

To ensure password security, user passwords are hashed using the `bcryptjs` library. Generate a hashed passwords then save them in data.js.

## API Endpoints

### 1. `POST /login`

This endpoint allows a user to log in with their username and password.

#### Request Body

```json
{
  "username": "user1",
  "password": "pass123"
}
```

#### Response

On successful login, a JWT token is returned:

```json
{
  "message": "Login successful",
  "token": "xyz"
}
```

On failure (invalid credentials or user not found):

```json
{
  "message": "Invalid credentials"
}
```

### 2. `GET /accounts`

This endpoint fetches a list of companies, but it requires an authentication token for access.

#### Request

```bash
GET /accounts
```

#### Response

```json
[
  {
    "id": 1,
    "companyName": "TechCorp",
    "matchScore": 86,
    "accountStatus": "Not Target"
  },
  {
    "id": 2,
    "companyName": "InnovaX",
    "matchScore": 72,
    "accountStatus": "Not Target"
  }
]
```

### 3. `POST /accounts/:id/status`

This endpoint updates the target status of a specific company.

#### Request Body

```json
{
  "status": "Target"
}
```

#### Response

```json
{
  "message": "Status updated",
  "company": {
    "id": 1,
    "companyName": "TechCorp",
    "matchScore": 86,
    "accountStatus": "Target"
  }
}
```

## Authentication Middleware

To ensure security, the API uses **JSON Web Tokens (JWT)** for user authentication.

1. **Login Route**: The user provides their credentials.
2. **JWT Generation**: A valid user is issued a token that must be included in the header for all protected routes (e.g., `/accounts` and `/accounts/:id/status`).

The authentication is handled by the `authenticateToken` middleware in the `middleware/auth.js` file, which verifies the presence and validity of the JWT.
