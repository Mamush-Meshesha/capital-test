# Sequelize to Prisma Migration

This document outlines the migration from Sequelize ORM to Prisma ORM for the Capital Test project.

## Changes Made

### 1. Dependencies

- **Removed**: `sequelize`, `sequelize-cli`
- **Added**: `prisma`, `@prisma/client`

### 2. Database Schema

- Created `prisma/schema.prisma` with all models from Sequelize
- Converted Sequelize associations to Prisma relations
- Updated enum values to match Prisma conventions (e.g., "Preparing" → "PREPARING")

### 3. Database Connection

- Replaced Sequelize connection with Prisma client
- Updated `server.js` to use Prisma connection
- Created `lib/prisma.js` for Prisma client instance

### 4. Controllers Updated

- **user.controller.js**: Updated all database operations to use Prisma
- **admin.controller.js**: Converted Sequelize queries to Prisma
- **manager.controller.js**: Updated all CRUD operations
- **pizza.controller.js**: Converted complex joins to Prisma includes

### 5. Middleware Updated

- **authMiddleware.js**: Updated authentication to use Prisma for user lookups

### 6. File Structure Changes

- Removed `models/` directory (Sequelize models)
- Removed `migrations/` directory (Sequelize migrations)
- Added `prisma/` directory with schema and migrations

## Database Setup

1. Set up your PostgreSQL database
2. Create a `.env` file with:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/capital_test_db"
   JWT_ACCESS_TOKEN="your_jwt_secret_key_here"
   IMGUR_CLIENT_ID="your_imgur_client_id_here"
   PORT=3000
   ```

3. Run Prisma commands:
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:migrate   # Create and apply migrations
   npm run db:studio    # Open Prisma Studio (optional)
   ```

## Key Differences

### Query Syntax

- **Sequelize**: `Model.findAll({ include: [...] })`
- **Prisma**: `prisma.model.findMany({ include: {...} })`

### Transactions

- **Sequelize**: `sequelize.transaction()`
- **Prisma**: `prisma.$transaction()`

### Associations

- **Sequelize**: `belongsTo`, `hasMany`, `belongsToMany`
- **Prisma**: Relations defined in schema with `@relation`

## Benefits of Migration

1. **Type Safety**: Prisma provides better TypeScript support
2. **Better Performance**: Optimized queries and connection pooling
3. **Modern API**: More intuitive and developer-friendly
4. **Better Documentation**: Auto-generated documentation
5. **Database Introspection**: Easy schema management

## Testing

After migration, test all endpoints to ensure:

- User registration and login
- Admin operations
- Manager operations
- Order creation and management
- Menu and topping management

## Notes

- All existing functionality has been preserved
- Database schema remains the same
- API endpoints unchanged
- Frontend code requires no changes

