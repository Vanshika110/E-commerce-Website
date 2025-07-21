# Sample Images for Testing

If you want to test local image uploads, you can:

1. **Download sample images** and place them in:
   - `backend/uploads/products/`
   - `backend/uploads/profiles/`

2. **Recommended image sizes:**
   - Products: 800x600px or 1200x900px
   - Profiles: 400x400px (square)

3. **Supported formats:**
   - JPEG, JPG, PNG, GIF, WebP

4. **File naming pattern:**
   - Products: `product-[timestamp]-[random].jpg`
   - Profiles: `profile-[timestamp]-[random].jpg`

## MySQL Database Setup (Required):

### Option 1: Using MySQL Workbench (Recommended)
1. **Install MySQL Server** (if not already installed)
2. **Open MySQL Workbench**
3. **Create a new connection** to your local MySQL server
4. **Create database:**
   ```sql
   CREATE DATABASE ecommerce_db;
   ```
5. **Create a user** (optional, or use root):
   ```sql
   CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Option 2: Using Command Line
```bash
mysql -u root -p
CREATE DATABASE ecommerce_db;
exit
```

### Option 3: Using XAMPP/WAMP
- Start MySQL service
- Open phpMyAdmin
- Create database named `ecommerce_db`

## Update .env file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db
DB_PORT=3306
```

## Current Setup:
- ✅ Folders created: `/uploads/products/` and `/uploads/profiles/`
- ✅ Static file serving enabled
- ✅ Image upload middleware configured
- ✅ Seed data uses external Unsplash images
- ❌ **MySQL database needs to be created**

## Test the application:
1. **First: Create MySQL database** (see above)
2. **Update .env** with your MySQL credentials
3. Start backend: `npm start`
4. Visit: `http://localhost:5000/api/test/health`
5. Check uploads: `http://localhost:5000/api/test/uploads-check`
