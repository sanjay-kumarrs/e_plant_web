# 🌿 Plant Store & Management System.

An elegant, full-stack web application designed for browsing, purchasing, and managing plants. The system consists of a dynamic React frontend powered by Tailwind CSS v4 and MDB React UI Kit, and a robust Express.js/Node.js backend connected to MongoDB Atlas.

---

## 🏗️ Project Architecture

The workspace is organized into two main directory components:

*   **[plant-front](file:///e:/project/Mini-project/plant-front)**: React frontend built on top of Vite. Styled using Tailwind CSS v4 and MDB React UI Kit, using Lucide Icons and FontAwesome for graphics.
*   **[plant-back](file:///e:/project/Mini-project/plant-back)**: Node.js / Express.js REST API server. Handles password hashing (bcrypt), authentication (JWT), file uploads (multer), and database communications (Mongoose).

### Directory Structure

```text
Mini-project/
├── plant-front/           # React Frontend Application
│   ├── src/               # Application source code
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies and scripts
│   ├── vite.config.js     # Vite configuration
│   └── index.html         # Main HTML template
│
└── plant-back/            # Express Backend API
    ├── models/            # Mongoose Schema Definitions
    │   ├── user.js        # User profile schema
    │   ├── admin.js       # Admin schema
    │   ├── plant.js       # Plant inventory schema
    │   ├── order.js       # Customer orders schema
    │   ├── cart.js        # User shopping cart schema
    │   ├── discount.js    # Discounts and offers schema
    │   └── feedback.js    # Customer feedback schema
    ├── uploads/           # Uploaded plant image files (static directory)
    ├── app.js             # Main server logic and API endpoints
    └── package.json       # Backend dependencies and scripts
```

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this application locally, you will need:
*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) (version 9 or higher)
*   A running [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database (already configured in `app.js` with a connection string)

### 🔧 Installation & Setup

Follow these steps to set up and launch both the frontend and backend.

#### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd plant-back
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the Express server:
    ```bash
    node app.js
    ```
    *The server will start running on port `8080` (`http://localhost:8080`).*

#### 2. Frontend Setup

1.  Open a new terminal session and navigate to the frontend directory:
    ```bash
    cd plant-front
    ```
2.  Install the frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *The application will open automatically in your browser (usually at `http://localhost:5173`).*

---

## 🌟 Key Features

### 👤 User Capabilities
*   **Authentication**: Register new accounts (`/userSignUp`) and securely login (`/userSignIn`) with password hashing (Bcrypt) and JWT-based session tokens.
*   **Profile Management**: Retrieve and update profile details (name, username, email).
*   **Shopping Cart**: Add plants to a persistent cart, update quantities, remove items, or clear cart upon purchase.
*   **Order Placement**: Buy plants by specifying quantities and payment methods. View order history and status (e.g., Pending, Shipped, Cancelled).
*   **Discounts & Feedback**: Browse running discounts on plants and submit ratings or written feedback.

### 🛡️ Admin Dashboard
*   **Credentials**: Built-in admin login (`admin@gmail.com` / `admin123`) or database verification.
*   **Inventory Control**: Upload new plants with pictures (saved on server via Multer), view all plants, update specifications, and delete items.
*   **Order Fulfillment**: View all customer orders globally, mark orders as "Shipped," or cancel orders.
*   **User Management**: View all registered user profiles and delete accounts.
*   **Discounts & Offers**: Create and announce promotional discounts and prices.
*   **Feedback Review**: Access all customer feedback and delete responses.

---

## 🛡️ API Endpoints Summary

### User & Authentication
*   `POST /userSignUp` - Register user
*   `POST /userSignIn` - Login user (returns JWT token and User ID)
*   `GET /userProfile` - Retrieve user profile by email
*   `GET /allUserProfiles` - Retrieve list of all users
*   `PUT /updateProfile` - Update user details
*   `DELETE /deleteUser/:id` - Delete user profile

### Admin Authentication
*   `POST /AdminLogin` - Admin login authentication

### Plant Management
*   `POST /plant` - Create new plant item (supports multipart/form-data for image uploads)
*   `GET /viewplants` - Get list of all plant items
*   `GET /plant/:id` - Fetch details for a specific plant
*   `PUT /plant/:id` - Modify an existing plant
*   `DELETE /plant/:id` - Remove a plant from the system

### Cart & Orders
*   `POST /cart` - Add item to cart (or increment quantity)
*   `GET /cart` - Fetch cart items for a specific user ID
*   `DELETE /cart/clear` - Empty user's cart
*   `DELETE /cart/:id` - Remove a specific item from cart
*   `POST /order` - Place a new order
*   `GET /orders/:userId` - Retrieve all orders placed by a specific user
*   `GET /getallorders` - Admin view of all customer orders
*   `PUT /orders/:orderId/proceed` - Update order status to "Shipped"
*   `PUT /orders/:id/cancel` - Cancel an active order

### Promotions & Feedback
*   `POST /discounts` - Create a new discount deal
*   `GET /discounts` - List all active discounts
*   `DELETE /discounts/:id` - Remove a discount
*   `POST /submitFeedback` - Submit user feedback and star rating (1-5)
*   `GET /getFeedbacks` - Get list of all feedbacks
*   `DELETE /deleteFeedback/:id` - Delete a feedback entry
