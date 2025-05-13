// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

const currentYearElements = document.querySelectorAll('#current-year');
const currentYear = new Date().getFullYear();
currentYearElements.forEach(element => {
  element.textContent = currentYear;
});