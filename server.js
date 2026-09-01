const express = require('express');
const multer = require('multer');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

const allowedOrigins = ['http://localhost:3000', 'https://fynit.app', 'https://www.fynit.app'];
app.use(require('cors')({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

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
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedMimeTypes = [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no válido. Solo se permiten PDF y Word.'));
        }
    }
});

// Configurar cliente de Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper para mostrar el label legible de cada campo
function labelEstado(val) {
    const map = { borrador: 'Borrador', terminado: 'Terminado', enviado: 'Ya fue enviado', rechazado: 'Fue rechazado' };
    return map[val] || val || 'No especificado';
}
function labelBusca(val) {
    const map = { revista: 'Revista', conferencia: 'Conferencia', no_seguro: 'No estoy seguro' };
    return map[val] || val || 'No especificado';
}
function labelIndexacion(val) {
    const map = { scopus: 'Scopus', wos: 'Web of Science (WoS)', scielo: 'SciELO', no_claro: 'No lo tengo claro' };
    return map[val] || val || 'No especificado';
}

// Limitador de solicitudes (Rate Limiter): Máximo 3 por día (24 horas)
const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 horas
    max: 3, // Limita cada IP a 3 peticiones por 'window' (por día)
    message: { error: 'Has alcanzado el límite de 3 envíos por día. Por favor, intenta de nuevo mañana.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Ruta API para recibir el formulario
app.post('/api/enviar-articulo', apiLimiter, upload.single('documento'), async (req, res) => {
    try {
        const file = req.file;
        const nombres = req.body.nombres || 'No especificado';
        const apellidos = req.body.apellidos || 'No especificado';
        const email = req.body.email || '';
        const estadoArticulo = labelEstado(req.body.estado_articulo);
        const queBuscas = labelBusca(req.body.que_buscas);
        const indexacion = labelIndexacion(req.body.indexacion);
        const destino = process.env.CORREO_DESTINO || 'delatorreandre03@gmail.com';
        const fechaEnvio = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

        if (!file) {
            return res.status(400).json({ error: 'No se adjuntó ningún archivo.' });
        }

        if (!email) {
            return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
        }

        // ================================================================
        // CORREO PARA EL EQUIPO FYNIT (con todos los datos + adjunto)
        // ================================================================
        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

        const mailEquipo = {
            from: `Fynit <${emailFrom}>`,
            to: destino,
            replyTo: email,
            subject: `Nueva evaluacion — ${apellidos}, ${nombres}`,
            html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#333333;">
  <div style="padding:40px 40px; width: 100%; box-sizing: border-box;">
    
    <!-- Logo / Header -->
    <div style="border-bottom:2px solid #1B60DF;padding-bottom:20px;margin-bottom:30px;">
      <h1 style="margin:0;color:#1B60DF;font-size:28px;font-weight:800;letter-spacing:-1px;">Fynit</h1>
      <p style="margin:5px 0 0;color:#666666;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Nueva Solicitud de Evaluación</p>
    </div>

    <!-- Intro -->
    <p style="margin:0 0 30px;font-size:16px;line-height:1.6;color:#444444;">
      Se ha recibido una nueva solicitud de evaluación de artículo científico. A continuación se presentan los detalles del investigador y el documento adjunto.
    </p>

    <!-- Content Table -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;border-collapse:collapse; max-width: 1000px;">
      <!-- Section 1 -->
      <tr>
        <td colspan="2" style="padding:15px 0 5px;border-bottom:1px solid #eeeeee;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">
          Datos del Investigador
        </td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Nombre Completo</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${nombres} ${apellidos}</td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;border-bottom:1px solid #eeeeee;">Correo Electrónico</td>
        <td style="padding:15px 0;font-size:15px;border-bottom:1px solid #eeeeee;">
          <a href="mailto:${email}" style="color:#1B60DF;text-decoration:none;">${email}</a>
        </td>
      </tr>
      
      <!-- Section 2 -->
      <tr>
        <td colspan="2" style="padding:30px 0 5px;border-bottom:1px solid #eeeeee;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">
          Detalles del Documento
        </td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Estado del Artículo</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${estadoArticulo}</td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Tipo de Publicación</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${queBuscas}</td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Indexación Deseada</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${indexacion}</td>
      </tr>
      <tr>
        <td width="30%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;border-bottom:1px solid #eeeeee;">Archivo Adjunto</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;border-bottom:1px solid #eeeeee;">
          <strong>${file.originalname}</strong> <span style="color:#999999;font-size:13px;">(${(file.size/1024/1024).toFixed(2)} MB)</span>
        </td>
      </tr>
    </table>

    <!-- Action -->
    <div style="margin-bottom:40px;">
      <a href="mailto:${email}?subject=Re: Evaluación de tu artículo — Fynit" style="display:inline-block;background:#1B60DF;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:4px;">
        Responder al investigador
      </a>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #eeeeee;padding-top:20px;font-size:12px;color:#999999;">
      <p style="margin:0;">Enviado el ${fechaEnvio} — Fynit. Mensaje generado automáticamente.</p>
    </div>
  </div>
</body>
</html>`,
        };

        // ================================================================
        // CORREO DE CONFIRMACIÓN PARA EL CLIENTE
        // ================================================================
        const mailCliente = {
            from: `Fynit <${emailFrom}>`,
            to: email,
            subject: `Confirmacion de recepcion — Fynit`,
            html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#333333;">
  <div style="padding:40px 40px; width: 100%; box-sizing: border-box;">
    
    <!-- Logo / Header -->
    <div style="border-bottom:2px solid #1B60DF;padding-bottom:20px;margin-bottom:30px;">
      <h1 style="margin:0;color:#1B60DF;font-size:28px;font-weight:800;letter-spacing:-1px;">Fynit</h1>
      <p style="margin:5px 0 0;color:#666666;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Confirmación de Recepción</p>
    </div>

    <!-- Greeting -->
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#111111;">
      Hola <strong>${nombres}</strong>,
    </p>

    <!-- Intro -->
    <p style="margin:0 0 30px;font-size:16px;line-height:1.6;color:#444444;">
      Te escribimos para confirmar que hemos recibido correctamente tu documento <strong>${file.originalname}</strong>. Nuestro equipo de revisión ha sido notificado y el análisis comenzará de inmediato.
    </p>

    <!-- Content Table -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;border-collapse:collapse; max-width: 1000px;">
      <tr>
        <td colspan="2" style="padding:15px 0 5px;border-bottom:1px solid #eeeeee;font-size:12px;font-weight:700;color:#999999;text-transform:uppercase;letter-spacing:1px;">
          Resumen de tu Solicitud
        </td>
      </tr>
      <tr>
        <td width="40%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Estado actual</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${estadoArticulo}</td>
      </tr>
      <tr>
        <td width="40%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;">Publicación objetivo</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;">${queBuscas}</td>
      </tr>
      <tr>
        <td width="40%" style="padding:15px 0;font-size:14px;color:#666666;font-weight:600;border-bottom:1px solid #eeeeee;">Indexación deseada</td>
        <td style="padding:15px 0;font-size:15px;color:#111111;border-bottom:1px solid #eeeeee;">${indexacion}</td>
      </tr>
    </table>

    <p style="margin:0 0 40px;font-size:16px;line-height:1.6;color:#444444;">
      Nos pondremos en contacto contigo respondiendo a este mismo correo con los resultados y los próximos pasos recomendados para publicar tu investigación.
    </p>

    <!-- Footer -->
    <div style="border-top:1px solid #eeeeee;padding-top:20px;font-size:12px;color:#999999;line-height:1.5;">
      <p style="margin:0 0 5px;">Si tienes alguna pregunta adicional, puedes responder directamente a este correo.</p>
      <p style="margin:0;">&copy; ${new Date().getFullYear()} Fynit. Tu investigación es estrictamente confidencial.</p>
    </div>
  </div>
</body>
</html>
            `
        };

        // Leer el archivo adjunto como base64 para Resend
        const fileBuffer = fs.readFileSync(file.path);
        const fileBase64 = fileBuffer.toString('base64');

        // Agregar adjunto al correo del equipo
        mailEquipo.attachments = [
            {
                filename: file.originalname,
                content: fileBase64
            }
        ];

        // Enviar ambos correos en paralelo con Resend
        await Promise.all([
            resend.emails.send(mailEquipo),
            resend.emails.send(mailCliente)
        ]);

        res.status(200).json({ success: true, message: 'Artículo recibido y correos enviados correctamente.' });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar el archivo o enviar el correo.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Fynit corriendo en http://localhost:${PORT}`);
});
