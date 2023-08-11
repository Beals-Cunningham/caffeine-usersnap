from PIL import Image
import mss
import os
from flask import Flask
from flask_cors import CORS
from flask import request
from contextlib import contextmanager

img = None
count = 0
viewport_size = [2560,1298]
app = Flask(__name__)
CORS(app)
site = None

@contextmanager
def cd(newdir):
    prevdir = os.getcwd()
    if (not os.path.exists(os.path.expanduser(newdir))):
        os.mkdir(newdir)
    os.chdir(os.path.expanduser(newdir))
    try:
        yield
    finally:
        os.chdir(prevdir)

@app.route('/')
def index():
    global img
    global site
    tmp_site = site
    site = request.args.get('site')
    if (tmp_site != site):
        reset_number()
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
    with cd(site):
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
    tmp_site = site
    site = request.get_json()
    if (tmp_site != site):
        reset_number()
    with cd(site):
    # get all images that start with site and open them as PIL images
        images = [Image.open(x) for x in os.listdir() if (x.startswith(site) and not x.endswith('.pdf'))]
        images[0].save(''.join([site, '.pdf']), save_all=True, append_images=images[1:])
    return "<p>PDF exported to "+''.join([site, '.pdf'])+"</p>"

def crop():
    global img
    global viewport_size
    return img