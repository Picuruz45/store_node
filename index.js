import express from "express";
import adminRouts from "./routs/adminRouts.js"
import db from "./config/db.js"

const app = express();

// Conectar con la base de datos
try {
    db.authenticate();
    db.sync();
    console.log("conexion establecida con BD")  
} catch (error) {
    console.log(error);
};

// Poder leer req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Habilitar pug
app.set("view engine", "pug");
app.set("views", "./views")

// Determina ubicacion de archivos estaticos para pug
app.use( express.static("public") );

app.use("/", adminRouts);

// Le asigna puerto al servidor 
const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto: ${PORT}`);
});