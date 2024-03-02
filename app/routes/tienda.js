import express from "express";
import { inicio, getItems, getCategori, allItmes, viewItem } from "../controllers/tienda.js"
const users = express.Router();

users.get("/inicio", inicio) // panel de compra
users.post("/searchItems", getItems) // buscar items
users.get("/viewItem/:id", viewItem) // obtener todos los items
users.get("/getCategori/:cat", getCategori) // obtener items por categoria
users.get("/allItem", allItmes) // obtener todos los items


export default users;