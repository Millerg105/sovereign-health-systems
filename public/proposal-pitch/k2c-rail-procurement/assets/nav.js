// K2C Rail. Mobile nav toggle + hero photo binding.
(function() {
    const btn = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (btn && links) {
        btn.addEventListener('click', function() {
            const open = links.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(open));
        });
    }

    const hero = document.querySelector('.hero[data-hero-image]');
    if (hero) {
        const src = hero.getAttribute('data-hero-image');
        hero.style.setProperty('--hero-image', "url('" + src + "')");
        const img = new Image();
        img.onload = function() { hero.classList.add('with-image'); };
        img.src = src;
    }
})();
