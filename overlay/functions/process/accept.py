import pyscreenshot as ImageGrab
from flask import Flask
from flask_cors import CORS
from flask import request

img = None
count = 0
viewport_size = [2560,1298]
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    global img
    img = ImageGrab.grab(childprocess=True)
    return "<p>Screenshot taken</p>"

@app.route('/save')
def save():
    global count
    count += 1
    global img
    crop()
    img.save(''.join(['screenshot-',str(count),'.png']))
    return "<p>Screenshot saved</p>"

@app.route('/reset_number')
def reset_number():
    global count 
    count = 0

@app.route('/post_viewport_size', methods=['POST'])
def post_viewport_size():
    global viewport_size
    viewport_size = request.get_json()
    return "<p>Viewport size saved</p>"

def crop():
    global img
    global viewport_size
    return img