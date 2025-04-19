// Gestion du changement de thème (clair / sombre)
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
}

// Gestion du menu (affichage/masquage du menu sur mobile)
function toggleMenu() {
  const menu = document.querySelector('nav');
  menu.classList.toggle('open');
}

// Chargement des pages dynamiques dans le contenu
function loadPage(page) {
  const content = document.getElementById('content');
  const pages = {
    home: `
      <section>
        <h2>Ajouter le bot</h2>
        <div style="text-align: center;">
          <img src="https://via.placeholder.com/150" alt="Image du Bot" style="border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h3>Ton Bot Discord</h3>
          <p>Gérez facilement votre bot Discord à partir de cette interface moderne.</p>
          <a href="https://discord.com/oauth2/authorize?client_id=1361826455406772408&permissions=8&integration_type=0&scope=bot"
            style="background: var(--primary-color); color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Ajouter le bot</a>
        </div>
      </section>
    `,
    features: `
      <section>
        <h2>Fonctionnalités</h2>
        <p>Explorez les outils avancés :</p>
        <div class="grid">
          <div class="card">
            <i class="fas fa-sliders-h"></i>
            <h3>Configuration</h3>
            <p>Modifiez les paramètres du bot à tout moment.</p>
          </div>
          <div class="card">
            <i class="fas fa-user-shield"></i>
            <h3>Permissions</h3>
            <p>Définissez qui a accès à quoi sur vos serveurs.</p>
          </div>
          <div class="card">
            <i class="fas fa-database"></i>
            <h3>Logs & Historique</h3>
            <p>Consultez les actions effectuées sur vos serveurs.</p>
          </div>
        </div>
      </section>
    `,
    commands: `
      <section>
        <h2>Commandes</h2>
        <p>Utilisez ces commandes avec votre bot :</p>
        <ul>
          <li><i class="fas fa-user-times"></i> <code>/ban</code> - Bannir un membre</li>
          <li><i class="fas fa-ban"></i> <code>/kick</code> - Expulser un membre</li>
          <li><i class="fas fa-bell"></i> <code>/warn</code> - Avertir un membre</li>
          <li><i class="fas fa-terminal"></i> <code>/userinfo</code> - Informations sur un membre</li>
        </ul>
      </section>
    `,
    servers: `
      <section>
        <h2>Serveurs</h2>
        <p>Surveillez l'activité des serveurs :</p>
        <ul>
          <li><i class="fas fa-server"></i> Serveur Principal</li>
          <li><i class="fas fa-users"></i> Communauté Discord</li>
        </ul>
      </section>
    `,
    about: `
      <section>
        <h2>À propos</h2>
        <p>Ce dashboard est conçu pour fournir une interface simple, moderne et complète.</p>
      </section>
    `,
    contact: `
      <section>
        <h2>Contact</h2>
        <p>Pour toute assistance ou question :</p>
        <p><a href="mailto:nabox3624@gmail.com"><i class="fas fa-envelope"></i> nabox3624@gmail.com</a></p>
      </section>
    `
  };
  content.innerHTML = pages[page] || '<p>Page introuvable.</p>';
  toggleMenu();  // Fermer le menu après avoir chargé la page
}