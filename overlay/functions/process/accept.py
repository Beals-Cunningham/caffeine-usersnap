import pyscreenshot as ImageGrab
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    im = ImageGrab.grab(childprocess=True)
    im.save("SS1.png")
    return "<p>Screenshot taken</p>"