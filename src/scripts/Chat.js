document.addEventListener("DOMContentLoaded", () => {
    const whatsappButton = document.getElementById(
      "whatsappButton"
    ) ;
    const notificacion = document.getElementById(
      "notificacion"
    );
    const closeButton = document.getElementById(
      "closeButton"
    );

    if (!whatsappButton || !notificacion || !closeButton) {
      console.error("Elementos no encontrados");
      return;
    }

    let isNotificationOpen = false;

    function openNotification() {
      notificacion.classList.remove("hidden");
      setTimeout(() => {
        notificacion.classList.remove("opacity-0", "translate-y-4");
      }, 10);
      isNotificationOpen = true;
    }

    function closeNotification() {
      notificacion.classList.add("opacity-0", "translate-y-4");
      setTimeout(() => {
        notificacion.classList.add("hidden");
      }, 300);
      isNotificationOpen = false;
    }

    function toggleNotification(event) {
      event.stopPropagation();
      if (isNotificationOpen) {
        closeNotification();
      } else {
        openNotification();
      }
    }

    whatsappButton.addEventListener("click", toggleNotification);

    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closeNotification();
    });
   
    // Prevenir que los clics dentro de la notificación la cierren
    notificacion.addEventListener("click", (event) => {
      event.stopPropagation();
    });

  });