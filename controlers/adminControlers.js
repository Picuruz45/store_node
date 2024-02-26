
import Productos from "../models/Productos.js";
import CategoriasBD from "../models/Categorias.js";
import { Op } from 'sequelize';
// import { check, validationResult } from "express-validator"; 

const inicio = async (req, res) => {

    const categoriasInicio = await CategoriasBD.findAll();

    let categorias = [];

    categoriasInicio.forEach( e => {

        const categoriasObject = {
            nombre: e.nombre,
            url: e.urlImg
        }

        categorias = [... categorias, categoriasObject]
    })

    res.render("layout/layout", {
        pagina: "inicio",
        categorias
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
        pagina: "Resultados",
        busqueda
    })
};

const allProductos = async (req, res) => {
    const allProducts = await Productos.findAll()
    
    res.render("paginas/busqueda", {
        productos: allProducts,
        pagina: "Todos los Productos"
    })
};

const obtenerCategorias = async (req, res) => {    
    const { cat } = req.params;

    const categoriaElementos = await Productos.findAll({ where: {descripcion: {[Op.like]: cat}}})

    res.render("paginas/busqueda", {
        productos: categoriaElementos,
        pagina: cat
    })
};

export {
    inicio,
    buscarProductos,
    allProductos,
    obtenerCategorias
}