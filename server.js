const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let lastMovement = {
    value: 0,
    timestamp: null,
    detected: false
};

// Handle GET requests (optional)
app.get('/api/movement', (req, res) => {
    res.json({
        status: "success",
        lastMovement: lastMovement.value,
        isDetected: lastMovement.detected,
        timestamp: lastMovement.timestamp,
        threshold: 0.3  // Show your detection threshold
    });
});

// Handle POST requests
app.post('/api/movement', (req, res) => {
    const movement = req.body.movement;

    lastMovement = {
        value: movement,
        detected: movement > 0.3,
        timestamp: new Date().toISOString()
    };

    console.log(`Stored movement: ${movement}`);

    res.json({
        status: "success",
        movementDetected: lastMovement.detected,
        currentValue: movement
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});