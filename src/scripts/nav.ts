function setupNavbar(): void {
  const menuButton = document.getElementById(
    "menu-button"
  ) as HTMLButtonElement | null;
  const menu = document.getElementById("menu") as HTMLElement | null;

  if (!menuButton || !menu) return;

  // Manejo de Menú Móvil
  const toggleMenu = (): void => {
    const isOpen = menu.classList.toggle("-translate-x-full");
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    localStorage.setItem("menuOpen", String(!isOpen));
  };

  menuButton.addEventListener("click", toggleMenu);
  if (localStorage.getItem("menuOpen") === "true") toggleMenu();
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", setupNavbar);

// Volver a asignar los eventos después de la navegación en Astro
document.addEventListener("astro:after-swap", setupNavbar);
