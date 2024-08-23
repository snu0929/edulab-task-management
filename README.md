# Edulab Task Management System

This is a backend API for a task management system with enhanced security and user role management. It supports CRUD operations for tasks, role-based access control (admin and user roles), task filtering, and secure authentication using JWT.

## Features

- **User Registration & Authentication**: Users can register and log in using JWT-based authentication.
- **Role-Based Access Control**: 
  - Admin users can create, read, update, and delete tasks.
  - Normal users can view only the tasks assigned to them.
- **Task Management**:
  - Create, read, update, and delete tasks.
  - Assign tasks to specific users.
  - Filter tasks based on priority, status, and assigned user.
- **Security**:
  - Passwords are securely hashed using bcrypt.
  - Routes are protected using middleware for authentication and role-based access control.

## API Endpoints

### User Authentication

- **Register**: `POST /api/auth/register`
  - Request Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string" // Optional: "admin" or "user"
    }
    ```
  - Response:
    - Success: Returns a JWT token.
  
- **Login**: `POST /api/auth/login`
  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    - Success: Returns a JWT token.

### Task Management

- **Create Task**: `POST /api/tasks/`
  - Access: Admin only
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "priority": "string", // "low", "medium", "high"
      "status": "string", // "pending", "in-progress", "completed"
      "assignedTo": "userId" // Optional
    }
    ```
  - Response: Returns the created task.

- **Get All Tasks**: `GET /api/tasks/`
  - Access:
    - Admin: Can view all tasks.
    - User: Can view tasks assigned to them.
  - Response: Returns a list of tasks.

- **Get Task by ID**: `GET /api/tasks/:id`
  - Access: Admin and the assigned user can view the task.
  - Response: Returns the task details.

- **Update Task**: `PUT /api/tasks/:id`
  - Access: Admin only
  - Request Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "priority": "string", // "low", "medium", "high"
      "status": "string", // "pending", "in-progress", "completed"
      "assignedTo": "userId" // Optional
    }
    ```
  - Response: Returns the updated task.

- **Delete Task**: `DELETE /api/tasks/:id`
  - Access: Admin only
  - Response: Confirms the task has been deleted.

## Task Filtering

- **Filter Tasks by Priority, Status, and Assigned User**:
  - You can filter tasks by adding query parameters to the `/api/tasks/` endpoint, such as `?priority=high&status=pending`.
  
## Environment Variables

The application requires the following environment variables:

- `MONGO_URI`: MongoDB connection string (e.g., `mongodb://localhost:27017/event-management`)
- `JWT_SECRET`: Secret key for JWT token generation.

## Deployment

The application is deployed and can be accessed at:

- **Backend API**: [Your deployed URL]()

  
## Dependencies
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- Contributing
- Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

To run the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/snu0929/edulab-task-management.git
2. Install dependencies:
   ```bash
   yarn install
3.Set up environment variables in a .env file.

4.Start the application:
  ```bash
  yarn start
```bash



