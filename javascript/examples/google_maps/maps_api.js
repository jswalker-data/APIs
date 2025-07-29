const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Example endpoint to get directions
app.get('/api/maps/directions', async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
            params: {
                origin,
                destination,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching directions' });
    }
});

// Example endpoint to get place details
app.get('/api/maps/place', async (req, res) => {
    const { placeId } = req.query;

    if (!placeId) {
        return res.status(400).json({ error: 'Place ID is required' });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
            params: {
                place_id: placeId,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching place details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});