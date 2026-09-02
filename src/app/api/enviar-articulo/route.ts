import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// Helpers para los labels (igual que en el backend viejo)
function labelEstado(val: string) {
    const map: Record<string, string> = { borrador: 'Borrador', terminado: 'Terminado', enviado: 'Ya fue enviado', rechazado: 'Fue rechazado' };
    return map[val] || val || 'No especificado';
}
function labelBusca(val: string) {
    const map: Record<string, string> = { revista: 'Revista', conferencia: 'Conferencia', no_seguro: 'No estoy seguro' };
    return map[val] || val || 'No especificado';
}
function labelIndexacion(val: string) {
    const map: Record<string, string> = { scopus: 'Scopus', wos: 'Web of Science (WoS)', scielo: 'SciELO', no_claro: 'No lo tengo claro' };
    return map[val] || val || 'No especificado';
}

// In-memory rate limiting simple para Next.js (ya que no podemos usar express-rate-limit)
const rateLimitMap = new Map<string, { count: number; date: number }>();
const MAX_REQUESTS_PER_DAY = 3;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
    try {
        // --- 1. Rate Limiter ---
        // Usamos la IP o un identificador (en edge/serverless el IP viene en headers)
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();
        const record = rateLimitMap.get(ip);
        
        if (record) {
            if (now - record.date > ONE_DAY_MS) {
                // Reset si pasó 1 día
                rateLimitMap.set(ip, { count: 1, date: now });
            } else if (record.count >= MAX_REQUESTS_PER_DAY) {
                return NextResponse.json({ error: 'Has alcanzado el límite de 3 envíos por día. Por favor, intenta de nuevo mañana.' }, { status: 429 });
            } else {
                rateLimitMap.set(ip, { count: record.count + 1, date: record.date });
            }
        } else {
            rateLimitMap.set(ip, { count: 1, date: now });
        }

        // --- 2. Procesar FormData y Honeypot ---
        const formData = await req.formData();
        
        // Honeypot check: si el campo invisible tiene texto, es un bot.
        const honeypot = formData.get('telefono_secundario');
        if (honeypot) {
            console.log(`🛡️ Honeypot activado. Spam bloqueado de la IP: ${ip}`);
            // Falso positivo para engañar al bot
            return NextResponse.json({ success: true, message: 'Artículo recibido y procesado.' }, { status: 200 });
        }

        const file = formData.get('documento') as File | null;
        
        if (!file) {
            return NextResponse.json({ error: 'No se adjuntó ningún archivo.' }, { status: 400 });
        }

        // Validaciones de seguridad de archivo
        const allowedMimeTypes = [
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedMimeTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Formato de archivo no válido. Solo se permiten PDF y Word.' }, { status: 400 });
        }

        // Límite de 15 MB
        if (file.size > 15 * 1024 * 1024) {
            return NextResponse.json({ error: 'El archivo supera el límite de 15MB.' }, { status: 400 });
        }

        // --- 3. Leer los datos del formulario ---
        const nombres = (formData.get('nombres') as string) || 'No especificado';
        const apellidos = (formData.get('apellidos') as string) || 'No especificado';
        const email = (formData.get('email') as string) || '';
        const estadoArticulo = labelEstado(formData.get('estado_articulo') as string);
        const queBuscas = labelBusca(formData.get('que_buscas') as string);
        const indexacion = labelIndexacion(formData.get('indexacion') as string);
        const destino = process.env.CORREO_DESTINO || 'delatorreandre03@gmail.com';
        const fechaEnvio = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

        if (!email) {
            return NextResponse.json({ error: 'El correo electrónico es obligatorio.' }, { status: 400 });
        }

        // --- 4. Convertir archivo a Buffer (Base64) en Memoria ---
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileBase64 = buffer.toString('base64');

        // --- 5. Configurar correos ---
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
          <strong>${file.name}</strong> <span style="color:#999999;font-size:13px;">(${(file.size/1024/1024).toFixed(2)} MB)</span>
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
            attachments: [
                {
                    filename: file.name,
                    content: fileBase64
                }
            ]
        };

        const mailCliente = {
            from: `Fynit <${emailFrom}>`,
            to: email,
            subject: `Confirmacion de recepcion — Fynit`,
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
      <p style="margin:5px 0 0;color:#666666;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Confirmación de Recepción</p>
    </div>

    <!-- Greeting -->
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#111111;">
      Hola <strong>${nombres}</strong>,
    </p>

    <!-- Intro -->
    <p style="margin:0 0 30px;font-size:16px;line-height:1.6;color:#444444;">
      Te escribimos para confirmar que hemos recibido correctamente tu documento <strong>${file.name}</strong>. Nuestro equipo de revisión ha sido notificado y el análisis comenzará de inmediato.
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
</html>`
        };

        // --- 6. Enviar vía Resend ---
        // Se ejecuta el envío de correo
        const [resEquipo, resCliente] = await Promise.all([
            resend.emails.send(mailEquipo),
            resend.emails.send(mailCliente)
        ]);

        if (resEquipo.error) {
            console.error("Error al enviar correo al equipo:", resEquipo.error);
        }
        if (resCliente.error) {
            console.error("Error al enviar correo al cliente (Probablemente dominio no verificado):", resCliente.error);
        }
        
        console.log("Correos procesados, archivo recibido en memoria de:", file.size, "bytes");

        return NextResponse.json({ success: true, message: 'Artículo recibido y procesado.' }, { status: 200 });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return NextResponse.json({ error: 'Ocurrió un error al procesar el archivo o enviar el correo.' }, { status: 500 });
    }
}
