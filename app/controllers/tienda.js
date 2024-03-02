import Categorias from "../models/Categorias.js";
import Productos from "../models/Productos.js";
import { Op } from 'sequelize';

// Pagina de Inicio
const inicio = async (req, res) => {
    try {
        // trae las categorias de la BD
        const getCategorias = await Categorias.findAll();

        let categorias = [];

        getCategorias.forEach( e => {

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
}

// Logica del Buscador
const getItems = async (req, res) => {
    const { search } = req.body;

    const words = search.split(" ");

    try {
        
        let allProducts = [];

        for(let i = 0; i < words.length; i++){
            const products = await Productos.findAll({
                where: {
                    [Op.or]: [
                        { descripcion: { [Op.like]: `%${words[i]}%` } },
                        { nombre: { [Op.like]: `%${words[i]}%` } }
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
            search
        })

    } catch (error) {
        console.log(error)
    }
}

// Panel de visualizacion del Item
const viewItem = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Productos.findOne({ where: { id: id } })

        res.render("templates/productPage", {
            product,
        })
    } catch (error) {
        console.log(error)
    }
}

// Obtener Registros por Categoria
const getCategori = async (req, res) => {
    const { cat } = req.params;

    const categoriaElementos = await Productos.findAll({ where: {descripcion: {[Op.like]: cat}}})

    res.render("paginas/busqueda", {
        productos: categoriaElementos,
        pagina: cat
    })
}

// Obtener todos los Registros
const allItmes = async (req, res) => {
    const allItems = await Productos.findAll()
    
    res.render("paginas/busqueda", {
        productos: allItems,
        pagina: "Todos los Productos"
    })
}

export {
    inicio,
    getItems,
    getCategori,
    allItmes,
    viewItem
}
