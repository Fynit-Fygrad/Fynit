const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// Servir archivos estáticos (tu página web)
app.use(express.static(path.join(__dirname, '')));

// Asegurar que exista la carpeta uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurar multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Configurar transporter de Nodemailer
// OJO: Si usas Gmail, recuerda usar una "Contraseña de aplicación", no tu contraseña normal.
const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio SMTP que utilices
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta API para recibir el formulario
app.post('/api/enviar-articulo', upload.single('documento'), async (req, res) => {
    try {
        const file = req.file;
        const nombres = req.body.nombres || 'No especificado';
        const apellidos = req.body.apellidos || 'No especificado';
        const email = req.body.email; // Asegúrate de que el frontend envíe el campo 'email'
        const destino = process.env.CORREO_DESTINO || 'delatorreandre03@gmail.com';

        if (!file) {
            return res.status(400).json({ error: 'No se adjuntó ningún archivo.' });
        }

        if (!email) {
            return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
        }

        // Configurar el contenido del correo
        const mailOptions = {
            from: `"Fynit Plataforma" <${process.env.EMAIL_USER}>`,
            to: destino,
            subject: `Nuevo Artículo Recibido - ${apellidos}, ${nombres}`,
            html: `
                <h2>Nuevo Artículo Subido</h2>
                <p><strong>Nombres:</strong> ${nombres}</p>
                <p><strong>Apellidos:</strong> ${apellidos}</p>
                <p><strong>Correo de contacto:</strong> ${email}</p>
                <p>El documento ha sido guardado en el servidor y se encuentra adjunto a este correo.</p>
                <p><small>Este es un correo automático generado por Fynit.</small></p>
            `,
            attachments: [
                {
                    filename: file.originalname,
                    path: file.path // Ruta donde multer guardó el archivo localmente
                }
            ]
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Artículo recibido y correo enviado correctamente.' });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar el archivo o enviar el correo.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Fynit corriendo en http://localhost:${PORT}`);
});
