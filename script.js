document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('error', function(e) {
// Script minimal para la nueva versión: navegación, galería, rsvp básico

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initGallery();
    initRSVP();
    initCountdown();
});

function initCountdown(){
    const weddingDate = new Date('2025-11-29T14:00:00').getTime();
    const days = document.getElementById('cd-days');
    const hours = document.getElementById('cd-hours');
    const minutes = document.getElementById('cd-minutes');
    const seconds = document.getElementById('cd-seconds');
    if(!days||!hours||!minutes||!seconds) return;
    function update(){
        const now = Date.now();
        let diff = Math.max(0, weddingDate-now);
        if(diff<=0){
            days.textContent = hours.textContent = minutes.textContent = seconds.textContent = '00';
            document.getElementById('countdown').setAttribute('aria-label','¡Ya es el día!');
            return;
        }
        const d = Math.floor(diff/(1000*60*60*24));
        const h = Math.floor((diff/(1000*60*60))%24);
        const m = Math.floor((diff/(1000*60))%60);
        const s = Math.floor((diff/1000)%60);
        days.textContent = d.toString().padStart(2,'0');
        hours.textContent = h.toString().padStart(2,'0');
        minutes.textContent = m.toString().padStart(2,'0');
        seconds.textContent = s.toString().padStart(2,'0');
    }
    update();
    setInterval(update,1000);
}

function initMenu(){
    const btn = document.querySelector('.menu-btn');
    const nav = document.getElementById('nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        nav.style.display = expanded ? '' : 'block';
    });
    // simple responsive behavior
    window.addEventListener('resize', () => { if(window.innerWidth>900) nav.style.display=''; });
}

function initGallery(){
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.lightbox-close');
    if(!items.length || !lightbox || !lbImg) return;

    items.forEach(btn => {
        const img = btn.querySelector('img');
        btn.addEventListener('click', () => {
            lbImg.src = img.src;
            lightbox.setAttribute('aria-hidden','false');
        });
    });
    close.addEventListener('click', () => { lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; });
    lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) { lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; } });
}

function initRSVP(){
    const form = document.getElementById('rsvpForm');
    const msg = document.getElementById('rsvp-msg');
    const save = document.getElementById('saveDraft');
    if(!form) return;

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const data = new FormData(form);
        // Simular guardado local
        const obj = Object.fromEntries(data.entries());
        localStorage.setItem('rsvp', JSON.stringify(obj));
        msg.textContent = 'Gracias — tu confirmación fue guardada localmente.';
        setTimeout(()=> msg.textContent = '', 5000);
        form.reset();
    });

    if(save){
        save.addEventListener('click', ()=>{
            const data = new FormData(form);
            localStorage.setItem('rsvp-draft', JSON.stringify(Object.fromEntries(data.entries())));
            msg.textContent = 'Borrador guardado.';
            setTimeout(()=> msg.textContent = '', 3000);
        });
    }
}

