document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const header = document.querySelector(".header");
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    function setMenu(open) {
        navMenu.classList.toggle("active", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Cerrar men\u00fa" : "Abrir men\u00fa");
        menuBtn.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
    menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
    navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
            setMenu(false);
            menuBtn.focus();
        }
    });
    document.addEventListener("click", event => {
        if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) setMenu(false);
    });
    matchMedia("(min-width: 981px)").addEventListener("change", event => {
        if (event.matches) setMenu(false);
    });

    // Keep navigation in sync with the section closest to the header.
    const sectionLinks = [...navMenu.querySelectorAll('a[href^="#"]')];
    const sections = [...document.querySelectorAll("main > section[id]")];
    function updateActiveSection() {
        const marker = window.scrollY + header.offsetHeight + 100;
        let current = sections[0];
        sections.forEach(section => {
            if (section.offsetTop <= marker) current = section;
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            current = sections[sections.length - 1];
        }
        sectionLinks.forEach(link => {
            if (link.hash === `#${current.id}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }

    // Preserve card layout if the external photo service is unavailable.
    document.querySelectorAll("img").forEach(img => {
        function showFallback() {
            const fallback = document.createElement("div");
            fallback.className = `${img.className} image-fallback`;
            fallback.setAttribute("role", "img");
            fallback.setAttribute("aria-label", img.alt);
            fallback.innerHTML = '<span aria-hidden="true">PA</span>';
            img.replaceWith(fallback);
        }
        img.addEventListener("error", showFallback, { once: true });
        if (img.complete && img.naturalWidth === 0) showFallback();
    });

    function updateTheme() {
        const dark = document.documentElement.dataset.theme === "dark";
        themeToggle.querySelector("i").className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        themeToggle.setAttribute("aria-label", dark ? "Activar tema claro" : "Activar tema oscuro");
    }
    try {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
    } catch { /* The site remains usable when storage is unavailable. */ }
    updateTheme();
    themeToggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem("portfolio-theme", next); } catch { /* Optional preference. */ }
        updateTheme();
    });

    function updateScroll() {
        backToTop.classList.toggle("show", window.scrollY > 450);
        header.classList.toggle("scrolled", window.scrollY > 20);
        updateActiveSection();
    }
    let scheduled = false;
    function scheduleUpdate() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            updateScroll();
            scheduled = false;
        });
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateScroll();
    backToTop.addEventListener("click", () => window.scrollTo({
        top: 0,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    }));
});
