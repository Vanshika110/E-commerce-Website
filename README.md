# Ecommerce Project

A full-stack ecommerce application with React frontend and Node.js backend.

## Features

- User authentication (signup/signin) with JWT
- Product listing with images and details
- Shopping cart functionality
- User profile management
- Image upload for profile pictures
- Protected routes

## Tech Stack

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads

**Frontend:**
- React with React Router
- Axios for API calls
- Context API for state management

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your MongoDB URI:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. Seed the database with sample products:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (authenticated)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### User
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

## Usage

1. Sign up for a new account or sign in with existing credentials
2. Browse products on the home page
3. Add items to your cart
4. View and manage your cart
5. Update your profile information

## Project Structure

```
ecommerce-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    └── package.json
```
