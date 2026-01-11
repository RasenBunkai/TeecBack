function setupNavbar(): void {
  const STORAGE_KEY = "teecback_menu_open";

  const menuButton = document.getElementById(
    "menu-button"
  ) as HTMLButtonElement | null;
  const menu = document.getElementById("menu") as HTMLElement | null;

  if (!menuButton || !menu) return;

  // Evita duplicar listeners cuando Astro hace swaps
  if (menuButton.dataset.bound === "true") return;
  menuButton.dataset.bound = "true";

  const isMobile = (): boolean =>
    window.matchMedia("(max-width: 767px)").matches;

  const setExpanded = (expanded: boolean): void => {
    menuButton.setAttribute("aria-expanded", String(expanded));
  };

  const openMenu = (): void => {
    // En tu markup inicial, el menú está oculto con -translate-x-full en móvil
    menu.classList.remove("-translate-x-full");
    setExpanded(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const closeMenu = (): void => {
    menu.classList.add("-translate-x-full");
    setExpanded(false);
    localStorage.setItem(STORAGE_KEY, "false");
  };

  const toggleMenu = (): void => {
    const isHidden = menu.classList.contains("-translate-x-full");
    if (isHidden) openMenu();
    else closeMenu();
  };

  // Estado inicial: siempre cerrado por defecto
  setExpanded(false);

  // Restaurar estado solo si estamos en móvil
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "true" && isMobile()) {
    openMenu();
  } else {
    closeMenu();
  }

  // Toggle
  menuButton.addEventListener("click", toggleMenu);

  // Cerrar al navegar (solo móvil)
  menu.addEventListener("click", (e: MouseEvent) => {
    if (!isMobile()) return;

    const target = e.target as HTMLElement | null;
    const link = target?.closest("a");
    if (link) closeMenu();
  });

  // Al cambiar a desktop, fuerza estado cerrado y limpia transformación
  const onResize = (): void => {
    if (!isMobile()) {
      // En desktop tu menú ya está visible por md:translate-x-0,
      // pero dejamos aria en false y guardamos estado cerrado.
      setExpanded(false);
      localStorage.setItem(STORAGE_KEY, "false");
    } else {
      // Si vuelves a móvil, respeta el estado guardado
      const savedAgain = localStorage.getItem(STORAGE_KEY);
      if (savedAgain === "true") openMenu();
      else closeMenu();
    }
  };

  window.addEventListener("resize", onResize, {passive: true});
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", setupNavbar);

// Reasignar después de navegación con Astro
document.addEventListener("astro:after-swap", setupNavbar);
