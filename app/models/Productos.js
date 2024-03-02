
// ONFIGURACION DE TABLA USUARIO

import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Productos = db.define("products", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Productos;