from flask import Flask,send_from_directory
from flask_cors import CORS
from markupsafe import escape
import os


app = Flask(__name__, static_folder= '../../frontend/dist/',static_url_path='')
CORS(app)

@app.route("/")
def render_reactApp():
    return send_from_directory(app.static_folder,'index.html')