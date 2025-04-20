async function startBot() {
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const res = await fetch('/bot/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  const data = await res.json();
  message.textContent = data.message || '❌ Erreur réseau ou serveur.';
}

async function stopBot() {
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const res = await fetch('/bot/stop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  const data = await res.json();
  message.textContent = data.message || '❌ Erreur réseau ou serveur.';
}