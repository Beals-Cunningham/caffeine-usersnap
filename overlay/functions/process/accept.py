from PIL import Image
import mss
import os
from flask import Flask, send_file
from flask_cors import CORS
from flask import request
import datetime

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
    path = os.path.join(os.getcwd(), site)
    if not os.path.exists(path):
        os.makedirs(path)
    img.save(''.join([os.path.join(path, site), '-screenshot-',str(count),'.png']))
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
    
    today_date = datetime.date.today()
    today_date = today_date.strftime("%m-%d-%Y")
    
    path = os.path.join(os.getcwd(), site)
    images = []
    for x in os.listdir(path):
        print(x)
        if (x.startswith(site) and not x.endswith('.pdf')):
            images.append(
                          Image.open(os.path.join(path, x))
            )
    images[0].save(''.join([os.path.join(path, site), '-', today_date,'.pdf']), save_all=True, append_images=images[1:])
    return "<p>PDF exported to "+''.join([site, '-', today_date,'.pdf'])+"</p>"

@app.route('/get_exported_pdf', methods=['POST', 'GET'])
def get_exported_pdf():
    global site
    site = request.get_json()

    path = os.path.join(os.getcwd(), site)

    files = []
    for x in os.listdir(path):
        if (x.startswith(site) and x.endswith('.pdf')):
            files.append(x)
        
    file = max(files, key=lambda x: os.path.getctime(os.path.join(path, x)))
    return send_file(os.path.join(path, file), mimetype='application/pdf')

def crop():
    global img
    global viewport_size
    return img