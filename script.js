// ---------- Loader ----------
// Attend le chargement complet de la fenêtre puis masque le loader avec un fondu.
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

// ---------- Navigation entre les Pages ----------
// Fonction qui affiche la page correspondante et masque les autres.
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.add('active');
      page.focus();
    } else {
      page.classList.remove('active');
    }
  });
}

// Ajoute un écouteur pour chaque lien de navigation (élément avec data-page).
document.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetPage = this.getAttribute('data-page');
    showPage(targetPage);
    window.location.hash = targetPage;
    // Ferme automatiquement le volet si ouvert lors d'un clic.
    sidebar.classList.remove('active');
  });
});

// ---------- Toggle du Thème (mode sombre / clair) ----------
const themeToggle = document.getElementById('themeToggle');
function updateThemeButton() {
  if (document.body.classList.contains('light-mode')) {
    themeToggle.textContent = "☀️"; // Mode clair affiché : soleil.
  } else {
    themeToggle.textContent = "🌙"; // Mode sombre affiché : lune.
  }
}
themeToggle.addEventListener('click', function () {
  document.body.classList.toggle('light-mode');
  updateThemeButton();
});
updateThemeButton(); // Initialisation

// ---------- Bouton "Retour en haut" ----------
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});
scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Intégration des API ----------
// API pour récupérer la météo via wttr.in et l'heure via worldtimeapi.org.
const weatherDisplay = document.getElementById('weatherDisplay');
const refreshWeatherBtn = document.getElementById('refreshWeather');
const timeDisplay = document.getElementById('timeDisplay');
const refreshTimeBtn = document.getElementById('refreshTime');

async function fetchWeather() {
  try {
    // wttr.in renvoie directement un texte avec un format court.
    const response = await fetch('https://wttr.in/?format=3', { cache: "no-cache" });
    const weatherText = await response.text();
    weatherDisplay.textContent = weatherText;
  } catch (error) {
    weatherDisplay.textContent = "Erreur lors du chargement de la météo.";
  }
}

async function fetchTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Paris', { cache: "no-cache" });
    const data = await response.json();
    // Affiche uniquement l'heure (HH:MM:SS)
    timeDisplay.textContent = "Heure à Paris : " + data.datetime.substring(11, 19);
  } catch (error) {
    timeDisplay.textContent = "Erreur lors du chargement de l'heure.";
  }
}

// Boutons de rafraîchissement des données
refreshWeatherBtn.addEventListener('click', fetchWeather);
refreshTimeBtn.addEventListener('click', fetchTime);

// Lorsque la page API est activée, lancer les mises à jour
document.querySelector('a[data-page="api"]').addEventListener('click', function () {
  fetchWeather();
  fetchTime();
});

// ---------- Gestion de la Sidebar (Volet déroulant) ----------
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');

sidebarToggle.addEventListener('click', function () {
  sidebar.classList.add('active');
});
closeSidebar.addEventListener('click', function () {
  sidebar.classList.remove('active');
});

// ---------- Chargement de la Page Basé sur le Hash ----------
// Si un hash est présent dans l'URL, afficher la page correspondante.
window.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showPage(hash);
  }
});