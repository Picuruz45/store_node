
import Productos from "../models/Productos.js";
import { Op } from 'sequelize';
// import { check, validationResult } from "express-validator"; 

const inicio = (req, res) => {
    res.render("layout/layout", {
        pagina: "inicio"
    });
};

const buscarProductos = async (req, res) => {
    const { busqueda } = req.body;

    const genero = await Productos.findAll({ where: {descripcion: {[Op.like]: `%${busqueda}%`}} })
    const producto = await Productos.findAll({ where: { nombre: {[Op.like]: `%${busqueda}%`} } });

    if(genero?.length == 0 && genero?.length == 0){
        return res.render("paginas/busqueda", {
            error: true,
            msg: "No se encontro nada con ese nombre"
        })
    }

    res.render("paginas/busqueda", {
        producto,
        genero
    })
};

const allProductos = async (req, res) => {
    try {
        const producto = await Productos.findAll();

        res.render("paginas/busqueda", {
            producto
        })
    } catch (error) {
        console.log(error)
    }
};

export {
    inicio,
    buscarProductos,
    allProductos
}