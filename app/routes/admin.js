import express from "express";
import { getItems, addItems, modifItem, deleteItem } from "../controllers/admin.js"
const admin = express.Router();

admin.get("/getItems", getItems) // obtener productos
admin.post("/addItems", addItems) // agregar productos
admin.put("/modifItem", modifItem) // actualizar producto
admin.delete("/deleteItem", deleteItem) // eliminar producto

export default admin;