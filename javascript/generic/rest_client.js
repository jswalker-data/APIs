// This file provides a basic REST client implementation in JavaScript.
// It includes functions to make GET and POST requests to a specified API endpoint.

const axios = require('axios');

class RestClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 1000,
        });
    }

    async get(endpoint) {
        try {
            const response = await this.client.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error during GET request:', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error during POST request:', error);
            throw error;
        }
    }
}

module.exports = RestClient;