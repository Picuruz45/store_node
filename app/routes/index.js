import express from "express";
const router = express.Router();
import admin from "./admin.js";
import tienda from "./tienda.js";
// import auth from "./auth.js";

router.use("/tienda", tienda)
router.use("/admin", admin)
// router.use("/auth", auth)

export default router;