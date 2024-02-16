const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: {
        useUTC: false, //for reading from database
    },
    timezone: '+07:00', //for writing to database
    operatorAlias: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// define model
db.tourism = require('./tourism.model')(sequelize, Sequelize);

const initializeDatabase = async () => {
  try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      await sequelize.sync({ force: false }); // Sync models with the database
    //   await sequelize.sync({ force: true }); // Drop all table and create new
      console.log("Database synchronized.");
  } catch (error) {
      console.error("Unable to connect to the database:", error.message);
      throw error; // rethrow the error to be caught in server.js
  }
};

module.exports = { db, initializeDatabase };