# Fitness Tracker API

## Overview

The Fitness Tracker API is a backend REST API application developed for the CPE 114 final project. It is designed to solve the problem of organizing and managing workout-related data in a structured, reusable, and relational way. Many simple fitness trackers only store a workout name or a list of exercises as plain text, but that approach becomes difficult to manage when the same exercise appears in multiple workouts or when users need to track performance details such as sets, reps, and weight. This API solves that issue by separating users, workouts, exercises, and workout performance details into different database tables with clear relationships.

The application allows users to create workout records, store reusable exercises, and attach exercises to specific workouts. A user can log many workouts over time. Each workout belongs to one user, but a workout can contain many exercises. At the same time, a single exercise can appear in many different workouts. For example, Bench Press can be used in a Push Day workout, an Upper Body workout, or a Strength Training workout. Because of this, the project uses a many-to-many relationship between workouts and exercises.

The many-to-many relationship is handled through a junction table called `WorkoutExercise`. This table is important because it does more than simply connect workouts and exercises. It also stores extra data about how the exercise was performed inside a specific workout. These extra fields include sets, reps, and weight. This means that Bench Press can have different performance values depending on the workout session. For example, in one workout, Bench Press may have 4 sets, 8 reps, and 80.5 kg, while in another workout it may have 3 sets, 12 reps, and 60 kg. This design makes the database more realistic and shows proper understanding of relational modeling.

The project uses Node.js as the runtime environment, Express.js as the web framework, Sequelize ORM for data modeling and database operations, and MySQL or MariaDB as the relational database. The API follows the MVC architecture pattern. Models define the database schema and Sequelize associations. Controllers contain the business logic and database calls. Routes define endpoint paths and connect them to controller functions. Middleware handles request logging, request validation, undefined routes, and global error handling.

The API includes full CRUD operations for users, workouts, and exercises. It also includes relationship-specific endpoints for adding exercises to workouts, preventing duplicate exercise entries in the same workout, listing exercises inside a workout, removing an exercise from a workout, and listing workouts owned by a user. The project also includes environment variable configuration, input validation, structured JSON error responses, an ER diagram, and a Postman collection for testing all endpoints. This makes the application suitable as a complete backend REST API project and allows another developer to understand, install, test, and extend the system.

## Tech Stack

| Technology | Purpose | Version |
|---|---|---|
| Node.js | JavaScript runtime environment | v24.14.0 |
| npm | Package manager | Check with `npm -v` |
| Express.js | Web framework and routing | Check with `npm list express` |
| Sequelize | ORM for MySQL/MariaDB | Check with `npm list sequelize` |
| MySQL / MariaDB | Relational database | MySQL 8.0+ or MariaDB |
| mysql2 | MySQL driver required by Sequelize | Check with `npm list mysql2` |
| dotenv | Loads environment variables | Check with `npm list dotenv` |
| nodemon | Auto-restarts server during development | Check with `npm list nodemon` |
| Postman | API testing and documentation | Latest version recommended |

## Prerequisites

Before running the project, install the following:

- Node.js v18 or higher
- MySQL 8.0 or MariaDB
- npm
- Git
- Postman

## Installation and Setup

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

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

5. Open `.env` and fill in your database credentials.

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

6. Create the MySQL or MariaDB database:

```sql
CREATE DATABASE fitness_tracker;
```

7. Start the development server:

```bash
npm run dev
```

8. The server should run at:

```txt
http://localhost:3000
```

Expected console output:

```txt
Database connection established
Models synchronized
Server running on http://localhost:3000
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| DB_HOST | MySQL or MariaDB host | localhost |
| DB_PORT | Database port | 3306 |
| DB_NAME | Database name | fitness_tracker |
| DB_USER | Database username | root |
| DB_PASSWORD | Database password | yourpassword |
| PORT | Server port | 3000 |
| NODE_ENV | Application environment | development |

## Project Structure

```txt
FitnessTracker/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── workoutController.js
│   │   └── exerciseController.js
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Workout.js
│   │   ├── Exercise.js
│   │   └── WorkoutExercise.js
│   └── routes/
│       ├── userRoutes.js
│       ├── workoutRoutes.js
│       └── exerciseRoutes.js
├── docs/
│   ├── er-diagram.png
│   └── postman_collection.json
├── postman/
│   └── FitnessTracker.postman_collection.json
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md
```

## Database Schema

### User Table

Table name: `Users`

The `User` table stores the account information of each user.

| Column | Data Type | Constraints |
|---|---|---|
| id | INTEGER | Primary key, auto increment |
| name | STRING(100) | Required, cannot be empty |
| email | STRING(150) | Required, unique, must be valid email |
| password | STRING(255) | Required, minimum 6 characters |
| createdAt | DATE | Auto-generated by Sequelize |
| updatedAt | DATE | Auto-generated by Sequelize |

### Workout Table

Table name: `Workouts`

The `Workout` table stores workout sessions created by users.

| Column | Data Type | Constraints |
|---|---|---|
| id | INTEGER | Primary key, auto increment |
| title | STRING(100) | Required, cannot be empty |
| date | DATEONLY | Required, must be a valid date |
| notes | TEXT | Optional |
| userId | INTEGER | Required, foreign key referencing `Users.id` |
| createdAt | DATE | Auto-generated by Sequelize |
| updatedAt | DATE | Auto-generated by Sequelize |

### Exercise Table

Table name: `Exercises`

The `Exercise` table stores reusable exercise records.

| Column | Data Type | Constraints |
|---|---|---|
| id | INTEGER | Primary key, auto increment |
| name | STRING(100) | Required, unique |
| category | ENUM | Required, allowed values: `strength`, `cardio`, `flexibility` |
| description | TEXT | Optional |
| createdAt | DATE | Auto-generated by Sequelize |
| updatedAt | DATE | Auto-generated by Sequelize |

### WorkoutExercise Table

Table name: `WorkoutExercises`

The `WorkoutExercise` table is the junction table between `Workouts` and `Exercises`. It also stores performance details for each exercise inside a specific workout.

| Column | Data Type | Constraints |
|---|---|---|
| id | INTEGER | Primary key, auto increment |
| workoutId | INTEGER | Required, foreign key referencing `Workouts.id` |
| exerciseId | INTEGER | Required, foreign key referencing `Exercises.id` |
| sets | INTEGER | Required, default 1, minimum 1 |
| reps | INTEGER | Required, default 1, minimum 1 |
| weight | FLOAT | Optional, cannot be negative |
| createdAt | DATE | Auto-generated by Sequelize |
| updatedAt | DATE | Auto-generated by Sequelize |

## Relationships

### One-to-Many Relationship

One user can have many workouts. Each workout belongs to one user.

```txt
User 1 ───────────── N Workout
```

Implemented in Sequelize with:

```js
User.hasMany(Workout, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'CASCADE',
  as: 'workouts',
});

Workout.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false },
  as: 'user',
});
```

### Many-to-Many Relationship

One workout can contain many exercises, and one exercise can appear in many workouts. The relationship is handled by the `WorkoutExercise` junction table.

```txt
Workout M ───────────── N Exercise
          via WorkoutExercise
```

Implemented in Sequelize with:

```js
Workout.belongsToMany(Exercise, {
  through: WorkoutExercise,
  foreignKey: 'workoutId',
  otherKey: 'exerciseId',
  as: 'exercises',
});

Exercise.belongsToMany(Workout, {
  through: WorkoutExercise,
  foreignKey: 'exerciseId',
  otherKey: 'workoutId',
  as: 'workouts',
});
```

## ER Diagram

The ER diagram shows all four entities, primary keys, foreign keys, and table relationships.

```txt
Users
  id PK
  name
  email
  password

Workouts
  id PK
  title
  date
  notes
  userId FK → Users.id

Exercises
  id PK
  name
  category
  description

WorkoutExercises
  id PK
  workoutId FK → Workouts.id
  exerciseId FK → Exercises.id
  sets
  reps
  weight
```

```txt
Users 1 ─────── N Workouts

Workouts 1 ─────── N WorkoutExercises

Exercises 1 ─────── N WorkoutExercises

Workouts M ─────── N Exercises through WorkoutExercises
```

Image version:

![ER Diagram](docs/er-diagram.png)

## API Reference

Base URL:

```txt
http://localhost:3000
```

### Users

| Method | Path | Request Body | Example Response |
|---|---|---|---|
| POST | `/api/users` | `{ "name": "John Doe", "email": "john@example.com", "password": "secret123" }` | `201 Created` with created user object |
| GET | `/api/users` | None | `200 OK` with array of users |
| GET | `/api/users/:id` | None | `200 OK` with user object and workouts, or `404 Not Found` |
| PUT | `/api/users/:id` | `{ "name": "John Updated" }` | `200 OK` with updated user, or `404 Not Found` |
| DELETE | `/api/users/:id` | None | `204 No Content`, or `404 Not Found` |
| GET | `/api/users/:id/workouts` | None | `200 OK` with array of user's workouts, or `404 Not Found` |

### Workouts

| Method | Path | Request Body | Example Response |
|---|---|---|---|
| POST | `/api/workouts` | `{ "title": "Morning Strength", "date": "2024-03-15", "notes": "Focus on upper body", "userId": 1 }` | `201 Created` with created workout |
| GET | `/api/workouts` | None | `200 OK` with array of workouts including user data |
| GET | `/api/workouts/:id` | None | `200 OK` with workout, user, and exercises, or `404 Not Found` |
| PUT | `/api/workouts/:id` | `{ "notes": "Updated workout notes" }` | `200 OK` with updated workout, or `404 Not Found` |
| DELETE | `/api/workouts/:id` | None | `204 No Content`, or `404 Not Found` |
| POST | `/api/workouts/:id/exercises` | `{ "exerciseId": 1, "sets": 4, "reps": 8, "weight": 80.5 }` | `201 Created`, `404 Not Found`, or `409 Conflict` |
| GET | `/api/workouts/:id/exercises` | None | `200 OK` with exercises in workout including sets, reps, and weight |
| DELETE | `/api/workouts/:id/exercises/:exerciseId` | None | `204 No Content`, or `404 Not Found` |

### Exercises

| Method | Path | Request Body | Example Response |
|---|---|---|---|
| POST | `/api/exercises` | `{ "name": "Bench Press", "category": "strength", "description": "Chest compound movement" }` | `201 Created` with created exercise |
| GET | `/api/exercises` | None | `200 OK` with array of exercises |
| GET | `/api/exercises/:id` | None | `200 OK` with exercise object, or `404 Not Found` |
| PUT | `/api/exercises/:id` | `{ "description": "Updated exercise description" }` | `200 OK` with updated exercise, or `404 Not Found` |
| DELETE | `/api/exercises/:id` | None | `204 No Content`, or `404 Not Found` |

## Request and Response Examples

### Create User

Request:

```http
POST /api/users
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Example response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "createdAt": "2026-05-10T00:00:00.000Z",
  "updatedAt": "2026-05-10T00:00:00.000Z"
}
```

### Create Workout

Request:

```http
POST /api/workouts
```

Body:

```json
{
  "title": "Morning Strength",
  "date": "2024-03-15",
  "notes": "Focus on upper body",
  "userId": 1
}
```

Example response:

```json
{
  "id": 1,
  "title": "Morning Strength",
  "date": "2024-03-15",
  "notes": "Focus on upper body",
  "userId": 1,
  "createdAt": "2026-05-10T00:00:00.000Z",
  "updatedAt": "2026-05-10T00:00:00.000Z"
}
```

### Create Exercise

Request:

```http
POST /api/exercises
```

Body:

```json
{
  "name": "Bench Press",
  "category": "strength",
  "description": "Chest compound movement"
}
```

Example response:

```json
{
  "id": 1,
  "name": "Bench Press",
  "category": "strength",
  "description": "Chest compound movement",
  "createdAt": "2026-05-10T00:00:00.000Z",
  "updatedAt": "2026-05-10T00:00:00.000Z"
}
```

### Add Exercise to Workout

Request:

```http
POST /api/workouts/1/exercises
```

Body:

```json
{
  "exerciseId": 1,
  "sets": 4,
  "reps": 8,
  "weight": 80.5
}
```

Example response:

```json
{
  "id": 1,
  "workoutId": 1,
  "exerciseId": 1,
  "sets": 4,
  "reps": 8,
  "weight": 80.5,
  "createdAt": "2026-05-10T00:00:00.000Z",
  "updatedAt": "2026-05-10T00:00:00.000Z"
}
```

## Error Responses

### 400 Bad Request: Validation Error

Returned when required fields are missing or invalid.

```json
{
  "error": "Validation failed",
  "details": [
    "name is required",
    "email must be valid"
  ]
}
```

### 400 Bad Request: Invalid Foreign Key

Returned when a request references an invalid foreign key.

```json
{
  "error": "Invalid foreign key reference"
}
```

### 404 Not Found: Missing Resource

Returned when the requested record does not exist.

```json
{
  "error": "User not found"
}
```

Other possible 404 examples:

```json
{
  "error": "Workout not found"
}
```

```json
{
  "error": "Exercise not found"
}
```

### 404 Not Found: Invalid Route

Returned when the endpoint does not exist.

```json
{
  "error": "Route GET /api/invalid-route not found"
}
```

### 409 Conflict: Duplicate Resource or Duplicate Relationship

Returned when a unique constraint is violated or when the same exercise is added to the same workout twice.

```json
{
  "error": "Exercise already in this workout"
}
```

Sequelize unique constraint example:

```json
{
  "error": "Conflict",
  "details": [
    "Email already in use"
  ]
}
```

### 500 Internal Server Error

Returned when an unexpected server error occurs.

```json
{
  "error": "Internal Server Error"
}
```

## Middleware

The API includes the following middleware:

| Middleware | Purpose |
|---|---|
| `logger.js` | Logs HTTP method, URL, and timestamp for every request |
| `validate.js` | Validates POST request bodies before controller logic |
| `errorHandler.js` | Formats Sequelize and server errors into JSON responses |
| 404 catch-all | Returns JSON response for undefined routes |

## Postman Collection

The Postman collection is included in the repository.

Required location:

```txt
docs/postman_collection.json
```

Additional location:

```txt
postman/FitnessTracker.postman_collection.json
```

The collection includes requests for:

- User CRUD endpoints
- Workout CRUD endpoints
- Exercise CRUD endpoints
- Relationship endpoints
- Validation error tests
- Not found tests
- Conflict tests

## Security Notes

The `.env` file contains private database credentials and must not be uploaded to GitHub. The repository includes `.env.example` so another developer can create their own `.env` file.

The `.gitignore` file should include:

```txt
node_modules/
.env
```

## Author

Created by: Ford Jabbok Tawac  
Course: CPE 114  
Project: Final Backend REST API Project
