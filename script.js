// Variables globales
let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-item img');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeNavigation();
    initializeGallery();
    initializeRSVPForm();
    initializeSmoothScroll();
    initializeAnimations();
    initializeSurpriseThemes();
});

// ---- MODO SORPRÉNDEME: 4 temas aleatorios ----
function initializeSurpriseThemes() {
    const themes = ['theme-emerald','theme-ivory','theme-stone','theme-pastel'];
    const btn = document.getElementById('surpriseBtn');
    const body = document.body;

    // aplicar tema guardado
    const saved = localStorage.getItem('weddingTheme');
    if (saved && themes.includes(saved)) {
        body.classList.add(saved, 'theme-transition');
    }

    if (!btn) return;

    btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.style.opacity = '0.8';
        const current = themes.find(t => body.classList.contains(t));
        let choice;
        do {
            choice = themes[Math.floor(Math.random()*themes.length)];
        } while (choice === current && themes.length > 1);

        body.classList.remove(...themes);
        void body.offsetWidth; // repaint
        body.classList.add(choice, 'theme-transition');
        localStorage.setItem('weddingTheme', choice);

        const hero = document.querySelector('.hero');
        if (hero && hero.animate) {
            hero.animate([
                { boxShadow: '0 8px 32px rgba(30,124,107,0.18)' },
                { boxShadow: '0 20px 64px rgba(30,124,107,0.28)' },
                { boxShadow: '0 8px 32px rgba(30,124,107,0.18)' }
            ], { duration: 700, easing: 'ease-out' });
        }

        setTimeout(()=>{ btn.disabled = false; btn.style.opacity = ''; }, 900);
    });
}


// Countdown Timer
function initializeCountdown() {
    // Fecha de la boda: 29 de Noviembre de 2025 a las 2:00 PM
    const weddingDate = new Date('2025-11-29T14:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Si la fecha ya pasó
            document.getElementById('countdown').innerHTML = '<div class="time-unit"><span class="number">¡Ya es el día!</span></div>';
        }
    }
    
    // Actualizar inmediatamente y luego cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
// Copiar cuenta bancaria para sección de regalos
function copiarCuenta() {
    const cuenta = document.getElementById('cuenta-bancaria').textContent;
    navigator.clipboard.writeText(cuenta);
    alert('¡Cuenta copiada al portapapeles!');
}

// Navegación móvil
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil (verificar existencia)
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        if (navLinks && navLinks.length) {
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Galería de imágenes
function initializeGallery() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    
    // Abrir modal al hacer click en una imagen
    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            currentImageIndex = index;
        });
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
}

// Cambiar imagen en el modal
function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = images[currentImageIndex].src;
}

// Formulario RSVP
function initializeRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const attendanceSelect = document.getElementById('attendance');
    const guestCountGroup = document.getElementById('guestCountGroup');
    
    // Mostrar/ocultar número de acompañantes
    attendanceSelect.addEventListener('change', function() {
        if (this.value === 'si') {
            guestCountGroup.style.display = 'block';
            guestCountGroup.querySelector('select').required = true;
        } else {
            guestCountGroup.style.display = 'none';
            guestCountGroup.querySelector('select').required = false;
        }
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validaciones básicas
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                
                // Remover el estilo de error después de 3 segundos
                setTimeout(() => {
                    field.style.borderColor = '#e1e1e1';
                }, 3000);
            }
        });
        
        if (!isValid) {
            showNotification('Por favor completa todos los campos requeridos', 'error');
            return;
        }
        
        // Simular envío del formulario
        submitRSVP(new FormData(form));
    });
}

// Enviar RSVP (simulación)
function submitRSVP(formData) {
    const submitBtn = document.querySelector('.rsvp-btn');
    const originalText = submitBtn.innerHTML;
    // Mostrar estado de carga
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    // Simular delay de envío
    setTimeout(() => {
        // En una aplicación real, aquí enviarías los datos a un servidor
        console.log('Datos del formulario:', Object.fromEntries(formData));
        // Mostrar mensaje de éxito visual
        const rsvpSuccess = document.getElementById('rsvpSuccess');
        rsvpSuccess.style.display = 'block';
        setTimeout(() => {
            rsvpSuccess.style.display = 'none';
        }, 5000);
        // Limpiar formulario
        document.getElementById('rsvpForm').reset();
        document.getElementById('guestCountGroup').style.display = 'none';
        // Restaurar botón
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Scroll suave
function initializeSmoothScroll() {
    document.documentElement.classList.add('scroll-smooth');
    
    // Scroll suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.timeline-item, .event-card, .schedule-item, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => removeNotification(notification), 5000);
}

// Remover notificación
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Función para abrir mapas (placeholder)
function openMap(location) {
    // En una aplicación real, aquí abrirías Google Maps con las coordenadas específicas
    const addresses = {
        ceremonia: '[Dirección de la ceremonia]',
        recepcion: '[Dirección de la recepción]'
    };
    
    const address = addresses[location];
    const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
    
    // Abrir en nueva ventana
    window.open(mapUrl, '_blank');
}

// Funciones utilitarias
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imágenes
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Optimización de rendimiento
window.addEventListener('scroll', debounce(() => {
    // Cualquier lógica que necesite ejecutarse en scroll
}, 100));

// Manejo de errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Imagen de respaldo si falla la carga
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik0xMyAyN0wyNyAxM00yNyAyN0wxMyAxMyIgc3Ryb2tlPSIjNmM3NTdkIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
        e.target.alt = 'Imagen no disponible';
    }
}, true);

// Compatibilidad con navegadores más antiguos
if (!window.IntersectionObserver) {
    // Fallback para navegadores que no soportan IntersectionObserver
    function fallbackAnimations() {
        const elements = document.querySelectorAll('.timeline-item, .event-card, .schedule-item, .gallery-item');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fallbackAnimations);
    } else {
        fallbackAnimations();
    }
}
