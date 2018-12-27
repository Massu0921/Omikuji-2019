# -*- coding: utf-8 -*-
import time
import re
from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image, ImageDraw, ImageSequence

class LED(object):      # LED表示器用

    # Setup LEDs
    def __init__(self, chain=4, bright=40):  # デフォルト設定（引数なしの場合）
        # Options
        self.options = RGBMatrixOptions()
        self.options.rows = 32
        self.options.chain_length = chain
        self.options.parallel = 1
        self.options.hardware_mapping = 'adafruit-hat-pwm'
        self.options.brightness = bright
        self.options.show_refresh_rate = 0
        self.matrix = RGBMatrix(options=self.options)
        self.canvas = self.matrix.CreateFrameCanvas()

        # color
        self.white = graphics.Color(255, 255, 255)

        # LED長さ
        self._width = self.canvas.width
        self._height = self.canvas.height

        self.pos_x = self._width

    # 表示
    def display(self,data):
        self.canvas.Clear()
        omikuji = Image.open('static/images/omikuji.png').convert('RGB')
        self.canvas.SetImage(omikuji,self.pos_x,0)
        self.canvas = self.matrix.SwapOnVSync(self.canvas)
        self.pos_x -= 4


    # 表示初期化
    def clear(self):
        self.pos_x = self._width
        self.canvas.Clear()
        self.canvas = self.matrix.SwapOnVSync(self.canvas)