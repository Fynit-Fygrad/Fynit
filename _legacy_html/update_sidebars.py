import os
import re

dir_path = r"c:\Users\LABOYMED\Downloads\Fynit"

for filename in os.listdir(dir_path):
    if filename.endswith(".html") and filename != "contacto.html":
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove any stray "Analizar" links in the sidebar
        content = re.sub(r'<a href="contacto\.html" data-nav-link>Analizar</a>\s*', '', content)
        
        # Replace the Contacto button block in the sidebar with Precios
        content = re.sub(
            r'<a href="contacto\.html" class="sidebar-contact-btn"[^>]*>.*?Contacto\s*</a>', 
            '<a href="precios.html">Precios</a>', 
            content, 
            flags=re.DOTALL
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated sidebar in {filename}")
