const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rota para receber dados do Python
app.post('/api/movement', (req, res) => {
    const movement = req.body.movement;
    console.log(`Movimento recebido: ${movement}`);
    res.json({ status: "success", movementDetected: movement > 0.5 }); // Adapte o threshold
});

module.exports = app; // Para Vercel