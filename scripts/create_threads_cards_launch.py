from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "deliverables" / "threads-card-news" / "png"
REGULAR = Path(r"C:\Windows\Fonts\malgun.ttf")
BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")
WIDTH, HEIGHT = 1080, 1350
INK = "#111827"
MUTED = "#6b7280"
ACCENT = "#4f46e5"
SOFT = "#eef2ff"
TOTAL = 6


def font(path: Path, size: int):
    return ImageFont.truetype(str(path), size)


def draw_wrapped(draw, text, xy, used_font, fill=INK, max_width=900, line_gap=12):
    x, y = xy
    lines = []
    for paragraph in text.split("\n"):
        if not paragraph:
            lines.append("")
            continue
        current = ""
        for char in paragraph:
            candidate = current + char
            if draw.textlength(candidate, font=used_font) <= max_width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = char
        if current:
            lines.append(current)
    line_height = used_font.size + line_gap
    draw.multiline_text((x, y), "\n".join(lines), font=used_font, fill=fill, spacing=line_gap)
    return y + line_height * len(lines)


def make_card(index, eyebrow, title, body=None, quote=None, items=None, numbered=False, cta=None):
    image = Image.new("RGB", (WIDTH, HEIGHT), "white")
    draw = ImageDraw.Draw(image)
    small = font(BOLD, 27)
    title_font = font(BOLD, 62 if index in (1, 6) else 49)
    body_font = font(REGULAR, 37)
    item_font = font(REGULAR, 35)
    footer_font = font(BOLD, 24)

    x = 84
    draw.text((x, 82), eyebrow, font=small, fill=ACCENT)
    draw.rectangle((x, 142, x + 76, 150), fill=ACCENT)
    y = 220
    y = draw_wrapped(draw, title, (x, y), title_font, max_width=900, line_gap=15) + 48

    if quote:
        draw.rounded_rectangle((x, y, WIDTH - x, y + 116), radius=4, fill=SOFT)
        draw.rectangle((x, y, x + 8, y + 116), fill=ACCENT)
        draw_wrapped(draw, quote, (x + 30, y + 24), font(BOLD, 39), max_width=820, line_gap=10)
        y += 160

    if body:
        y = draw_wrapped(draw, body, (x, y), body_font, fill=INK, max_width=900, line_gap=12) + 38

    if items:
        for number, item in enumerate(items, 1):
            prefix = f"{number}. " if numbered else "• "
            y = draw_wrapped(draw, prefix + item, (x + 4, y), item_font, max_width=880, line_gap=10) + 18

    if cta:
        box_y = min(y + 24, HEIGHT - 270)
        draw.rounded_rectangle((x, box_y, WIDTH - x, box_y + 120), radius=4, fill=SOFT)
        draw_wrapped(draw, cta, (x + 28, box_y + 29), font(BOLD, 34), max_width=820, line_gap=8)

    footer_y = HEIGHT - 96
    draw.text((x, footer_y), "AI시킴", font=footer_font, fill=MUTED)
    page = f"{index:02d} / {TOTAL:02d}"
    page_w = draw.textlength(page, font=footer_font)
    draw.text((WIDTH - x - page_w, footer_y), page, font=footer_font, fill=ACCENT)
    return image


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    cards = [
        make_card(1, "AI시킴 / 홍보", "만들긴 했는데\n아무도 안 봐요"),
        make_card(2, "이 단계가 진짜 어렵습니다", "출시까지는\n어떻게든 갑니다.", quote="“우리 서비스 홍보 글 하나 써줘”", body="이렇게 시키면 어디서 본 듯한 글만 나옵니다."),
        make_card(3, "사람은 기능에 안 멈춥니다", "기능 자랑은\n아무도 안 멈춥니다.", items=["할 수 있는 기능 나열", "전문 용어로 설명", "\u201c무료\u201d라는 말만 강조"]),
        make_card(4, "그래서 이렇게 바꿉니다", "AI에게 이렇게\n시켜보세요.", items=["불편 하나만 먼저 찌르기", "채널마다 톤 다시 쓰기", "확인 안 된 숫자·과장 걷어내기"], numbered=True),
        make_card(5, "정직하게 말하면", "저희도 지금\n이 단계를 지나는 중입니다.", body="완벽한 정답은 없지만, 매일 조금씩 다르게 시도하고 있습니다."),
        make_card(6, "AI시킴", "만드는 것도,\n알리는 것도\nAI에게 시킬 수 있습니다.", body="지금 어디서 막혔는지 무료 진단으로 확인해보세요.", cta="프로필 링크에서 무료 진단 →"),
    ]
    for index, card in enumerate(cards, 1):
        card.save(OUTPUT / f"aisikim-launch-promotion-card-{index:02d}.png", optimize=True)
    print(f"{len(cards)}장 생성 완료: {OUTPUT}")


if __name__ == "__main__":
    main()
