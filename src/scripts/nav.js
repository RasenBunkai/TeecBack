function setupNavbar() {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const openButton = document.getElementById("comunity-button");
  const modal = document.querySelector('[aria-labelledby="modal-title"]');
  const closeButton = modal?.querySelector(".close-modal");

  if (!menuButton || !menu || !openButton || !modal) return;

  // Manejo de Menú Móvil
  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("-translate-x-full");
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    localStorage.setItem("menuOpen", !isOpen);
  };

  menuButton.addEventListener("click", toggleMenu);
  if (localStorage.getItem("menuOpen") === "true") toggleMenu();

  // Modal
  const showModal = () => modal.classList.replace("hidden", "flex");
  const hideModal = () => modal.classList.replace("flex", "hidden");

  openButton.addEventListener("click", showModal);
  closeButton?.addEventListener("click", hideModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", setupNavbar);

// Volver a asignar los eventos después de la navegación en Astro
document.addEventListener("astro:after-swap", setupNavbar);
