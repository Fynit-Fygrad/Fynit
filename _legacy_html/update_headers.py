import os
import re

dir_path = r"c:\Users\LABOYMED\Downloads\Fynit"

new_actions = """<div class="header-actions" style="white-space: nowrap; display: flex; align-items: center; gap: 8px;">

        <a href="login.html"
          style="font-family:'Sora',sans-serif; font-weight:600; font-size:14.5px; color:var(--ink-70); text-decoration:none; padding:6px 0; margin-right:4px;">Iniciar
          Sesión</a>
        <a href="registro.html" class="btn btn-ghost btn-sm">Registrarse</a>
        <a href="contacto.html" class="btn btn-primary btn-sm" id="headerCta">Evaluar</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menú" aria-expanded="false"
          aria-controls="sidebar" style="display: flex;">
          <svg>
            <use href="#ic-menu" />
          </svg>
        </button>
      </div>"""

for filename in os.listdir(dir_path):
    if filename.endswith(".html") and filename != "contacto.html":
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove nav-desktop
        content = re.sub(r'[ \t]*<nav class="nav-desktop"[\s\S]*?</nav>\s*', '\n\n      ', content)
        
        # Replace header-actions
        content = re.sub(r'<div class="header-actions"[\s\S]*?</button>\s*</div>', new_actions, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
