const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const PASSWORD = process.env.PASSWORD;
const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN;
const PROJECT_ID = "7d2e56e1-c053-47e4-984e-a1e056ba1f25";

// Route pour démarrer/redéployer le bot
app.post('/bot/start', async (req, res) => {
  const { password } = req.body;
  if (password !== PASSWORD) return res.status(401).json({ message: "Mot de passe incorrect" });

  try {
    const response = await fetch(`https://backboard.railway.app/graphql/v2`, {
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
        `,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(500).json({ message: "Erreur lors du redeploy", details: data.errors });
    }

    res.json({ message: "Bot en cours de redémarrage sur Railway." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.toString() });
  }
});

// Route "éteindre" à personnaliser
app.post('/bot/stop', (req, res) => {
  const { password } = req.body;
  if (password !== PASSWORD) return res.status(401).json({ message: "Mot de passe incorrect" });

  // Ici on pourrait envoyer une commande spéciale à ton bot, ou juste renvoyer un message
  res.json({ message: "Fonction arrêt à définir." });
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
