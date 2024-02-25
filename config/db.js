import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({path: ".env"});

// 1-
const db = new Sequelize( process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: "mysql", // 2-
    define: {
        timestamps: false // 3-
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;

