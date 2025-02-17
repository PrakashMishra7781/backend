# Backend API - Item Management System

This is the backend API for the **Item Management System**, built with **Node.js, Express, PostgreSQL, and JWT authentication**. It provides CRUD operations for managing items with user authentication.

---

## 🚀 **Project Setup**

### **1️⃣ Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### **2️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/your-repo.git
cd backend
```

### **3️⃣ Install Dependencies**

```sh
npm install
```

### **4️⃣ Create `.env` File**

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

Replace `your_postgresql_connection_string` with your actual **PostgreSQL database URL**.

### **5️⃣ Set Up Database**

Run the following SQL command in your PostgreSQL database to create the `users` and `items` tables:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **6️⃣ Start the Server**

```sh
npm start
```

Your backend will run on **http://localhost:5000**.

---

## 📌 **API Endpoints**

### **🔹 Authentication Routes**

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| `POST` | `/api/register` | Register a new user           |
| `POST` | `/api/login`    | Login and receive a JWT token |

### **🔹 Item Routes (Protected)**

| Method   | Endpoint         | Description                         |
| -------- | ---------------- | ----------------------------------- |
| `GET`    | `/api/items`     | Get all items of the logged-in user |
| `POST`   | `/api/items`     | Create a new item                   |
| `PUT`    | `/api/items/:id` | Update an item                      |
| `DELETE` | `/api/items/:id` | Delete an item                      |

🔒 **Protected routes require an Authorization header with a Bearer Token:**

```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
