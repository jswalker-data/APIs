const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api';

// Middleware to check API key
const checkApiKey = (req, res, next) => {
    if (!GOOGLE_MAPS_API_KEY) {
        return res.status(500).json({ error: 'Google Maps API key not configured' });
    }
    next();
};

// Welcome endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Google Maps API Client', status: 'ready' });
});

// Geocoding endpoint - convert address to coordinates
app.get('/geocode', checkApiKey, async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    try {
        const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/geocode/json`, {
            params: {
                address,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            res.json(response.data);
        } else {
            res.status(400).json({ error: `Geocoding failed: ${response.data.status}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Directions endpoint
app.get('/directions', checkApiKey, async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Both origin and destination parameters are required' });
    }

    try {
        const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/directions/json`, {
            params: {
                origin,
                destination,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            res.json(response.data);
        } else {
            res.status(400).json({ error: `Directions failed: ${response.data.status}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Places search endpoint
app.get('/places/search', checkApiKey, async (req, res) => {
    const { query, location, radius = '5000' } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const params = {
            query,
            key: GOOGLE_MAPS_API_KEY
        };

        if (location) {
            params.location = location;
            params.radius = radius;
        }

        const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/place/textsearch/json`, {
            params
        });

        if (response.data.status === 'OK') {
            res.json(response.data);
        } else {
            res.status(400).json({ error: `Places search failed: ${response.data.status}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Place details endpoint
app.get('/places/details/:placeId', checkApiKey, async (req, res) => {
    const { placeId } = req.params;

    try {
        const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/place/details/json`, {
            params: {
                place_id: placeId,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK') {
            res.json(response.data);
        } else {
            res.status(400).json({ error: `Place details failed: ${response.data.status}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    if (!GOOGLE_MAPS_API_KEY) {
        console.log('Warning: GOOGLE_MAPS_API_KEY environment variable not set');
        console.log('Set it with: set GOOGLE_MAPS_API_KEY=your_api_key_here');
    }
    console.log(`Google Maps API Client running on port ${PORT}`);
});