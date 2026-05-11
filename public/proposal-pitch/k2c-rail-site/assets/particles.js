// K2C Rail x Sovereign Systems. Ambient particle background.
(function() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COLOR = '#c2ccd8';
    let w, h, particles, mouse, dpr;

    class Particle {
        constructor() { this.reset(true); }
        reset(initial) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = 0; this.vy = 0;
            this.age = initial ? Math.random() * 200 : 0;
            this.life = Math.random() * 200 + 100;
        }
        update() {
            const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
            this.vx += Math.cos(angle) * 0.12;
            this.vy += Math.sin(angle) * 0.12;
            const dx = mouse.x - this.x, dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
                const force = (140 - dist) / 140;
                this.vx -= dx * force * 0.035;
                this.vy -= dy * force * 0.035;
            }
            this.x += this.vx; this.y += this.vy;
            this.vx *= 0.95; this.vy *= 0.95;
            this.age++;
            if (this.age > this.life) this.reset(false);
            if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
        }
        draw() {
            const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
            ctx.globalAlpha = alpha * 0.55;
            ctx.fillStyle = COLOR;
            ctx.fillRect(this.x, this.y, 1.5, 1.5);
        }
    }

    function init() {
        dpr = window.devicePixelRatio || 1;
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        const count = w < 480 ? 30 : w < 768 ? 50 : 180;
        particles = [];
        for (let i = 0; i < count; i++) particles.push(new Particle());
        mouse = { x: -1000, y: -1000 };
    }

    function animate() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(3,4,5,0.12)';
        ctx.fillRect(0, 0, w, h);
        for (let p of particles) { p.update(); p.draw(); }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', function() { mouse.x = -1000; mouse.y = -1000; });

    init();
    animate();
})();

// Mobile nav toggle
(function() {
    const btn = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', function() {
        const open = links.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
    });
})();
