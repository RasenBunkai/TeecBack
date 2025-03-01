document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const openButton = document.getElementById("comunity-button");
  const modal = document.querySelector('[aria-labelledby="modal-title"]');
  const closeButton = document.querySelector(".close-modal");

  // Mobile Menu Toggle
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("-translate-x-full");
    menu.classList.toggle("translate-x-0");
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
  });

  // Modal Show/Hide Logic
  const showModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };
  const hideModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  openButton.addEventListener("click", showModal);
  if (closeButton) closeButton.addEventListener("click", hideModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });
});
