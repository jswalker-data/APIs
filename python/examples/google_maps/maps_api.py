import requests
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# Google Maps API configuration
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api'

def check_api_key():
    """Check if API key is configured"""
    if not GOOGLE_MAPS_API_KEY:
        return False
    return True

@app.route("/")
def welcome():
    return jsonify(message="Google Maps API Client", status="ready")

@app.route("/geocode")
def geocode():
    """Convert address to coordinates"""
    if not check_api_key():
        return jsonify(error="Google Maps API key not configured"), 500
    
    address = request.args.get('address')
    if not address:
        return jsonify(error="Address parameter is required"), 400
    
    try:
        url = f"{GOOGLE_MAPS_BASE_URL}/geocode/json"
        params = {
            'address': address,
            'key': GOOGLE_MAPS_API_KEY
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['status'] == 'OK':
            return jsonify(data)
        else:
            return jsonify(error=f"Geocoding failed: {data['status']}"), 400
            
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/directions")
def directions():
    """Get directions between two points"""
    if not check_api_key():
        return jsonify(error="Google Maps API key not configured"), 500
    
    origin = request.args.get('origin')
    destination = request.args.get('destination')
    
    if not origin or not destination:
        return jsonify(error="Both origin and destination parameters are required"), 400
    
    try:
        url = f"{GOOGLE_MAPS_BASE_URL}/directions/json"
        params = {
            'origin': origin,
            'destination': destination,
            'key': GOOGLE_MAPS_API_KEY
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['status'] == 'OK':
            return jsonify(data)
        else:
            return jsonify(error=f"Directions failed: {data['status']}"), 400
            
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/places/search")
def places_search():
    """Search for places near a location"""
    if not check_api_key():
        return jsonify(error="Google Maps API key not configured"), 500
    
    query = request.args.get('query')
    location = request.args.get('location')
    
    if not query:
        return jsonify(error="Query parameter is required"), 400
    
    try:
        url = f"{GOOGLE_MAPS_BASE_URL}/place/textsearch/json"
        params = {
            'query': query,
            'key': GOOGLE_MAPS_API_KEY
        }
        
        if location:
            params['location'] = location
            params['radius'] = request.args.get('radius', '5000')
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['status'] == 'OK':
            return jsonify(data)
        else:
            return jsonify(error=f"Places search failed: {data['status']}"), 400
            
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/places/details/<place_id>")
def place_details(place_id):
    """Get detailed information about a specific place"""
    if not check_api_key():
        return jsonify(error="Google Maps API key not configured"), 500
    
    try:
        url = f"{GOOGLE_MAPS_BASE_URL}/place/details/json"
        params = {
            'place_id': place_id,
            'key': GOOGLE_MAPS_API_KEY
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['status'] == 'OK':
            return jsonify(data)
        else:
            return jsonify(error=f"Place details failed: {data['status']}"), 400
            
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    if not check_api_key():
        print("Warning: GOOGLE_MAPS_API_KEY environment variable not set")
        print("Set it with: set GOOGLE_MAPS_API_KEY=your_api_key_here")
    app.run(debug=True, port=5001)
