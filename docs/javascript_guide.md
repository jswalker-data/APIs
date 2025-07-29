# JavaScript API Endpoints Collection Guide

## Overview

This guide provides an overview of the JavaScript API endpoints collection, including instructions on how to set up and use the generic and example APIs provided in this project.

## Folder Structure

The JavaScript API collection is organized as follows:

```
javascript
├── generic
│   ├── basic_api.js
│   ├── rest_client.js
│   └── package.json
├── examples
│   ├── google_maps
│   │   ├── maps_api.js
│   │   └── package.json
│   └── sra
│       ├── sra_api.js
│       └── package.json
└── utils
    └── common.js
```

## Generic API

### Basic API

The `basic_api.js` file contains a simple implementation of a JavaScript API using Express. It defines a basic endpoint that returns a welcome message.

### REST Client

The `rest_client.js` file provides a basic REST client implementation. It includes functions to make GET and POST requests to specified API endpoints.

### Setup

To set up the generic JavaScript API, navigate to the `javascript/generic` directory and run:

```
npm install
```

## Example APIs

### Google Maps API

The `maps_api.js` file contains an implementation of the Google Maps API. It includes functions to interact with various Google Maps services.

#### Setup

To set up the Google Maps API example, navigate to the `javascript/examples/google_maps` directory and run:

```
npm install
```

### SRA API

The `sra_api.js` file contains an implementation of the SRA API. It includes functions to interact with the SRA services.

#### Setup

To set up the SRA API example, navigate to the `javascript/examples/sra` directory and run:

```
npm install
```

## Utility Functions

The `common.js` file in the `utils` directory contains utility functions that can be used across different JavaScript API implementations.

## Conclusion

This guide provides a starting point for using the JavaScript API endpoints collection. For further details on each API, please refer to the respective files and their documentation.