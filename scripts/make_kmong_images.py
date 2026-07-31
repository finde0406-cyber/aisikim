# 크몽 메인 썸네일(1000x750) + 상세페이지 이미지(1000x1300 x5) 생성
# 실행: python scripts/make_kmong_images.py
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "deliverables", "kmong", "images")
os.makedirs(OUT, exist_ok=True)

BOLD = "C:/Windows/Fonts/malgunbd.ttf"
REG = "C:/Windows/Fonts/malgun.ttf"

INDIGO = (79, 70, 229)
INDIGO_DARK = (55, 48, 163)
INK = (17, 24, 39)
GRAY = (107, 114, 128)
LIGHT = (243, 244, 246)
WHITE = (255, 255, 255)


def f(path, size):
    return ImageFont.truetype(path, size)


def center_text(d, text, font, cx, cy, fill):
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text((cx - w / 2 - box[0], cy - h / 2 - box[1]), text, font=font, fill=fill)


def wrap_lines(d, text, font, max_width):
    words = list(text)
    lines, cur = [], ""
    for ch in words:
        test = cur + ch
        if d.textlength(test, font=font) > max_width and cur:
            lines.append(cur)
            cur = ch
        else:
            cur = test
    if cur:
        lines.append(cur)
    return lines


def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    for y in range(h):
        t = y / h
        row = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        img.paste(Image.new("RGB", (w, 1), row), (0, y))
    return img


# ── 메인 썸네일 (1000x750) ─────────────────────────────
W, H = 1000, 750
img = vgrad(W, H, INDIGO, INDIGO_DARK)
d = ImageDraw.Draw(img)
center_text(d, "AI에게 일 시키는 법", f(BOLD, 62), W / 2, 260, WHITE)
center_text(d, "작업지시서 50개", f(BOLD, 78), W / 2, 350, WHITE)
center_text(d, "복사 → 붙여넣기 → 끝", f(REG, 36), W / 2, 460, (224, 231, 255))
# 하단 배지
d.rounded_rectangle([W / 2 - 160, 560, W / 2 + 160, 620], radius=30, fill=WHITE)
center_text(d, "PDF 98페이지", f(BOLD, 28), W / 2, 590, INDIGO)
img.save(os.path.join(OUT, "main-thumbnail.png"))

# ── 상세 이미지 1: 문제 제기 ───────────────────────────
W, H = 1000, 1300
img = Image.new("RGB", (W, H), WHITE)
d = ImageDraw.Draw(img)
d.rectangle([0, 0, W, 90], fill=INDIGO)
center_text(d, "AI시킴", f(BOLD, 40), W / 2, 45, WHITE)
center_text(d, "이런 경험 있으신가요?", f(BOLD, 56), W / 2, 220, INK)
problems = [
    '"보고서 잘 써줘" → 뻔한 답만 나온다',
    '"블로그 글 하나 써줘" → 어디서 본 듯한 글',
    "매번 질문을 처음부터 다시 만든다",
    "AI 구독료는 나가는데 결과물은 그대로",
]
y = 380
for p in problems:
    d.ellipse([120, y - 15, 150, y + 15], fill=INDIGO)
    d.text((180, y - 22), p, font=f(REG, 34), fill=INK)
    y += 110
center_text(d, "문제는 AI가 아니라", f(BOLD, 44), W / 2, 950, GRAY)
center_text(d, "'시키는 방법'입니다", f(BOLD, 52), W / 2, 1020, INDIGO)
img.save(os.path.join(OUT, "detail-1-problem.png"))

# ── 상세 이미지 2: 해법(4요소) ─────────────────────────
img = Image.new("RGB", (W, H), LIGHT)
d = ImageDraw.Draw(img)
center_text(d, "작업지시서 4요소", f(BOLD, 54), W / 2, 130, INK)
items = [
    ("① 작업 상황", "지금 무슨 일을 하는 중인지"),
    ("② 막힌 부분과 요청", "무엇이 안 풀려서 무엇을 원하는지"),
    ("③ 원하는 결과물", "어떤 형식·구조로 받고 싶은지"),
    ("④ 시작 전 확인할 것", "AI가 먼저 물어봐야 할 정보"),
]
y = 260
for title, desc in items:
    d.rounded_rectangle([100, y, 900, y + 220], radius=24, fill=WHITE, outline=INDIGO, width=3)
    d.text((140, y + 40), title, font=f(BOLD, 40), fill=INDIGO)
    d.text((140, y + 110), desc, font=f(REG, 30), fill=GRAY)
    y += 260
img.save(os.path.join(OUT, "detail-2-method.png"))

# ── 상세 이미지 3: 구성 (50개) ─────────────────────────
img = Image.new("RGB", (W, H), WHITE)
d = ImageDraw.Draw(img)
center_text(d, "구성 — 총 50개", f(BOLD, 54), W / 2, 130, INK)
cats = [
    ("블로그/콘텐츠", "10개"),
    ("업무/보고서", "10개"),
    ("앱/웹 개발", "10개"),
    ("공통 작업 설계", "10개"),
    ("수정·검수", "10개"),
]
y = 260
for name, count in cats:
    d.rounded_rectangle([100, y, 900, y + 150], radius=20, fill=LIGHT)
    d.text((140, y + 45), name, font=f(BOLD, 38), fill=INK)
    d.text((760, y + 45), count, font=f(BOLD, 38), fill=INDIGO)
    y += 190
img.save(os.path.join(OUT, "detail-3-contents.png"))

# ── 상세 이미지 4: 사용법 ──────────────────────────────
img = vgrad(W, H, (30, 41, 59), (15, 23, 42))
d = ImageDraw.Draw(img)
center_text(d, "이렇게 사용하세요", f(BOLD, 52), W / 2, 140, WHITE)
steps = [
    "1. 지금 상황에 맞는 작업지시서를 찾는다",
    "2. ChatGPT·Claude·Gemini에 그대로 붙여넣는다",
    "3. 괄호 안 변수만 내 상황에 맞게 바꾼다",
]
y = 380
for s in steps:
    d.text((110, y), s, font=f(REG, 34), fill=(224, 231, 255))
    y += 130
center_text(d, "프롬프트 공부, 하지 않아도 됩니다", f(BOLD, 40), W / 2, 950, WHITE)
img.save(os.path.join(OUT, "detail-4-howto.png"))

# ── 상세 이미지 5: 안내 ───────────────────────────────
img = Image.new("RGB", (W, H), WHITE)
d = ImageDraw.Draw(img)
center_text(d, "안내 사항", f(BOLD, 54), W / 2, 150, INK)
notes = [
    "PDF 파일로 즉시 제공됩니다",
    "구매자 개인 이용 목적에 한해 사용 가능합니다",
    "무단 복제·재배포·재판매는 금지됩니다",
    "특정 성과·수익을 보장하는 자료가 아닙니다",
    "다운로드 이후에는 환불이 제한될 수 있습니다",
]
y = 320
for n in notes:
    d.text((100, y), "· " + n, font=f(REG, 32), fill=GRAY)
    y += 110
img.save(os.path.join(OUT, "detail-5-notice.png"))

print("생성 완료:", os.path.abspath(OUT))
