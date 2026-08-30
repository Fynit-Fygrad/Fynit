const express = require('express');
const multer = require('multer');
const { Resend } = require('resend');
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

// Ruta API para recibir el formulario
app.post('/api/enviar-articulo', upload.single('documento'), async (req, res) => {
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
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%;">

          <!-- Logo / marca -->
          <tr>
            <td style="padding-bottom:28px;border-bottom:2px solid #1B60DF;">
              <span style="font-size:13px;font-weight:700;color:#1B60DF;letter-spacing:0.05em;text-transform:uppercase;">Fynit</span>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:28px 0 0;">
              <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#111827;">Nueva solicitud de evaluacion</p>
              <p style="margin:0;font-size:13px;color:#6b7280;">${fechaEnvio}</p>
            </td>
          </tr>

          <!-- Separador -->
          <tr><td style="padding:24px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>

          <!-- Datos del investigador -->
          <tr>
            <td>
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Investigador</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Nombre</td>
                  <td style="padding:6px 0;font-size:14px;font-weight:600;color:#111827;">${nombres} ${apellidos}</td>
                </tr>
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Correo</td>
                  <td style="padding:6px 0;">
                    <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#1B60DF;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Separador -->
          <tr><td style="padding:24px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>

          <!-- Datos del articulo -->
          <tr>
            <td>
              <p style="margin:0 0 16px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;">Articulo cientifico</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Estado</td>
                  <td style="padding:6px 0;font-size:14px;color:#111827;">${estadoArticulo}</td>
                </tr>
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Publicacion</td>
                  <td style="padding:6px 0;font-size:14px;color:#111827;">${queBuscas}</td>
                </tr>
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Indexacion</td>
                  <td style="padding:6px 0;font-size:14px;color:#111827;">${indexacion}</td>
                </tr>
                <tr>
                  <td width="140" style="padding:6px 0;font-size:13px;color:#6b7280;vertical-align:top;">Archivo adjunto</td>
                  <td style="padding:6px 0;font-size:14px;color:#111827;">${file.originalname} <span style="color:#9ca3af;font-size:12px;">(${(file.size/1024/1024).toFixed(2)} MB)</span></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Separador -->
          <tr><td style="padding:24px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;"></td></tr>

          <!-- Boton responder -->
          <tr>
            <td style="padding-bottom:40px;">
              <a href="mailto:${email}?subject=Re: Evaluacion de tu articulo — Fynit"
                style="display:inline-block;background:#1B60DF;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;padding:10px 22px;border-radius:5px;">
                Responder al investigador
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #e5e7eb;padding-top:20px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Fynit &middot; Mensaje generado automaticamente</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 16px !important; }
      .card { border-radius: 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table class="card" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e4e4e4;border-radius:6px;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1B60DF;padding:24px 32px;border-radius:6px 6px 0 0;">
              <p style="margin:0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.1em;text-transform:uppercase;">Fynit — Confirmacion de recepcion</p>
              <h1 style="margin:6px 0 0;font-size:18px;font-weight:700;color:#ffffff;">Recibimos tu articulo</h1>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td class="wrapper" style="padding:28px 32px;">

              <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.7;">Hola, <strong>${nombres}</strong>:</p>
              <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.7;">
                Confirmamos la recepcion del documento <strong>${file.originalname}</strong>. Nuestro equipo lo revisara y te contactara a la brevedad con los resultados del analisis.
              </p>

              <!-- RESUMEN -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">Resumen de tu solicitud</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border:1px solid #e4e4e4;border-radius:4px;margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">Estado del articulo</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#111827;">${estadoArticulo}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">Tipo de publicacion</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#111827;">${queBuscas}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">Indexacion objetivo</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#111827;">${indexacion}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">Si tienes alguna consulta, puedes responder directamente a este correo.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #e4e4e4;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">Fynit — Tu investigacion es confidencial y no sera compartida con terceros.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
