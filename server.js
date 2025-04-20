const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;
const ENVIRONMENT_ID = process.env.ENVIRONMENT_ID || null;
const PASSWORD = process.env.PASSWORD;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🚀 Allumer le bot
app.post('/bot/start', async (req, res) => {
  const { password } = req.body;

  if (password !== PASSWORD) {
    return res.status(403).json({ message: "❌ Mot de passe incorrect." });
  }

  try {
    const response = await fetch('https://backboard.railway.app/graphql/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            deployProject(input: { projectId: "${PROJECT_ID}" }) {
              id
            }
          }
        `
      }),
    });

    if (!response.ok) throw new Error();

    res.json({ message: "✅ Le bot est en cours de redémarrage sur Railway." });
  } catch {
    res.status(500).json({ message: "❌ Erreur lors du démarrage du bot." });
  }
});

// 🛑 Éteindre le bot
app.post('/bot/stop', async (req, res) => {
  const { password } = req.body;

  if (password !== PASSWORD) {
    return res.status(403).json({ message: "❌ Mot de passe incorrect." });
  }

  try {
    const response = await fetch('https://backboard.railway.app/graphql/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          mutation {
            pauseEnvironment(input: { projectId: "${PROJECT_ID}", environmentId: ${ENVIRONMENT_ID ? `"${ENVIRONMENT_ID}"` : null} }) {
              id
            }
          }
        `
      }),
    });

    if (!response.ok) throw new Error();

    res.json({ message: "🛑 Le bot a été mis en pause avec succès." });
  } catch {
    res.status(500).json({ message: "❌ Erreur lors de l'arrêt du bot." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});
