# MySQL Setup Guide

## Prerequisites
1. Install MySQL Server on your system
2. Create a database for the ecommerce project

## Database Setup

### 1. Install MySQL Server
Download and install MySQL from: https://dev.mysql.com/downloads/mysql/

### 2. Create Database
After installing MySQL, connect to it and create the database:

```sql
CREATE DATABASE ecommerce_db;
```

### 3. Configure Environment Variables
Update the `.env` file in the backend directory with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=ecommerce_db
DB_PORT=3306
```

### 4. Test Database Connection
Run the server to test the connection:

```bash
cd backend
npm start
```

If successful, you should see:
- "Database & tables created!"
- "Server running on port 5000"

### 5. Seed Database (Optional)
To populate the database with sample products:

```bash
cd backend
npm run seed
```

## Migration Changes Made

### Updated Dependencies
- Removed: `mongoose`
- Added: `mysql2`, `sequelize`

### Database Configuration
- Changed from MongoDB connection to MySQL with Sequelize
- Updated connection pooling and error handling

### Models Updated
- **User Model**: Converted from Mongoose schema to Sequelize model
- **Product Model**: Updated with proper MySQL data types (DECIMAL for price)
- **Cart Model**: Restructured from embedded documents to normalized tables
  - `Cart` table for user carts
  - `CartItem` table for cart items with foreign keys

### Controllers Updated
- **Auth Controller**: Updated to use Sequelize queries (`findOne({ where: ... })`)
- **Product Controller**: Updated to use Sequelize methods (`findAll()`, `findByPk()`)
- **Cart Controller**: Complete rewrite to handle normalized cart structure

### Key Changes
1. **Query Syntax**: MongoDB queries replaced with Sequelize syntax
2. **Model Structure**: Normalized relational database structure
3. **Associations**: Proper foreign key relationships between tables
4. **Data Types**: MySQL-specific data types and constraints

## Testing
1. Start the server: `npm start`
2. Test authentication endpoints: POST `/api/auth/signup` and `/api/auth/signin`
3. Test product endpoints: GET `/api/products`
4. Test cart endpoints: POST `/api/cart/add` (requires authentication)

Your ecommerce application is now using MySQL instead of MongoDB!
