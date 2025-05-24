const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Handle GET requests (optional)
app.get('/api/movement', (req, res) => {
    res.json({
        movement: 0,
    });
});

// Handle POST requests
app.post('/api/movement', (req, res) => {
    const movement = req.body.movement;
    console.log(`Received movement: ${movement}`);
    res.json({
        status: "success",
        movementDetected: movement > 0.5
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});