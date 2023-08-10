import pyscreenshot as ImageGrab
from flask import Flask
from flask_cors import CORS

img = None
app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    global img
    img = ImageGrab.grab(childprocess=True)
    return "<p>Screenshot taken</p>"

@app.route('/save')
def save():
    global img
    img.save('screenshot.png')
    return "<p>Screenshot saved</p>"