import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Categorias = db.define("categorias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    urlImg: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export default Categorias;