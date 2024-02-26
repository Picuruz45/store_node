
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

    const palabras = busqueda.split(" ");
    
    let productoResultados = [];
    let resultadoObjetos = [];

    for(let i = 0; i < palabras.length; i++){
        const genero = await Productos.findAll({ where: {descripcion: {[Op.like]: `%${palabras[i]}%`}} })
        const producto = await Productos.findAll({ where: { nombre: {[Op.like]: `%${palabras[i]}%`} } });

        if(genero[0] != undefined ){
            productoResultados = [...productoResultados, genero]
        }

        if(producto[0] != undefined){
            productoResultados = [...productoResultados, producto]
        }
    }

    for(let i = 0; i < productoResultados.length; i++){
        for(let j = 0; j < productoResultados[i].length; j++){
            const { nombre, descripcion, url, precio } = productoResultados[i][j];

            const datosBusqueda = {
                nombre,
                descripcion,
                url,
                precio
            }

            resultadoObjetos = [...resultadoObjetos, datosBusqueda]
        }
    }
    
    res.render("paginas/busqueda", {
        productos: resultadoObjetos,
        busqueda
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