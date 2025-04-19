// ---------- Loader ----------
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = "0";
  setTimeout(() => { loader.style.display = "none"; }, 500);
});

// ---------- Navigation ----------
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.toggle('active', page.id === pageId);
    if(page.id === pageId) page.focus();
  });
}
document.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    showPage(targetPage);
    window.location.hash = targetPage;
    sidebar.classList.remove('active');
  });
});

// ---------- Theme Toggle ----------
const themeToggle = document.getElementById('themeToggle');
function updateThemeButton() {
  themeToggle.textContent = document.body.classList.contains('light-mode') ? "☀️" : "🌙";
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  updateThemeButton();
});
updateThemeButton();

// ---------- Scroll To Top ----------
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.pageYOffset > 300 ? "flex" : "none";
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- API Integration ----------
const weatherDisplay = document.getElementById('weatherDisplay');
const refreshWeatherBtn = document.getElementById('refreshWeather');
const timeDisplay = document.getElementById('timeDisplay');
const refreshTimeBtn = document.getElementById('refreshTime');

async function fetchWeather() {
  try {
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
    timeDisplay.textContent = "Heure à Paris : " + data.datetime.substring(11, 19);
  } catch (error) {
    timeDisplay.textContent = "Erreur lors du chargement de l'heure.";
  }
}
refreshWeatherBtn.addEventListener('click', fetchWeather);
refreshTimeBtn.addEventListener('click', fetchTime);
document.querySelector('a[data-page="api"]').addEventListener('click', () => {
  fetchWeather();
  fetchTime();
});

// ---------- Sidebar Toggle ----------
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
sidebarToggle.addEventListener('click', () => sidebar.classList.add('active'));
closeSidebar.addEventListener('click', () => sidebar.classList.remove('active'));

// ---------- Page from Hash ----------
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if(hash) showPage(hash);
});