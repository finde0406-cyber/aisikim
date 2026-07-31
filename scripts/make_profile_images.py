# 스레드 프로필 이미지 시안 생성 (1000x1000 PNG 3종)
# 실행: python scripts/make_profile_images.py
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "deliverables", "threads-profile")
os.makedirs(OUT, exist_ok=True)

SIZE = 1000
BOLD = "C:/Windows/Fonts/malgunbd.ttf"
MONO = "C:/Windows/Fonts/consolab.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def center_text(draw, text, f, cy, fill):
    box = draw.textbbox((0, 0), text, font=f)
    w, h = box[2] - box[0], box[3] - box[1]
    draw.text(((SIZE - w) / 2 - box[0], cy - h / 2 - box[1]), text, font=f, fill=fill)


def vertical_gradient(top, bottom):
    img = Image.new("RGB", (SIZE, SIZE))
    for y in range(SIZE):
        t = y / SIZE
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        for_x = Image.new("RGB", (SIZE, 1), (r, g, b))
        img.paste(for_x, (0, y))
    return img


# ── 시안 A: 인디고 그라데이션 + AI 타이포 ─────────────────
img = vertical_gradient((79, 70, 229), (124, 58, 237))
d = ImageDraw.Draw(img)
center_text(d, "AI", font(BOLD, 420), 420, (255, 255, 255))
center_text(d, "영업일지", font(BOLD, 110), 720, (224, 231, 255))
img.save(os.path.join(OUT, "profile-a-indigo.png"))

# ── 시안 B: 다크 터미널 스타일 ────────────────────────────
img = Image.new("RGB", (SIZE, SIZE), (15, 23, 42))
d = ImageDraw.Draw(img)
try:
    mono_big = font(MONO, 300)
except OSError:
    mono_big = font(BOLD, 300)
center_text(d, ">AI", mono_big, 440, (129, 140, 248))
# 커서 블록
d.rectangle([700, 360, 780, 520], fill=(34, 197, 94))
center_text(d, "일하는 중", font(BOLD, 90), 730, (148, 163, 184))
img.save(os.path.join(OUT, "profile-b-terminal.png"))

# ── 시안 C: 화이트 배지 스타일 ────────────────────────────
img = Image.new("RGB", (SIZE, SIZE), (255, 255, 255))
d = ImageDraw.Draw(img)
d.ellipse([60, 60, 940, 940], outline=(79, 70, 229), width=36)
center_text(d, "AI", font(BOLD, 340), 430, (79, 70, 229))
center_text(d, "직원", font(BOLD, 140), 680, (17, 24, 39))
img.save(os.path.join(OUT, "profile-c-badge.png"))

print("생성 완료:", os.path.abspath(OUT))
