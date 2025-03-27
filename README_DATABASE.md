
# DisMan - Database Setup Guide

This document provides guidance on how to set up a real database for the DisMan application.

## Current Implementation

The current implementation uses in-memory data storage with mock data. This is suitable for development and demonstration purposes but not for production use.

## Database Options

For a production implementation, you could use one of the following databases:

### 1. PostgreSQL (Recommended)

PostgreSQL is a powerful, open-source object-relational database system that is highly extensible and compliant with SQL standards. It's well-suited for applications like DisMan that need to store structured data with relationships.

**Setup steps:**

1. Install PostgreSQL on your server
2. Create a new database for DisMan
3. Set up connection pooling
4. Create tables for resources, alerts, volunteers, etc.
5. Implement proper indexes for performance
6. Set up backup and recovery procedures

### 2. MongoDB

If you prefer a NoSQL approach, MongoDB is a document-oriented database that can work well for applications with flexible schema requirements.

**Setup steps:**

1. Install MongoDB on your server
2. Create a new database for DisMan
3. Set up collections for resources, alerts, volunteers, etc.
4. Implement proper indexes for performance
5. Set up backup and recovery procedures

## Connecting to the Database

Once you have set up your database, you'll need to:

1. Install the appropriate database driver for your chosen database
2. Update the API service in `src/services/api.ts` to use real database calls instead of mock data
3. Implement proper error handling and connection pooling
4. Set up environment variables for database credentials

## Environment Variables

Add the following environment variables to your `.env` file:

```
# PostgreSQL example
DB_HOST=localhost
DB_PORT=5432
DB_NAME=disman
DB_USER=postgres
DB_PASSWORD=your_password

# MongoDB example
MONGODB_URI=mongodb://localhost:27017/disman
```

## Migration from Mock Data

To migrate from the current mock data to a real database:

1. Create the necessary database schema/collections
2. Import the mock data as initial seed data
3. Update the API service to use the real database
4. Test thoroughly to ensure data integrity

## Security Considerations

- Never store database credentials in your codebase
- Use environment variables for sensitive information
- Implement proper authentication and authorization
- Consider using a connection pooling mechanism for better performance
- Regularly backup your database
- Implement proper logging and monitoring

## Next Steps

For implementation assistance or further guidance, please contact the development team.
