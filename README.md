# EmployWise Frontend Assignment

## Overview

This is a React-based application that integrates with the Reqres API to perform basic user management functions. The application is divided into three levels:

1. **Authentication Screen** - Users can log in using credentials.
2. **List All Users** - Displays a paginated list of users fetched from the API.
3. **Edit, Delete, and Update Users** - Allows editing, updating, and deleting users.

## Tech Stack

- **React** - Frontend framework
- **React Router** - Navigation management
- **Axios** - API requests handling
- **Tailwind CSS** - UI styling
- **Local Storage** - Token persistence

## Features

### Level 1: Authentication

- Users can log in using predefined credentials.
- API Endpoint: `POST /api/login`
- On successful login, stores the token and redirects to the Users List page.

### Level 2: List Users

- Fetches and displays a paginated list of users.
- API Endpoint: `GET /api/users?page=1`
- Displays user avatars, names, and emails.
- Implements pagination for easy navigation.

### Level 3: Edit, Delete, and Update Users

- Each user has options to **Edit** or **Delete**.
- **Edit**:
  - Opens a form pre-filled with the user’s data.
  - Allows updating the user’s first name, last name, and email.
  - API Endpoint: `PUT /api/users/{id}`
- **Delete**:
  - Removes the user from the list.
  - API Endpoint: `DELETE /api/users/{id}`
- Displays success and error messages for API operations.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS)
- **npm** 

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/raikomal/employwise-frontend.git
   cd employwise-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in the browser.

## API Usage

- **Login**: `POST /api/login` (Requires email & password in the request body)
- **Fetch Users**: `GET /api/users?page=1`
- **Update User**: `PUT /api/users/{id}` (Requires user data in the request body)
- **Delete User**: `DELETE /api/users/{id}`

## Error Handling

- Displays appropriate messages for failed login attempts.
- Handles API request failures with user-friendly messages.
- Validates input fields before submitting forms.


**Komal Rai** - [GitHub Profile](https://github.com/raikomal)

