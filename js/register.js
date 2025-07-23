document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popupContainer = document.getElementById('popupContainer'); // Un nuevo contenedor en el HTML principal
    let registrationPopup = null; // Esta variable se asignará una vez que el pop-up se cargue
    let closePopupBtn = null;

    // Función para inicializar los manejadores de eventos
    function initializeEventListeners() {
        if (openPopupBtn && popupContainer) {
            openPopupBtn.addEventListener('click', loadAndOpenPopup);
        } else {
            console.error("Error: El botón de registro o el contenedor del pop-up no fueron encontrados.");
            if (openPopupBtn) {
                openPopupBtn.disabled = true;
                openPopupBtn.textContent = "Registro no disponible";
            }
        }
    }

    // Función para cargar el HTML del pop-up y luego abrirlo
    async function loadAndOpenPopup() {
        // Si el pop-up ya está cargado, simplemente lo mostramos
        if (registrationPopup) {
            openPopup();
            return;
        }

        try {
            // Carga el contenido del pop-up desde el archivo externo
            const response = await fetch('html/registro_popUp.html'); // Asegúrate de que esta ruta sea correcta
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const htmlContent = await response.text();

            // Inyecta el contenido en el contenedor del HTML principal
            popupContainer.innerHTML = htmlContent;

            // Obtiene las referencias a los elementos del pop-up ahora que están en el DOM
            registrationPopup = document.getElementById('registrationPopup');
            closePopupBtn = document.getElementById('closePopupBtn');

            // Asigna los eventos de cierre solo después de que los elementos existan
            if (registrationPopup && closePopupBtn) {
                closePopupBtn.addEventListener('click', closePopup);
                registrationPopup.addEventListener('click', handleOverlayClick);
            } else {
                console.error("Error: Elementos del pop-up (popup-overlay o close-btn) no encontrados después de la carga.");
            }

            // Abre el pop-up
            openPopup();

        } catch (error) {
            console.error('Error al cargar o abrir el pop-up de registro:', error);
            alert('No se pudo cargar el formulario de registro. Por favor, inténtelo de nuevo.');
        }
    }

    // Función para abrir el pop-up (visibilidad)
    function openPopup() {
        if (registrationPopup) {
            registrationPopup.style.display = 'flex';
        }
    }

    // Función para cerrar el pop-up
    function closePopup() {
        if (registrationPopup) {
            registrationPopup.style.display = 'none';
        }
    }

    // Función para manejar el clic en el overlay (fuera del contenido)
    function handleOverlayClick(event) {
        if (event.target === registrationPopup) {
            closePopup();
        }
    }

    // Inicia todo
    initializeEventListeners();
});