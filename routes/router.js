
import { inicio, searchProduct, allProductos, categories, productView } from "../controlers/adminControlers.js"  
import express from "express";
const router = express.Router();

// Pagina de inicio
router.route("/inicio").get(inicio).post(searchProduct);

router.get("/categoria/:cat", categories)

router.get("/product-page/:id", productView)
router.get("/productos", allProductos);

export default router;