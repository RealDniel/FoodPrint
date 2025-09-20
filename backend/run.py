#!/usr/bin/env python3
"""
FoodPrint Backend - Flask API Server
Eco-friendly food tracking application backend
"""

import os
from app import create_app

# Create Flask app instance
app = create_app()

if __name__ == '__main__':
    # Get configuration from environment variables
    host = os.environ.get('FLASK_HOST', '0.0.0.0')
    port = int(os.environ.get('FLASK_PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"🌱 Starting FoodPrint API server...")
    print(f"📍 Server running at: http://{host}:{port}")
    print(f"🔧 Debug mode: {debug}")
    
    app.run(host=host, port=port, debug=debug)
