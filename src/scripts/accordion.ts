export function setupAccordion() {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const contentId = button.getAttribute("aria-controls");
      if (!contentId) return;
      const content = document.getElementById(contentId);
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Toggle aria-expanded
      button.setAttribute("aria-expanded", (!isExpanded).toString());

      // Toggle la clase active en el contenido
      if (content) {
        content.classList.toggle("active");

        // Establecer la altura máxima para la animación
        if (!isExpanded) {
          const contentHeight = content.scrollHeight;
          content.style.maxHeight = `${contentHeight}px`;
          content.style.opacity = "1";
        } else {
          content.style.maxHeight = "0";
          content.style.opacity = "0";
        }
      }
    });
  });
}
