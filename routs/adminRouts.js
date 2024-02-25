
import { inicio, buscarProductos, allProductos } from "../controlers/adminControlers.js"  
import express from "express";
const adminRouts = express.Router();

// Pagina de inicio
adminRouts.get("/inicio", inicio);
adminRouts.post("/inicio", buscarProductos);

// Mostrar productos
adminRouts.get("/productos", allProductos);

export default adminRouts;