document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight * 0.8 && // Cambia 1.3 a 0.8 para que aparezcan antes
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible'); // Opcional: quitar la clase si sale de la vista
            }
        });
    }

    // Usar requestAnimationFrame para un mejor rendimiento
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScroll(); // Llamar la función al cargar para animar secciones que ya están en la vista
});