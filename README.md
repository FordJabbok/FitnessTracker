# Fitness Tracker API

A REST API for managing users, workouts, exercises, and the exercises included in each workout. This project was created for the CPE 114 final project using Node.js, Express.js, Sequelize ORM, and MySQL/MariaDB.

## Features

- Create, read, update, and delete users
- Create, read, update, and delete workouts
- Create, read, update, and delete exercises
- Add exercises to a workout with sets, reps, and weight
- Remove exercises from a workout
- List all exercises inside a workout
- List all workouts owned by a user
- Request validation and JSON error responses
- Custom logger middleware
- Sequelize relationships and automatic table creation

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL / MariaDB
- mysql2
- dotenv
- nodemon
- Postman

## Prerequisites

Before running this project, make sure the following are installed:

- Node.js v18 or higher
- MySQL 8.0 or MariaDB
- npm
- Postman
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/FordJabbok/FitnessTracker.git
```

2. Go inside the project folder:

```bash
cd FitnessTracker
```

3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env`.

For Windows Command Prompt:

```cmd
copy .env.example .env
```

5. Edit `.env` and add your database credentials.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fitness_tracker
DB_USER=root
DB_PASSWORD=yourpassword
PORT=3000
NODE_ENV=development
```

6. Create the database in MySQL or MariaDB:

```sql
CREATE DATABASE fitness_tracker;
```

7. Start the server:

```bash
npm run dev
```

The server will run at:

```txt
http://localhost:3000
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 3306 |
| DB_NAME | Database name | fitness_tracker |
| DB_USER | Database username | root |
| DB_PASSWORD | Database password | yourpassword |
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |

## Project Structure

```txt
FitnessTracker/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── docs/
│   ├── er-diagram.png
│   └── postman_collection.json
├── postman/
├── app.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Data Models

### User

Stores user account information.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| name | STRING | User name |
| email | STRING | Unique user email |
| password | STRING | User password |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

### Workout

Stores workout sessions created by users.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | STRING | Workout title |
| date | DATEONLY | Workout date |
| notes | TEXT | Optional notes |
| userId | INTEGER | Foreign key to User |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

### Exercise

Stores reusable exercise records.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| name | STRING | Unique exercise name |
| category | ENUM | strength, cardio, or flexibility |
| description | TEXT | Optional description |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

### WorkoutExercise

Junction table between Workout and Exercise. It also stores workout performance data.

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| workoutId | INTEGER | Foreign key to Workout |
| exerciseId | INTEGER | Foreign key to Exercise |
| sets | INTEGER | Number of sets |
| reps | INTEGER | Number of reps |
| weight | FLOAT | Weight used |
| createdAt | DATE | Auto-generated |
| updatedAt | DATE | Auto-generated |

## Relationships

- One User has many Workouts
- One Workout belongs to one User
- One Workout has many Exercises
- One Exercise can belong to many Workouts
- WorkoutExercise connects Workouts and Exercises and stores sets, reps, and weight

```txt
User 1 ──── N Workout

Workout M ──── N Exercise
        via WorkoutExercise
```

## ER Diagram

The ER diagram is located at:

```txt
docs/er-diagram.png
```

![ER Diagram](docs/er-diagram.png)

## API Endpoints

Base URL:

```txt
http://localhost:3000
```

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/users | Create user |
| GET | /api/users | Get all users |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |
| GET | /api/users/:id/workouts | Get user's workouts |

### Workouts

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/workouts | Create workout |
| GET | /api/workouts | Get all workouts |
| GET | /api/workouts/:id | Get workout by ID |
| PUT | /api/workouts/:id | Update workout |
| DELETE | /api/workouts/:id | Delete workout |
| POST | /api/workouts/:id/exercises | Add exercise to workout |
| GET | /api/workouts/:id/exercises | Get exercises in workout |
| DELETE | /api/workouts/:id/exercises/:exerciseId | Remove exercise from workout |

### Exercises

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/exercises | Create exercise |
| GET | /api/exercises | Get all exercises |
| GET | /api/exercises/:id | Get exercise by ID |
| PUT | /api/exercises/:id | Update exercise |
| DELETE | /api/exercises/:id | Delete exercise |

## Sample Requests

### Create User

```http
POST /api/users
```

```json
{
  "name": "Jon Do",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Create Workout

```http
POST /api/workouts
```

```json
{
  "title": "Morning Strength",
  "date": "2024-03-15",
  "notes": "Focus on upper body",
  "userId": 1
}
```

### Create Exercise

```http
POST /api/exercises
```

```json
{
  "name": "Bench Press",
  "category": "strength",
  "description": "Chest compound movement"
}
```

### Add Exercise to Workout

```http
POST /api/workouts/1/exercises
```

```json
{
  "exerciseId": 1,
  "sets": 4,
  "reps": 8,
  "weight": 80.5
}
```

## Error Responses

### Validation Error

```json
{
  "error": "Validation failed",
  "details": [
    "name is required",
    "email must be valid"
  ]
}
```

### Not Found Error

```json
{
  "error": "User not found"
}
```

### Conflict Error

```json
{
  "error": "Exercise already in this workout"
}
```

### Invalid Route Error

```json
{
  "error": "Route GET /api/invalid-route not found"
}
```

## Postman Collection

The Postman collection is included here:

```txt
docs/postman_collection.json
```

It contains requests for:

- User CRUD
- Workout CRUD
- Exercise CRUD
- Relationship endpoints
- Validation error tests
- Not found tests
- Conflict tests

## Security Notes

The `.env` file contains sensitive credentials and should not be uploaded to GitHub.

The `.gitignore` file should include:

```txt
node_modules/
.env
```

Only `.env.example` should be included in the repository.

## Author

Created by: Ford Jabbok Tawac  
Course: CPE 114  
Project: Final Backend REST API Project
