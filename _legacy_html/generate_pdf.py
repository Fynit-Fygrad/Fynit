import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.colors import HexColor

def create_pdf():
    # Ruta relativa: siempre guarda el PDF en assets/ dentro de la carpeta del script
    base_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(base_dir, "assets", "Politica_de_Privacidad_Fynit.pdf")
    
    doc = SimpleDocTemplate(pdf_path, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72)
    styles = getSampleStyleSheet()
    
    style_normal = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        alignment=TA_LEFT,
        spaceAfter=10
    )
    
    style_title = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontName='Helvetica',
        fontSize=16,
        leading=20,
        alignment=TA_LEFT,
        textColor=HexColor('#134878'),
        spaceAfter=14,
        spaceBefore=0
    )

    style_heading = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        alignment=TA_LEFT,
        textColor=HexColor('#134878'),
        spaceAfter=10,
        spaceBefore=14
    )

    story = []
    
    def add_para(text, style):
        story.append(Paragraph(text, style))

    # Title
    add_para("POLÍTICA DE PRIVACIDAD DE FYNIT", style_title)
    
    add_para("En Fynit respetamos la privacidad de nuestros usuarios y la confidencialidad de sus investigaciones. Esta Política explica de forma sencilla qué información recopilamos, para qué la utilizamos y cómo la protegemos.", style_normal)
    
    add_para("1. ¿Quién es responsable de tus datos?", style_heading)
    add_para("Fynit es un producto operado por:", style_normal)
    add_para("<b>FYGRAD S.A.C.</b><br/>RUC N.° 20615739678<br/>Correo de contacto: <b>hola@fynit.app</b>", style_normal)
    add_para("FYGRAD S.A.C. es responsable del tratamiento de los datos personales recopilados mediante Fynit.", style_normal)
    add_para("Banco de datos personales: <b>Usuarios Fynit</b>.", style_normal)
    
    add_para("2. ¿Qué información recopilamos?", style_heading)
    add_para("Podemos recopilar:", style_normal)
    add_para("• nombres y apellidos;<br/>• correo electrónico;<br/>• información proporcionada mediante nuestros formularios;<br/>• manuscritos, artículos científicos y archivos enviados voluntariamente;<br/>• información académica incluida en dichos documentos;<br/>• respuestas, preferencias y comentarios sobre el servicio;<br/>• información técnica básica necesaria para el funcionamiento y seguridad de la plataforma.", style_normal)
    add_para("Solicitamos únicamente la información razonablemente necesaria para prestar nuestros servicios.", style_normal)
    
    add_para("3. ¿Para qué utilizamos tu información?", style_heading)
    add_para("Utilizamos tus datos principalmente para:", style_normal)
    add_para("• analizar el manuscrito que nos envías;<br/>• identificar revistas, conferencias u otras rutas de publicación compatibles;<br/>• elaborar y enviarte recomendaciones o reportes;<br/>• comunicarnos contigo respecto del análisis solicitado;<br/>• evaluar y mejorar el funcionamiento de Fynit;<br/>• prevenir fraude, usos indebidos o incidentes de seguridad; y<br/>• cumplir obligaciones legales o requerimientos de autoridades competentes.", style_normal)
    add_para("Las comunicaciones comerciales o promocionales se enviarán únicamente cuando corresponda y podrás dejar de recibirlas en cualquier momento.", style_normal)
    
    add_para("4. Confidencialidad y propiedad de tu investigación", style_heading)
    add_para("<b>Tu investigación continúa siendo tuya.</b>", style_normal)
    add_para("Al cargar un manuscrito en Fynit <b>no transfieres ni cedes derechos de autor, propiedad intelectual, resultados, metodologías, datos ni derechos sobre tu investigación.</b>", style_normal)
    add_para("Fynit recibe únicamente una autorización limitada para procesar el documento con la finalidad de realizar el análisis solicitado.", style_normal)
    add_para("No vendemos, publicamos ni comercializamos los manuscritos enviados por nuestros usuarios.", style_normal)
    add_para("El usuario declara que cuenta con los derechos, permisos o autorizaciones necesarios para proporcionar el documento y la información que contiene, incluyendo, cuando corresponda, información perteneciente a coautores o terceros.", style_normal)
    
    add_para("5. Uso de inteligencia artificial y proveedores tecnológicos", style_heading)
    add_para("Fynit puede utilizar herramientas tecnológicas para apoyar el procesamiento y análisis de los documentos, incluyendo servicios de inteligencia artificial.", style_normal)
    add_para("Durante la etapa actual de validación, Fynit aplica medidas orientadas a reducir la exposición de información.", style_normal)
    add_para("• minimización o anonimización de información cuando sea posible; y<br/>• acceso limitado al personal autorizado.", style_normal)
    add_para("El procesamiento mediante proveedores tecnológicos puede implicar que determinada información sea procesada en servidores ubicados fuera del país del usuario, incluyendo Estados Unidos u otras jurisdicciones.", style_normal)
    add_para("Fynit procurará que dichos tratamientos se realicen únicamente para las finalidades informadas y de acuerdo con la legislación aplicable.", style_normal)
    
    add_para("6. ¿Quién puede acceder a tu información?", style_heading)
    add_para("El acceso podrá limitarse a:", style_normal)
    add_para("• personal autorizado de FYGRAD S.A.C./Fynit;<br/>• colaboradores sujetos a obligaciones de confidencialidad;<br/>• proveedores tecnológicos necesarios para prestar el servicio; y<br/>• autoridades públicas cuando exista una obligación legal válida.", style_normal)
    add_para("Fynit <b>no vende datos personales a terceros.</b>", style_normal)
    add_para("También podremos comunicar información cuando resulte razonablemente necesario para proteger nuestros derechos, prevenir fraude, atender incidentes de seguridad o cumplir una obligación legal.", style_normal)
    
    add_para("7. ¿Cuánto tiempo conservamos la información?", style_heading)
    add_para("Como política general:", style_normal)
    add_para("• <b>Manuscrito y análisis:</b> hasta 30 días después de la entrega del resultado, salvo que el usuario solicite su eliminación antes o exista una obligación legal que requiera conservarlos.<br/>• <b>Datos de contacto y registro del consentimiento:</b> hasta 24 meses desde la última interacción, salvo obligación legal de conservación por un plazo diferente.<br/>• <b>Datos para comunicaciones comerciales:</b> hasta que el usuario retire su consentimiento.", style_normal)
    add_para("Podremos conservar estadísticas agregadas o información debidamente anonimizada cuando ya no sea razonablemente posible identificar al usuario o reconstruir su manuscrito.", style_normal)
    
    add_para("8. Seguridad", style_heading)
    add_para("Aplicamos medidas técnicas, organizativas y de acceso razonables para proteger la información frente a pérdida, alteración, acceso no autorizado o divulgación indebida. Adoptando medidas razonables para prevenirlos, detectarlos y responder ante ellos.", style_normal)
    
    add_para("9. Tus derechos", style_heading)
    add_para("Dependiendo de la legislación aplicable, puedes solicitar:", style_normal)
    add_para("• acceso a tus datos;<br/>• corrección o actualización;<br/>• eliminación o supresión;<br/>• oposición o limitación del tratamiento;<br/>• portabilidad, cuando corresponda;<br/>• información sobre el tratamiento realizado; o<br/>• revocación del consentimiento.", style_normal)
    add_para("Puedes realizar tu solicitud gratuitamente escribiendo a <b>hola@fynit.app</b>.", style_normal)
    add_para("Fynit atenderá las solicitudes dentro de los plazos establecidos por la legislación aplicable.", style_normal)
    add_para("También podrás acudir ante la autoridad de protección de datos competente de tu país cuando consideres que tus derechos no han sido atendidos adecuadamente.", style_normal)
    
    add_para("10. Usuarios de distintos países", style_heading)
    add_para("FYGRAD S.A.C. se encuentra constituida en Perú y esta Política se interpreta principalmente conforme a la <b>Ley N.° 29733, Ley de Protección de Datos Personales, y su normativa vigente.</b>", style_normal)
    add_para("Cuando Fynit preste servicios a usuarios de otros países, también respetará las disposiciones obligatorias de protección de datos que resulten aplicables en la jurisdicción correspondiente.", style_normal)
    add_para("Si una disposición de esta Política entra en conflicto con una norma imperativa aplicable al usuario, prevalecerá dicha norma respecto de ese tratamiento.", style_normal)
    
    add_para("11. Cambios a esta Política", style_heading)
    add_para("Fynit podrá actualizar esta Política para reflejar cambios legales, tecnológicos, operativos o en nuestros servicios.", style_normal)
    add_para("La versión vigente estará disponible permanentemente en nuestra plataforma indicando su fecha de última actualización.", style_normal)
    
    add_para("<hr width='100%' color='black'/>", style_normal)
    add_para("<b>FYNIT</b><br/>Producto operado por <b>FYGRAD S.A.C.</b><br/>RUC N.° 20615739678<br/><b>hola@fynit.app</b>", style_normal)
    add_para("© 2026 FYGRAD S.A.C. Todos los derechos reservados.", style_normal)
            
    doc.build(story)
    print("PDF creado exitosamente en", pdf_path)

if __name__ == "__main__":
    create_pdf()
