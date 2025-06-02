function setupNavbar(): void {
  const menuButton = document.getElementById("menu-button") as HTMLButtonElement | null;
  const menu = document.getElementById("menu") as HTMLElement | null;
  const openButton = document.getElementById("comunity-button") as HTMLButtonElement | null;
  const modal = document.querySelector('[aria-labelledby="modal-title"]') as HTMLElement | null;
  const closeButton = modal?.querySelector(".close-modal") as HTMLButtonElement | null;

  if (!menuButton || !menu || !openButton || !modal) return;

  // Manejo de Menú Móvil
  const toggleMenu = (): void => {
    const isOpen = menu.classList.toggle("-translate-x-full");
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    localStorage.setItem("menuOpen", String(!isOpen));
  };

  menuButton.addEventListener("click", toggleMenu);
  if (localStorage.getItem("menuOpen") === "true") toggleMenu();

  // Modal
  const showModal = (): void => { modal.classList.replace("hidden", "flex"); };
  const hideModal = (): void => { modal.classList.replace("flex", "hidden"); };

  openButton.addEventListener("click", showModal);
  closeButton?.addEventListener("click", hideModal);
  modal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === modal) hideModal();
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", setupNavbar);

// Volver a asignar los eventos después de la navegación en Astro
document.addEventListener("astro:after-swap", setupNavbar);
