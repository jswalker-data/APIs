# Python API Endpoints Collection Guide

## Overview

This guide provides an overview of the Python API endpoints collection, including instructions on how to set up and use the generic API and examples for specific APIs such as Google Maps and SRA.

## Folder Structure

The Python API collection is organized as follows:

```
python/
├── generic/
│   ├── basic_api.py        # Basic implementation of a Python API using Flask
│   ├── rest_client.py       # Basic REST client implementation
│   └── requirements.txt      # Dependencies for the generic API
├── examples/
│   ├── google_maps/
│   │   ├── maps_api.py      # Implementation of the Google Maps API
│   │   └── requirements.txt   # Dependencies for the Google Maps API example
│   └── sra/
│       ├── sra_api.py       # Implementation of the SRA API
│       └── requirements.txt   # Dependencies for the SRA API example
└── utils/
    └── common.py            # Utility functions for API implementations
```

## Setting Up the Generic Python API

1. **Install Dependencies**: Navigate to the `python/generic` directory and install the required dependencies using the following command:

   ```
   pip install -r requirements.txt
   ```

2. **Run the Basic API**: Execute the `basic_api.py` file to start the Flask server:

   ```
   python basic_api.py
   ```

   The API will be accessible at `http://localhost:5000/`.

3. **Access the Welcome Endpoint**: Open your browser or use a tool like Postman to access the welcome message at:

   ```
   GET http://localhost:5000/welcome
   ```

## Using the REST Client

The `rest_client.py` file provides functions to make GET and POST requests to any specified API endpoint. You can import this module in your scripts to interact with other APIs.

## Example: Google Maps API

1. **Install Dependencies**: Navigate to the `python/examples/google_maps` directory and install the required dependencies:

   ```
   pip install -r requirements.txt
   ```

2. **Run the Google Maps API Example**: Execute the `maps_api.py` file to interact with Google Maps services.

3. **Usage**: Refer to the comments in `maps_api.py` for specific functions and how to use them.

## Example: SRA API

1. **Install Dependencies**: Navigate to the `python/examples/sra` directory and install the required dependencies:

   ```
   pip install -r requirements.txt
   ```

2. **Run the SRA API Example**: Execute the `sra_api.py` file to interact with SRA services.

3. **Usage**: Refer to the comments in `sra_api.py` for specific functions and how to use them.

## Utility Functions

The `common.py` file in the `utils` directory contains utility functions that can be reused across different API implementations. You can import these functions as needed.

## Conclusion

This guide provides a starting point for using the Python API endpoints collection. For further details, refer to the individual API documentation and the source code in the respective directories.