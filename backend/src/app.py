from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os
from .chat import Chat  # Use relative import to import the Chat class

app = Flask(__name__, static_folder='../../frontend/dist/', static_url_path='')

# Configure CORS properly for your React app's origin
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:5173"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"]
}})

@app.route("/")
def render_reactApp():
    return send_from_directory(app.static_folder, 'index.html')

# Handle both with and without trailing slash to be safe
@app.route("/api/chat", methods=["POST", "OPTIONS"])
@app.route("/api/chat/", methods=["POST", "OPTIONS"])
def chat():
    return 'you are chatting with deepseek !!!'
    # Handle OPTIONS preflight request
    # if request.method == "OPTIONS":
    #     return "", 204
        
    # # Handle POST request
    # try:
    #     data = request.json
    #     user_message = data.get('message', 'Hello chat')
        
    #     chat_instance = Chat()
    #     response = chat_instance.send_message(user_message)
    #     return jsonify({"response": response})
    # except Exception as e:
    #     print(f"Error in chat endpoint: {str(e)}")
    #     return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)