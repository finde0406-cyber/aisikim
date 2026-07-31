# 크몽 포트폴리오 대표 이미지 (1000x1000, 1:1 비율)
# 실행: python scripts/make_kmong_portfolio_square.py
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "deliverables", "kmong", "images")
os.makedirs(OUT, exist_ok=True)

BOLD = "C:/Windows/Fonts/malgunbd.ttf"
REG = "C:/Windows/Fonts/malgun.ttf"
WHITE = (255, 255, 255)
INDIGO = (79, 70, 229)
INDIGO_DARK = (55, 48, 163)


def f(path, size):
    return ImageFont.truetype(path, size)


def center_text(d, text, font, cy, fill):
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((1000 - w) / 2 - box[0], cy - h / 2 - box[1]), text, font=font, fill=fill)


def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    for y in range(h):
        t = y / h
        row = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        img.paste(Image.new("RGB", (w, 1), row), (0, y))
    return img


img = vgrad(1000, 1000, INDIGO, INDIGO_DARK)
d = ImageDraw.Draw(img)
center_text(d, "AI 작업지시서", f(BOLD, 72), 400, WHITE)
center_text(d, "50개 제작", f(BOLD, 72), 490, WHITE)
center_text(d, "상황별 실전 프롬프트 설계", f(REG, 34), 610, (224, 231, 255))
d.rounded_rectangle([350, 720, 650, 780], radius=30, fill=WHITE)
center_text(d, "PDF 98페이지", f(BOLD, 26), 750, INDIGO)

img.save(os.path.join(OUT, "portfolio-main-square.png"))
print("생성 완료:", img.size)
