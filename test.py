# coding: utf-8
import sys
import os
import time
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '../'))
#from modules import LED
from flask import Flask, render_template, request, redirect, url_for, json
#from PIL import Image, ImageDraw, ImageSequence

app = Flask(__name__)
led = None


@app.route('/')
def index():
    global led

    """
    if led == None:
        led = LED()
    """
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000, threaded=True)
