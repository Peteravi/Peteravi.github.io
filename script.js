// Establecer la carga del DOM antes de ejecutar cualquier script
document.addEventListener('DOMContentLoaded', function () {

    // Función para manejar la navegación del scroll suave
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const targetSection = document.querySelector(sectionId);
        window.scrollTo({
            top: targetSection.offsetTop - 80, // Desplazamiento para la barra de navegación
            behavior: "smooth"
        });
    };

    // Añadir el evento de click para las anclas
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            scrollToSection(e, targetId);
        });
    });

    // Animación al hacer scroll
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop <= windowHeight - 100) {
                section.classList.add('animate__fadeIn');
            }
        });
    };

    // Detectar cuando se hace scroll
    window.addEventListener('scroll', animateOnScroll);

    // Activar animación al cargar el contenido
    animateOnScroll();

    // Función para abrir y cerrar el modal
    const modalToggle = (modalId) => {
        const modal = document.getElementById(modalId);
        modal.classList.toggle('show');
    };

    // Agregar evento de click en cada botón de modal
    const modalButtons = document.querySelectorAll('.modal-btn');
    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-target');
            modalToggle(modalId);
        });
    });

    // Cerrar modal al hacer click fuera de él
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modalToggle(modal.id);
            }
        });
    });

    // Animación para el logo en el header al hacer scroll
    const logo = document.querySelector('.logo-container img');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            logo.classList.add('logo-small');
        } else {
            logo.classList.remove('logo-small');
        }
    });

    // Funcionalidad para mostrar/ocultar el botón de "volver arriba"
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Función para volver arriba
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});

// Código adicional para mejorar la accesibilidad y las interacciones

// Añadir eventos de teclado para la navegación accesible
document.addEventListener('keydown', function (e) {
    if (e.key === "Enter" || e.key === " ") {  // Tecla Enter o Espacio
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === "A") {
            const targetId = activeElement.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }
});
