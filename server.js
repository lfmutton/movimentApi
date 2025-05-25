const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DATA_FILE = path.join(__dirname, './database/moviment.json');

// Helper function to read data from JSON file
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file:', err);
        return {
            status: "success",
            lastMovement: 0,
            isDetected: false,
            timestamp: "00:00:00",
            threshold: 0.3
        };
    }
}

// Helper function to write data to JSON file
function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing data file:', err);
    }
}

// Handle GET requests
app.get('/api/movement', (req, res) => {
    const data = readData();
    res.json(data);
});

// Handle POST requests
app.post('/api/movement', (req, res) => {
    const movement = req.body.movement;
    const newData = {
        status: "success",
        lastMovement: movement,
        isDetected: movement > 0.3,
        timestamp: new Date().toISOString(),
        threshold: 0.3
    };

    writeData(newData);
    console.log(`Stored movement: ${movement}`);

    res.json({
        status: "success",
        movementDetected: newData.isDetected,
        currentValue: movement
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});