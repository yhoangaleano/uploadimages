// Importaciones de Node
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Inicializo express
let app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['x-access-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Configuración de respuestas tipo json
app.use(express.json());

// Generell properties
let UPLOAD_PATH = 'uploads'

// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let upload = multer({ storage: storage });

// Upload a new image with description
app.post('/images', upload.single('image'), (req, res, next) => {
    console.log(req.body.desc);
    // Create a new image model and fill the properties
    console.log(req.file.filename);
    console.log(req.file.originalname);
    console.log(req.body.desc);
});

// Creamos e inicializamos el servidor
let server = app.listen(app.get('port'), () => {

    let host = server.address().address
    let port = server.address().port

    console.log("La app esta corriendo por http://%s:%s", host, port)
});