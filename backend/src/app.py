from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os
from .chat import Chat  # Use relative import to import the Chat class

app = Flask(__name__, static_folder='../../frontend/dist/', static_url_path='')

# Apply CORS directly to the entire app with the simplest configuration
CORS(app, origins="http://localhost:5173", supports_credentials=True)

@app.route("/")
def render_reactApp():
    return send_from_directory(app.static_folder, 'index.html')
@app.route("/api/chat/", methods=["POST","OPTIONS"])
@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    # Handle OPTIONS preflight request explicitly
    if request.method == "OPTIONS":
        response = "",204
        return response
    
    # Handle POST request
    try:
        data = request.json
        print(f"Received data: {data}")
        
        user_message = data.get('message', 'Hello chat')
        print(f"User message: {user_message}")
        
        chat_instance = Chat()
        response = chat_instance.send_message(user_message)
        
        # Create response with explicit CORS headers
        resp = jsonify({"response": response})
        print(f"Response: {response}")
        resp.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return resp
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        error_resp = jsonify({"error": str(e)})
        error_resp.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return error_resp, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)