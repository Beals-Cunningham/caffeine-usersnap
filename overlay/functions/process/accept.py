from PIL import Image
import mss
import os
from flask import Flask
from flask_cors import CORS
from flask import request

img = None
count = 0
viewport_size = [2560,1298]
app = Flask(__name__)
CORS(app)
site = None

@app.route('/')
def index():
    global img
    global site
    site = request.args.get('site')
    with mss.mss() as sct:
        monitor = sct.monitors[1]
        sct_img = sct.grab(monitor)
        img = Image.frombytes("RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")

    return "<p>Screenshot taken</p>"

@app.route('/save')
def save():
    global site
    global count
    count += 1
    global img
    crop()
    img.save(''.join([site, '-screenshot-',str(count),'.png']))
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

@app.route('/export_to_pdf', methods=['POST'])
def export_to_pdf():
    global site
    site = request.get_json()
    # get all images that start with site and open them as PIL images
    images = [Image.open(x) for x in os.listdir() if (x.startswith(site) and not x.endswith('.pdf'))]
    images[0].save(''.join([site, '.pdf']), save_all=True, append_images=images[1:])
    return "<p>PDF exported to "+''.join([site, '.pdf'])+"</p>"

def crop():
    global img
    global viewport_size
    return img