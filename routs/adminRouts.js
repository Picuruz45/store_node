
import { inicio, buscarProductos, allProductos, obtenerCategorias } from "../controlers/adminControlers.js"  
import express from "express";
const adminRouts = express.Router();

// Pagina de inicio
adminRouts.route("/inicio").get(inicio).post(buscarProductos);

adminRouts.get("/categoria/:cat", obtenerCategorias)

// Mostrar productos
adminRouts.get("/productos", allProductos);

export default adminRouts;