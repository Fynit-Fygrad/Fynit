# Seguridad en Fynit Backend

Este documento resume las medidas de seguridad implementadas en el servidor de Node.js (`server.js`) para proteger la integridad de los datos, prevenir ataques comunes y asegurar un rendimiento óptimo de la aplicación.

## 1. Protección contra Abuso (Rate Limiting)
Se ha implementado un limitador de solicitudes (`express-rate-limit`) en el endpoint de envío de formularios. 
- Restringe el número de envíos a un máximo de **3 por día por dirección IP**.
- Previene ataques de denegación de servicio (DoS) y el abuso de las cuotas del servicio de correo (Resend).

## 2. Restricción de Orígenes (CORS)
El servidor valida las peticiones a través de CORS (Cross-Origin Resource Sharing).
- Solo se aceptan peticiones provenientes del dominio oficial (`fynit.app` / `www.fynit.app`) y el entorno de desarrollo local.
- Protege la API de ser utilizada por sitios web de terceros no autorizados.

## 3. Filtrado y Validación de Archivos
Se utilizan políticas estrictas para la subida de archivos mediante `multer`.
- **Tipo de Archivo:** Solo se permite la subida de documentos específicos (PDF y formatos de Microsoft Word). Cualquier otro formato o archivo malicioso oculto será rechazado automáticamente.
- **Límite de Tamaño (Nginx):** El tamaño de los archivos está restringido a nivel de infraestructura para evitar saturar el disco.

## 4. Límites de Carga Útil (Payload Limits)
Las peticiones JSON y de formularios están restringidas mediante `express.json` y `express.urlencoded`.
- Se ha establecido un límite máximo de **100 KB** para el texto enviado.
- Esto evita que atacantes envíen paquetes de datos masivos con el fin de sobrecargar la memoria del servidor.

## 5. Encabezados HTTP de Seguridad (Helmet)
El servidor utiliza la librería `helmet` para configurar de manera invisible y automática varios encabezados HTTP de seguridad.
- Protege la aplicación contra vulnerabilidades web conocidas (por ejemplo, previniendo ataques de tipo *Clickjacking* y *Cross-Site Scripting* (XSS)).
- Oculta información tecnológica sensible para dificultar la perfilación por parte de atacantes.
