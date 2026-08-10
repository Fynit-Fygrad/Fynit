(function () {
      "use strict";

      /* ---------- Header: sombra al hacer scroll ---------- */
      var header = document.getElementById('siteHeader');
      var headerCta = document.getElementById('headerCta');
      function onScrollHeader() {
        var scrolled = window.scrollY > 12;
        header.classList.toggle('is-scrolled', scrolled);
      }
      document.addEventListener('scroll', onScrollHeader, { passive: true });
      onScrollHeader();

      /* ---------- Sidebar off-canvas ---------- */
      var sidebar = document.getElementById('sidebar');
      var overlay = document.getElementById('sidebarOverlay');
      var openBtn = document.getElementById('hamburgerBtn');
      var closeBtn = document.getElementById('sidebarClose');
      var navLinks = document.querySelectorAll('#sidebar [data-nav-link]');

      function openSidebar() {
        sidebar.classList.add('is-open');
        overlay.classList.add('is-open');
        sidebar.setAttribute('aria-hidden', 'false');
        openBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      function closeSidebar() {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
        sidebar.setAttribute('aria-hidden', 'true');
        openBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      openBtn.addEventListener('click', openSidebar);
      closeBtn.addEventListener('click', closeSidebar);
      overlay.addEventListener('click', closeSidebar);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSidebar(); });
      navLinks.forEach(function (a) { a.addEventListener('click', closeSidebar); });

      /* ---------- Sidebar Accordions ---------- */
      var accordions = document.querySelectorAll('.accordion-btn');
      accordions.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var expanded = this.getAttribute('aria-expanded') === 'true';
          // Collapse all others (optional, keeps it cleaner)
          accordions.forEach(function (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherBtn.nextElementSibling.style.maxHeight = null;
          });

          if (!expanded) {
            this.setAttribute('aria-expanded', 'true');
            var content = this.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });

      /* ---------- Marquee: loop infinito duplicando el track ---------- */
      var track = document.getElementById('marqueeTrack');
      if (track) { track.insertAdjacentHTML('afterend', '<div class="marquee-track" aria-hidden="true">' + track.innerHTML + '</div>'); }

      /* ---------- Cómo funciona: pasos + visualizador con autoplay ---------- */
      var stepCards = document.querySelectorAll('.step-card');
      var panels = document.querySelectorAll('.visual-panel');
      var currentStep = 1;
      var autoplayTimer = null;
      var userInteracted = false;

      function setActiveStep(n) {
        n = parseInt(n, 10);
        currentStep = n;
        stepCards.forEach(function (c) { c.classList.toggle('is-active', parseInt(c.dataset.step) === n); });
        panels.forEach(function (p) { p.classList.toggle('is-active', parseInt(p.dataset.panel) === n); });
      }

      function startAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(function () {
          if (!userInteracted) {
            var next = (currentStep % 4) + 1;
            setActiveStep(next);
          }
        }, 5000);
      }

      stepCards.forEach(function (card) {
        card.addEventListener('click', function () {
          setActiveStep(card.dataset.step);
          userInteracted = true;
          clearInterval(autoplayTimer);
        });
      });

      /* Start autoplay when section is visible */
      if ('IntersectionObserver' in window) {
        var sectionObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (!userInteracted) startAutoplay();
            } else {
              clearInterval(autoplayTimer);
            }
          });
        }, { threshold: 0.3 });
        var howSection = document.getElementById('como-funciona');
        if (howSection) sectionObs.observe(howSection);
      }

      /* ---------- Contador de números ---------- */
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var counters = document.querySelectorAll('.num[data-count]');
      function animateCount(el) {
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || '';
        var accent = el.querySelector('.accent');
        if (reduceMotion || !accent) { if (accent) accent.textContent = target; return; }
        var start = null, duration = 1100;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          accent.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
      if ('IntersectionObserver' in window && counters.length) {
        var countObserver = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
          });
        }, { threshold: 0.5 });
        counters.forEach(function (c) { countObserver.observe(c); });
      }

      /* ---------- Chatbot Interactivo ---------- */
      var chatWidget = document.getElementById('chatWidget');
      var chatTrigger = document.getElementById('chatTrigger');
      var chatClose = document.getElementById('chatClose');
      var chatBody = document.getElementById('chatBody');
      var chatInput = document.getElementById('chatInput');
      var chatSend = document.getElementById('chatSend');
      var chatNotif = document.getElementById('chatNotif');
      var chatSuggestions = document.getElementById('chatSuggestions');

      var faqDatabase = {
        "que-es": "Fynit es un asistente académico con IA. Te ayuda a diagnosticar la similitud de tus documentos, evaluar la rigurosidad metodológica, estimar el cuartil editorial viable (Q1, Q2, etc.) y guiarte paso a paso en tu ruta para publicar con éxito.",
        "como-funciona": "¡Es muy sencillo! Sube tu documento en PDF o Word. Nuestra IA evalúa tu artículo en pocos segundos comparándolo con millones de registros. Luego te da un reporte detallado con riesgos detectados, revistas recomendadas y un plan de acción priorizado.",
        "que-es-articulo": "Es un informe escrito que describe resultados originales de investigación. Suele contar con secciones como Introducción, Metodología, Resultados y Discusión (IMRyD), y debe cumplir con criterios académicos rigurosos para ser aceptado por revistas indexadas.",
        "contacto": "Puedes escribirnos directamente a nuestro canal de WhatsApp oficial haciendo clic en el botón verde debajo de este chat, o enviarnos un mensaje a través de nuestro formulario en la página de Contacto.",
        "precio": "Tenemos el plan Explorador que es gratis (1 análisis al mes). El plan Investigador Pro cuesta $19/mes con análisis ilimitados y planes de mejora avanzados, y el plan Institucional para facultades.",
        "cuartil": "Las revistas científicas se agrupan en cuatro cuartiles (Q1, Q2, Q3, Q4) según su impacto. Q1 son el 25% superior. Fynit analiza tu contenido para orientar a qué cuartil es más viable postular."
      };

      function toggleChat() {
        var isOpen = chatWidget.classList.toggle('is-open');
        chatTrigger.classList.toggle('is-open', isOpen);
        chatWidget.setAttribute('aria-hidden', !isOpen);
        chatTrigger.setAttribute('aria-expanded', isOpen);
        if (isOpen && chatNotif) {
          chatNotif.classList.add('hidden');
        }
      }

      if (chatTrigger && chatWidget) {
        chatTrigger.addEventListener('click', toggleChat);
        chatClose.addEventListener('click', toggleChat);
      }

      function appendMessage(sender, text) {
        var msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg ' + sender;
        var p = document.createElement('p');
        p.innerHTML = text;
        msgDiv.appendChild(p);
        chatBody.insertBefore(msgDiv, chatSuggestions);
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      function showTypingIndicator() {
        var typeDiv = document.createElement('div');
        typeDiv.className = 'chat-msg bot chat-typing';
        typeDiv.id = 'chatTypingIndicator';
        typeDiv.innerHTML = '<p><span class="chat-typing-dots"><span></span><span></span><span></span></span></p>';
        chatBody.insertBefore(typeDiv, chatSuggestions);
        chatBody.scrollTop = chatBody.scrollHeight;
        return typeDiv;
      }

      function handleBotResponse(answerText) {
        var indicator = showTypingIndicator();
        setTimeout(function () {
          if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
          }
          appendMessage('bot', answerText);
        }, 1000 + Math.random() * 600);
      }

      if (chatSuggestions) {
        chatSuggestions.addEventListener('click', function (e) {
          var button = e.target.closest('.chat-chip');
          if (!button) return;
          var qKey = button.getAttribute('data-q');
          var questionText = button.textContent;
          var answerText = faqDatabase[qKey] || "Lo siento, no tengo una respuesta para esa pregunta en este momento.";

          appendMessage('user', questionText);
          handleBotResponse(answerText);
        });
      }

      function handleUserInput() {
        var text = chatInput.value.trim();
        if (!text) return;
        appendMessage('user', text);
        chatInput.value = '';

        // Simple NLP / keyword matching
        var lowerText = text.toLowerCase();
        var response = "Por el momento puedo ayudarte mejor con las preguntas recomendadas de la lista o mediante nuestro canal de WhatsApp para una atención personalizada.";

        if (lowerText.indexOf('hola') > -1 || lowerText.indexOf('buenas') > -1) {
          response = "¡Hola! ¿En qué puedo ayudarte? Puedes seleccionar una de las preguntas sugeridas o escribirme una duda específica.";
        } else if (lowerText.indexOf('precio') > -1 || lowerText.indexOf('costo') > -1 || lowerText.indexOf('pagar') > -1 || lowerText.indexOf('gratis') > -1) {
          response = faqDatabase['precio'];
        } else if (lowerText.indexOf('funcion') > -1 || lowerText.indexOf('sirve') > -1 || lowerText.indexOf('como') > -1) {
          response = faqDatabase['como-funciona'];
        } else if (lowerText.indexOf('contacto') > -1 || lowerText.indexOf('whatsapp') > -1 || lowerText.indexOf('telefono') > -1 || lowerText.indexOf('correo') > -1) {
          response = faqDatabase['contacto'];
        } else if (lowerText.indexOf('cuartil') > -1 || lowerText.indexOf('q1') > -1 || lowerText.indexOf('q2') > -1) {
          response = faqDatabase['cuartil'];
        }

        handleBotResponse(response);
      }

      if (chatInput && chatSend) {
        chatSend.addEventListener('click', handleUserInput);
        chatInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') handleUserInput();
        });
      }

    })();