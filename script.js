document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");
    const header = document.querySelector(".header");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Menú móvil
    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        document.querySelectorAll(".nav-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // Tema claro / oscuro
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio-theme", newTheme);

            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (!icon) return;

        if (currentTheme === "dark") {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }

    // Botón volver arriba y sombra del navbar
    window.addEventListener("scroll", () => {
        if (backToTop) {
            if (window.scrollY > 450) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }

        if (header) {
            if (window.scrollY > 20) {
                header.style.boxShadow = "0 18px 50px rgba(0,0,0,0.18)";
            } else {
                header.style.boxShadow = "none";
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    // Animaciones al hacer scroll
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.14,
        }
    );

    revealElements.forEach((element) => observer.observe(element));

    // Carruseles de proyectos
    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const images = carousel.querySelectorAll(".carousel-track img");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");

        let currentIndex = 0;

        if (!track || images.length === 0) return;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", prevSlide);
        }

        let autoplay = setInterval(nextSlide, 4500);

        carousel.addEventListener("mouseenter", () => {
            clearInterval(autoplay);
        });

        carousel.addEventListener("mouseleave", () => {
            autoplay = setInterval(nextSlide, 4500);
        });
    });

    // Filtros de proyectos
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach((card) => {
                const categories = card.dataset.category || "";

                if (filter === "all" || categories.includes(filter)) {
                    card.classList.remove("hide-project");
                } else {
                    card.classList.add("hide-project");
                }
            });
        });
    });
});