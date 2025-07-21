# Deployment Configuration for Backend

## Environment Variables Required:
- NODE_ENV=production
- PORT=5000
- JWT_SECRET=your_production_jwt_secret
- DB_HOST=your_mysql_host
- DB_USER=your_mysql_username
- DB_PASSWORD=your_mysql_password
- DB_NAME=your_mysql_database_name
- DB_PORT=3306
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Build Commands:
- Build: `npm install`
- Start: `npm start`

## Database Setup:
1. Create MySQL database
2. Run: `npm run seed` to populate sample data
