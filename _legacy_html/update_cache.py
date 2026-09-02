import os
import re

dir_path = r"c:\Users\LABOYMED\Downloads\Fynit"

for filename in os.listdir(dir_path):
    if filename.endswith(".html"):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the CSS and JS cache busters
        content = re.sub(r'css/styles\.css\?v=\d+', 'css/styles.css?v=20260829', content)
        content = re.sub(r'js/main\.js\?v=\d+', 'js/main.js?v=20260829', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated cache busters in {filename}")
