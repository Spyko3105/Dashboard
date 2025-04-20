async function startBot() {
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  if (!password) {
    messageDiv.textContent = "⚠️ Mot de passe requis.";
    return;
  }

  messageDiv.textContent = "⏳ Envoi de la commande...";

  try {
    const res = await fetch('/bot/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (res.ok) {
      messageDiv.textContent = "✅ " + data.message;
    } else {
      messageDiv.textContent = "❌ " + data.message;
    }
  } catch (err) {
    messageDiv.textContent = "❌ Erreur réseau ou serveur.";
  }
}
