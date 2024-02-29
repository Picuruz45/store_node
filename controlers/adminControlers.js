
import Productos from "../models/Productos.js";
import CategoriasBD from "../models/Categorias.js";
import { Op } from 'sequelize';
// import { check, validationResult } from "express-validator"; 

const inicio = async (req, res) => {

    try {
        // trae las categorias de la BD
        const categoriasInicio = await CategoriasBD.findAll();

        let categorias = [];

        categoriasInicio.forEach( e => {

            const categoriasObject = {
                nombre: e.nombre,
                url: e.urlImg
            }

            categorias.push(categoriasObject)
        })

        // traer productos panel inferior
        const productosRelevantes = await Productos.findAll()

        res.render("layout/layout", {
            pagina: "inicio",
            panelInferior: productosRelevantes,
            categorias
        });
    } catch (error) {
        console.log(error);
    }
    
};

const searchProduct = async (req, res) => {
    const { busqueda } = req.body;

    const palabras = busqueda.split(" ");

    try {
        
        let allProducts = [];

        for(let i = 0; i < palabras.length; i++){
            const products = await Productos.findAll({
                where: {
                    [Op.or]: [
                        { descripcion: { [Op.like]: `%${palabras[i]}%` } },
                        { nombre: { [Op.like]: `%${palabras[i]}%` } }
                    ]
                }
            });

            products.forEach( element => {
                const productObject = {
                    nombre: element.nombre,
                    descripcion: element.descripcion,
                    url: element.url,
                    precio: element.precio,
                    id: element.id
                }
    
                allProducts.push(productObject);
            })
        }

        res.render("paginas/busqueda", {
            productos: allProducts,
            pagina: "Resultados",
            busqueda
        })

    } catch (error) {
        console.log(error)
    }
};

const allProductos = async (req, res) => {
    const allProducts = await Productos.findAll()
    
    res.render("paginas/busqueda", {
        productos: allProducts,
        pagina: "Todos los Productos"
    })
};

const categories = async (req, res) => {    
    const { cat } = req.params;

    const categoriaElementos = await Productos.findAll({ where: {descripcion: {[Op.like]: cat}}})

    res.render("paginas/busqueda", {
        productos: categoriaElementos,
        pagina: cat
    })
};

const productView = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Productos.findOne({ where: { id: id } })

        res.render("templates/productPage", {
            product,
        })
    } catch (error) {
        console.log(error)
    }
};

export {
    inicio,
    searchProduct,
    allProductos,
    categories,
    productView
}