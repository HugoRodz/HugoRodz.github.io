# 💒 Página Web de Invitación de Boda

Una página web moderna y elegante para invitaciones de boda, diseñada para compartir todos los detalles importantes del evento con los invitados.

## ✨ Características

### 🎨 Diseño Moderno
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Paleta de colores elegante** en tonos dorados y neutros
- **Tipografía cuidadosamente seleccionada** con fuentes Google Fonts
- **Animaciones suaves** y efectos de transición

### 📱 Funcionalidades Principales

#### 🏠 Página de Inicio
- Hero section con imagen de fondo
- Contador regresivo hasta la fecha de la boda
- Nombres de los novios con tipografía elegante

#### 💕 Nuestra Historia
- Timeline interactiva con la historia de la pareja
- Secciones para: primer encuentro, primera cita, y propuesta

#### 📅 Detalles del Evento
- Información de la ceremonia y recepción
- Horarios y ubicaciones
- Iconografía descriptiva

#### ⏰ Cronograma
- Horario detallado del día de la boda
- Desde la llegada hasta la fiesta final

#### 📸 Galería
- Grid de fotos con diseño masonry
- Modal para visualizar imágenes en tamaño completo
- Navegación con teclado y botones

#### 📍 Ubicación
- Detalles de ubicaciones
- Enlaces a Google Maps
- Espacio para mapa embebido

#### 📝 RSVP (Confirmación)
- Formulario completo de confirmación
- Campos para restricciones alimentarias
- Contador de acompañantes
- Validación de formularios

### 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS, Grid y Flexbox
- **JavaScript ES6+** - Funcionalidades interactivas
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía (Poppins & Great Vibes)

## 🚀 Cómo Usar

### Instalación Local
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Tu página web está lista!

### Personalización

#### 1. Información Básica
Edita el archivo `index.html` y reemplaza los siguientes placeholders:

```html
- [Nombres de los Novios] → Nombres reales
- [Fecha completa] → Fecha de la boda
- [Hora de la ceremonia] → Horario real
- [Nombre de la iglesia] → Lugar de la ceremonia
- [Dirección completa] → Direcciones reales
```

#### 2. Contador Regresivo
En `script.js`, línea 15, cambia la fecha de la boda:
```javascript
const weddingDate = new Date('2025-12-31T15:30:00').getTime();
```

#### 3. Historia de la Pareja
Reemplaza el contenido de la sección "Nuestra Historia" con su historia real.

#### 4. Galería de Fotos
Reemplaza las imágenes placeholder en la sección de galería:
```html
<!-- Cambiar estos URLs por las fotos reales -->
<img src="ruta/a/tu/foto1.jpg" alt="Descripción">
```

#### 5. Colores y Estilo
En `styles.css`, modifica las variables CSS en `:root`:
```css
:root {
    --primary-color: #d4a574;    /* Color principal */
    --secondary-color: #8b6914;  /* Color secundario */
    --accent-color: #f4f1ea;     /* Color de acento */
}
```

## 📋 Lista de Verificación

### Antes de Publicar

- [ ] ✏️ Actualizar nombres de los novios
- [ ] 📅 Configurar fecha y hora correctas
- [ ] 📍 Agregar direcciones reales
- [ ] 📱 Actualizar información de contacto
- [ ] 📸 Subir fotos reales de la pareja
- [ ] 🗺️ Configurar mapas embebidos
- [ ] 🎨 Personalizar colores si es necesario
- [ ] 📝 Configurar formulario RSVP con servidor
- [ ] 🔗 Actualizar enlaces de redes sociales
- [ ] 🧪 Probar en diferentes dispositivos

### Características Avanzadas (Opcionales)

- [ ] 🎵 Agregar reproductor de música
- [ ] 💳 Integrar lista de regalos
- [ ] 📧 Configurar notificaciones por email
- [ ] 📊 Panel de administración para RSVPs
- [ ] 🌐 Configurar dominio personalizado
- [ ] 📈 Agregar Google Analytics

## 🌐 Hospedaje Web

### Opciones Gratuitas
- **GitHub Pages** - Ideal para sitios estáticos
- **Netlify** - Fácil deploy desde Git
- **Vercel** - Optimizado para JavaScript
- **Firebase Hosting** - De Google

### Opciones de Pago
- **Shared Hosting** - Para mayor control
- **WordPress.com** - Si prefieres un CMS

## 🎯 Mejores Prácticas Implementadas

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Menú hamburguesa para móviles

### ⚡ Performance
- Lazy loading de imágenes
- CSS y JavaScript optimizados
- Compression de assets

### ♿ Accesibilidad
- Contraste de colores adecuado
- Navegación por teclado
- Alt text en imágenes
- Estructura semántica

### 🔍 SEO
- Meta tags optimizados
- Estructura HTML semántica
- URLs amigables

## 🤝 Soporte

Si necesitas ayuda para personalizar tu página web:

1. **Preguntas básicas**: Revisa este README
2. **Personalización**: Modifica los archivos según las instrucciones
3. **Problemas técnicos**: Verifica la consola del navegador

## 📝 Licencia

Este proyecto es de uso libre para eventos personales. Si lo usas para proyectos comerciales, por favor proporciona atribución.

---

¡Esperamos que esta página web haga tu día especial aún más memorable! 💕

**¡Felicidades por su próxima boda!** 🎉

<!-- Añadido: instrucciones para el botón 'Sorpréndeme' -->

## 🎉 Botón "Sorpréndeme"

La página incluye un botón "Sorpréndeme" en la barra de navegación que aplica una de cuatro apariencias temáticas automáticamente. Estas son solo opciones estéticas rápidas para ver variantes de color y ambiente.

- Para usarlo: abre la página y pulsa el botón "Sorpréndeme". El tema elegido se guardará en tu navegador (localStorage).
- Para restablecer el tema por defecto: abre la consola del navegador y ejecuta:

```javascript
localStorage.removeItem('weddingTheme');
location.reload();
```

Se recomienda probarlo en desktop y móvil para ver las variantes visuales.
