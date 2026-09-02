# Fynit - Landing Page & Sistema de Evaluación

¡Bienvenido al repositorio oficial de **Fynit**! Este proyecto es una plataforma web moderna diseñada para ofrecer servicios de evaluación, diagnóstico y asesoría de artículos científicos para investigadores.

## 🚀 Tecnologías y Lenguajes

Este proyecto fue migrado de una arquitectura tradicional (HTML estático + Node.js/Express) a un entorno moderno "Full Stack" utilizando las mejores tecnologías actuales del mercado:

- **Framework Principal:** [Next.js (App Router)](https://nextjs.org/)
- **Librería UI:** [React 18/19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (JavaScript con tipado estricto)
- **Estilos:** CSS puro (con animaciones de AOS - Animate On Scroll)
- **Correos Transaccionales:** [Resend SDK](https://resend.com/)

---

## 📂 Estructura del Proyecto

El código está organizado siguiendo los estándares del "App Router" de Next.js:

```text
Fynit/
├── public/                 # Archivos estáticos públicos (imágenes, logos SVG, iconos)
├── src/
│   ├── app/                # Rutas y páginas de la aplicación web
│   │   ├── api/            # Endpoints del backend (ej. /api/enviar-articulo)
│   │   ├── analizar/       # Página del formulario de evaluación
│   │   ├── blog/           # Sección de blog
│   │   ├── ...             # Otras páginas (nosotros, faq, precios, registro)
│   │   ├── layout.tsx      # Estructura maestra HTML (Header, Footer global)
│   │   └── page.tsx        # Página de inicio (Home / Landing Page)
│   │
│   └── components/         # Componentes de React reutilizables
│       ├── Chatbot.tsx     # Lógica e interfaz del Chatbot flotante
│       ├── Footer.tsx      # Pie de página
│       ├── Navbar.tsx      # Menú de navegación principal
│       └── Toaster.tsx     # Notificaciones emergentes ("Próximamente")
│
├── .env                    # Variables de entorno secretas (no se sube a GitHub)
├── next.config.ts          # Configuración del compilador de Next.js
└── package.json            # Dependencias y scripts del proyecto
```

---

## 🛠️ Cómo correr el proyecto localmente

Si acabas de clonar este repositorio y quieres correrlo en tu propia computadora, sigue estos pasos:

### 1. Requisitos Previos
Asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (Versión 18.17 o superior)
- Git

### 2. Instalación
Abre tu terminal, navega a la carpeta del proyecto y ejecuta el siguiente comando para descargar todas las dependencias necesarias:

```bash
npm install
```

### 3. Variables de Entorno (.env)
Para que el formulario de contacto y el envío de correos funcionen, necesitas crear un archivo llamado `.env` en la raíz del proyecto (junto a `package.json`) y agregar tus claves de Resend:

```env
PORT=3000
RESEND_API_KEY=tu_clave_secreta_de_resend
EMAIL_FROM=hola@tudominio.com
CORREO_DESTINO=correo_donde_recibiras_los_pdfs@gmail.com
```

### 4. Modo Desarrollo
Para levantar la página web en vivo y ver los cambios en tiempo real mientras programas:

```bash
npm run dev
```
La página estará disponible en tu navegador entrando a: [http://localhost:3000](http://localhost:3000)

---

## 📦 Compilación para Producción (VPS)

Cuando el código esté listo para ser subido a un servidor real (VPS), se debe compilar para obtener el máximo rendimiento.

1. **Construir la versión optimizada:**
   ```bash
   npm run build
   ```
2. **Iniciar el servidor de producción:**
   ```bash
   npm start
   ```

*Nota para servidores VPS:* Este proyecto está configurado con **GitHub Actions** (`.github/workflows/deploy.yml`). Esto significa que cada vez que haces un `git push` a la rama `main`, el código se descarga, se compila (`npm run build`) y se reinicia automáticamente en tu VPS usando **PM2**. Nginx está configurado como un Reverse Proxy (`proxy_pass http://localhost:3000;`) que permite cargas útiles de hasta 20MB (`client_max_body_size 20M;`).

---
✨ *Desarrollado con amor para la comunidad de investigación académica.*
