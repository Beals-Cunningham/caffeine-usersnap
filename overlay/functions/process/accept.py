from PIL import Image
import mss
import os
from flask import Flask, send_file
from flask_cors import CORS
from flask import request
import datetime
import numpy as np

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
    crop(get_markers(img))
    path = os.path.join(os.getcwd(), site)
    if not os.path.exists(path):
        os.makedirs(path)
    resize()
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

def crop(four_corners):
    global img
    #crop image to four_corners coordinates
    left = four_corners[0][0]
    upper = four_corners[0][1]
    right = four_corners[2][0]
    lower = four_corners[2][1]
    img = img.crop((left, upper, right, lower))
    
    return img

def resize():
    global img
    img_size = img.size
    new_size = [int(img_size[0]*.6), int(img_size[1]*.6)]
    img.thumbnail(new_size, resample=Image.Resampling.LANCZOS, reducing_gap=3.0)
    
def get_markers(i):
    pim = i.convert('RGB')
    # create a numpy array from Pillow image i
    a = np.asarray(pim)
    # find pixels where red and blue are both above 240 and green is below 100
    # these are "marker" pixels
    pixels = np.where((a[:,:,0] > 230) & (a[:,:,1] < 105) & (a[:,:,2] > 230))
    # convert pixels to coordinates
    coords = list(zip(pixels[1], pixels[0]))
    four_corners = []
    #get min and max x and y values
    min_x = min(coords, key=lambda x: x[0])[0]
    min_y = min(coords, key=lambda x: x[1])[1]
    max_x = max(coords, key=lambda x: x[0])[0]
    max_y = max(coords, key=lambda x: x[1])[1]
    
    four_corners=[(min_x, min_y), (max_x, min_y), (max_x, max_y), (min_x, max_y)]

    print(four_corners)
    return four_corners
    
    
    