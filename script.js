// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Efecto de navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Animación de elementos al entrar en el viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .skill-category, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configurar elementos animados inicialmente
    const animatedElements = document.querySelectorAll('.fade-in, .skill-category, .project-card, .timeline-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Activar animaciones al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Botón "Volver arriba"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.id = 'back-to-top';
    backToTopButton.title = 'Volver arriba';
    backToTopButton.setAttribute('aria-label', 'Volver al inicio de la página');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto de máquina de escribir para el título
    const typeWriterEffect = function() {
        const heroTitle = document.querySelector('.hero-section h1');
        if (!heroTitle || window.innerWidth < 768) return;

        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100 + Math.random() * 50);
            } else {
                // Añadir cursor parpadeante
                const cursor = document.createElement('span');
                cursor.className = 'blinking-cursor';
                cursor.textContent = '|';
                heroTitle.appendChild(cursor);
            }
        }
        
        typeWriter();
    };

    // Activar efecto de máquina de escribir después de 500ms
    setTimeout(typeWriterEffect, 500);

    // Tooltips para los iconos de habilidades
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover',
            placement: 'top'
        });
    });

    // Validación de formulario de contacto (si se añade en el futuro)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor complete todos los campos');
                return;
            }
            
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                alert('Por favor ingrese un email válido');
                return;
            }
            
            // Aquí iría la lógica para enviar el formulario
            alert('Formulario enviado con éxito!');
            contactForm.reset();
        });
    }

    // Cargar proyectos desde GitHub API (ejemplo)
    const loadGitHubProjects = async function() {
        try {
            const response = await fetch('https://api.github.com/users/Peteravi/repos');
            const projects = await response.json();
            
            // Procesar los proyectos y mostrarlos
            console.log('Proyectos de GitHub:', projects);
            // Aquí podrías agregar lógica para mostrar los proyectos dinámicamente
        } catch (error) {
            console.error('Error al cargar proyectos de GitHub:', error);
        }
    };

    // Cargar proyectos solo si estamos en la sección de proyectos
    if (window.location.hash === '#projects' || document.querySelector('#projects:target')) {
        loadGitHubProjects();
    }

    // Cambio de tema claro/oscuro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Cambiar icono
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        });
        
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        
        // Configurar icono inicial
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.classList.add('fa-sun');
            icon.classList.remove('fa-moon');
        } else {
            icon.classList.add('fa-moon');
            icon.classList.remove('fa-sun');
        }
    }

    // Efecto de partículas decorativas
    const createParticles = function() {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];
        const container = document.querySelector('.hero-section') || document.body;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posición aleatoria
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Tamaño aleatorio
            const size = Math.random() * 6 + 2;
            
            // Duración y delay de animación
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Color aleatorio
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.backgroundColor = color;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    };

    // Añadir estilos para las partículas
    const particleStyles = document.createElement('style');
    particleStyles.innerHTML = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.6;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(-10px, -20px) rotate(5deg);
            }
            50% {
                transform: translate(0, -40px) rotate(0deg);
            }
            75% {
                transform: translate(10px, -20px) rotate(-5deg);
            }
        }
        
        .blinking-cursor {
            animation: blink 1s step-end infinite;
            color: var(--primary-color);
            font-weight: normal;
        }
        
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(particleStyles);

    // Crear partículas después de un pequeño retraso
    setTimeout(createParticles, 1000);
});

// Activar animaciones cuando se carga completamente la página
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
