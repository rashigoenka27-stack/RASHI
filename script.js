// script.js (FIXED VERSION)

// Safe GSAP check
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * 1. Custom Cursor
 */
const cursor = document.getElementById('cursor');

if (window.matchMedia("(pointer: fine)").matches && cursor && typeof gsap !== "undefined") {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .work-card')) {
            gsap.to(cursor, { scale: 1.8, duration: 0.3, backgroundColor: "rgba(255,255,255,0.2)" });
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .work-card')) {
            gsap.to(cursor, { scale: 1, duration: 0.3, backgroundColor: "#fff" });
        }
    });
} else if (cursor) {
    cursor.style.display = 'none';
}

/**
 * 2. Mobile Menu (FIXED)
 */
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const allMenuLinks = document.querySelectorAll('.menu-link');

let menuOpen = false;

// OPEN MENU
const openMenu = () => {
    if (!menu) return;

    menu.classList.add('active'); // fallback CSS
    document.body.style.overflow = 'hidden';
    menuOpen = true;

    // GSAP animation (only if available)
    if (typeof gsap !== "undefined") {
        gsap.fromTo(menu,
            { xPercent: 100 },
            { xPercent: 0, duration: 0.6, ease: "expo.inOut" }
        );

        gsap.fromTo(allMenuLinks,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out"
            }
        );
    }
};

// CLOSE MENU
const closeMenu = () => {
    if (!menu) return;

    document.body.style.overflow = '';
    menuOpen = false;

    if (typeof gsap !== "undefined") {
        gsap.to(menu, {
            xPercent: 100,
            duration: 0.5,
            ease: "expo.inOut",
            onComplete: () => {
                menu.classList.remove('active');
            }
        });
    } else {
        menu.classList.remove('active');
    }
};

// TOGGLE MENU (important improvement)
const toggleMenu = () => {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
};

// EVENT LISTENERS
if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);

allMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Resize fix
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuOpen) {
        closeMenu();
    }
});

/**
 * 3. Page Load Fix
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});