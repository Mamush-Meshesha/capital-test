// import { Sequelize } from "sequelize";
// import { registerModels } from "../models/index.js";

// class Database {
//   constructor(environment) {
//     this.environment = environment;
//     this.dbConfig = {
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       dialect: "postgres",
//     };
//   }

//   getConnectionString() {
//     const { username, password, database, host, port } = this.dbConfig;
//     return `postgres://${username}:${password}@${host}:${port}/${database}`;
//   }

//   async connect() {
//     const url = this.getConnectionString();
//     this.connection = new Sequelize(url);

//     try {
//       await this.connection.authenticate();
//       console.log("Database connected successfully.");

//       // register models
//       this.models = await registerModels(this.connection);

//       // If you want to sync the models with the database, uncomment the next line
//       // await this.connection.sync();

//       console.log("Models registered successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//       throw error;
//     }
//   }

//   getModels() {
//     return this.models;
//   }

//   // If you need a method to sync models, you can add this
//   async syncModels({ force = true } = {}) {
//     if (this.connection) {
//       await this.connection.sync(force);
//       console.log("Models synchronized with the database.");
//     } else {
//       console.error("Cannot sync models: Database is not connected.");
//     }
//   }
// }

// export default Database;

const { Sequelize } = require('sequelize');

// Define the connection using Sequelize
const sequelize = new Sequelize( {
  username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
});

// Export the connection
module.exports = sequelize;
