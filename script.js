function toggleMenu() {
    const nav = document.getElementById('nav');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    // Toggle classi
    nav
        .classList
        .toggle('show');
    hamburger
        .classList
        .toggle('active');
    body
        .classList
        .toggle('menu-open');

    // Animazione dei link
    if (nav.classList.contains('show')) {
        const links = document.querySelectorAll('#nav a');
        links.forEach((link, index) => {
            link
                .style
                .setProperty('--i', index);
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
    } else {
        document
            .querySelectorAll('#nav a')
            .forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
    }
}

// Chiudi menu al click sui link
document
    .querySelectorAll('#nav a')
    .forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

// Chiudi menu al resize della finestra
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.getElementById('nav').classList.contains('show')) {
        toggleMenu();
    }
});