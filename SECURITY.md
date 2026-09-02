# 🛡️ Seguridad en Fynit

En Fynit nos tomamos muy en serio la seguridad y la privacidad de las investigaciones de nuestros usuarios. A continuación, te explicamos de manera sencilla todas las barreras de protección que tiene este proyecto para evitar ataques, spam o filtraciones de información.

---

## 1. Protección contra el Spam (Rate Limiting y Honeypot)
**¿Qué es?** Es una doble trampa y un límite de velocidad para los envíos.
**¿Cómo nos protege?** 
1. **El Límite de Velocidad (Rate Limiting):** Si alguien intenta enviar correos basura a través del formulario, el sistema detecta su IP y le permite un máximo de 3 envíos por día por persona. Al cuarto intento, el servidor lo bloqueará automáticamente.
2. **El Tarro de Miel atrapa osos (Honeypot):** El formulario tiene un campo invisible para los humanos pero visible en el código para los bots. Si un bot rellena este campo invisible, el servidor intercepta el formulario y lo destruye silenciosamente sin gastar tu cuota de envíos. ¡Protección anti-spam garantizada sin molestar a tus clientes con captchas visuales!

## 2. Privacidad Absoluta (Procesamiento en Memoria)
**¿Qué es?** Los documentos nunca tocan nuestro disco duro.
**¿Cómo nos protege?** 
Cuando un investigador sube su PDF o Word, el archivo viaja directo a la memoria RAM ultra-rápida del servidor, se procesa en milisegundos, se envía por correo y **se destruye inmediatamente**. Como los archivos nunca se guardan en una carpeta del servidor, es imposible que un hacker pueda robar las investigaciones de nuestros clientes. ¡Privacidad 100% garantizada!

## 3. Escudo de Archivos Peligrosos (Validación MIME)
**¿Qué es?** Un filtro estricto de formatos.
**¿Cómo nos protege?** 
El servidor está entrenado para ser desconfiado. Si alguien intenta subir un archivo que parece un PDF, pero por dentro es un virus o un archivo ejecutable (como un `.exe`), el sistema lo analizará, detectará el engaño y lo bloqueará al instante. **Solo se permiten archivos genuinos de Word o PDF.**

## 4. Límite de Peso (Escudo Nginx y Backend)
**¿Qué es?** No permitimos archivos gigantes.
**¿Cómo nos protege?** 
Para evitar que alguien intente colapsar o "tumbar" la página subiendo archivos de 500 MB (ataque DDoS), tenemos un guardia de seguridad doble:
1. **Nginx:** Rechaza cualquier petición mayor a 20 MB antes de que siquiera toque nuestra aplicación.
2. **Next.js (Backend):** Corta el proceso si el archivo pesa más de 15 MB.

## 5. Secretos Ocultos (Variables de Entorno)
**¿Qué es?** Una bóveda para contraseñas.
**¿Cómo nos protege?** 
Las llaves secretas que usamos para enviar correos (como la API Key de Resend) viven en un archivo `.env` que es invisible para los usuarios de la web y nunca se sube a internet (GitHub). Si alguien inspecciona el código de la página, jamás encontrará nuestras contraseñas.

## 6. Arquitectura Segura (React + Next.js)
**¿Qué es?** La tecnología base del proyecto.
**¿Cómo nos protege?** 
Al usar React, estamos protegidos por defecto contra uno de los ataques más comunes de internet llamado **XSS** (Cross-Site Scripting). Es casi imposible que alguien inyecte código malicioso en nuestros textos. Además, usamos TypeScript, que es como tener un supervisor revisando cada línea de código para asegurar que no haya errores graves antes de publicarlo.

---
*Fynit es una plataforma segura, rápida y diseñada pensando en la confidencialidad de la ciencia.*
