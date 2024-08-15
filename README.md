# Student Database Management

Expense Tracker is a web application designed to help users manage their income and expenses. The application allows users to add, view, and delete expenses and incomes, providing a graphical representation of their financial data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- User authentication (registration and login)
- Add and view students and departments
- View the total students and departments in dashboard
- Responsive design

## Technologies Used

### Frontend

- React + Vite
- React Router
- Bootstrap

### Backend

- Node.js
- Express
- MySQL
- JWT (JSON Web Tokens)

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Backend Setup

0. Create a MySQL database
   ```sql
   CREATE DATABASE STUDENT;
   ```
   Select the Database
   ```sql
   USE STUDENT;
   ```
   Create the tables below
   ```sql
   CREATE TABLE admin(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, email VARCHAR(50) NOT NULL, password VARCHAR(150) NOT NULL);
   ```
   ```sql
   CREATE TABLE category(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL);
   ```
   ```sql
   CREATE TABLE student(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(50) NOT NULL,password VARCHAR(150) NOT NULL, regno VARCHAR(10) NOT NULL, dept_id INT, FOREIGN KEY (dept_id) REFERENCES category(id));
   ```

1. Clone the repository:

    ```bash
    git clone https://github.com/ChethanJS07/ExpenseTracker.git
    cd student_management
    ```

2. Navigate to the backend directory:

    ```bash
    cd server
    ```

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Start the backend server:

    ```bash
    npm run dev
    ```

### Frontend Setup
0. Create a new Terminal
1. Navigate to the frontend directory:

    ```bash
    cd student_management
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm run dev
    ```

4. Open your browser and go to `http://localhost:5173`.

## Usage

1. Login for admin with email: admin@gmail.com, password: 12345
2. Login for Student with email: sarveshkun69@gmail.com, password: 12345

## API Endpoints

### Admin

- `/auth`: Admin Routes for All functions

### Students

-  `/student`: Student Route for All functions

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

