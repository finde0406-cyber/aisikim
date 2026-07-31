# 크몽 "미리보기"(내지 이미지) + "전자책 목차" 이미지 생성
# 요구사항: 미리보기 가로 652px 이상, 세로 3000px 이하, PNG/JPG, 최소 5개
# 실행: python scripts/make_kmong_preview.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import build_publish_assets as b
import fitz  # PyMuPDF
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "deliverables" / "kmong" / "AI-작업지시서-스타터팩50-크몽판.pdf"
OUT = ROOT / "deliverables" / "kmong" / "images"
OUT.mkdir(parents=True, exist_ok=True)

BOLD = "C:/Windows/Fonts/malgunbd.ttf"
REG = "C:/Windows/Fonts/malgun.ttf"
INK = (17, 24, 39)
INDIGO = (79, 70, 229)
GRAY = (107, 114, 128)
LIGHT = (243, 244, 246)
WHITE = (255, 255, 255)


# ── 1. 전자책 목차 이미지 (실제 50개 항목 전체 목록) ──────
def make_toc_image():
    W = 1200
    top_pad, cat_gap, item_h, header_h = 80, 50, 42, 64
    total_h = top_pad + 100
    for _, titles in b.STARTER_CATEGORY_MAP:
        total_h += header_h + len(titles) * item_h + cat_gap
    total_h = min(total_h + 60, 3000)

    img = Image.new("RGB", (W, total_h), WHITE)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 90], fill=INDIGO)
    center = lambda t, f, cy, fill: d.text(
        ((W - d.textlength(t, font=f)) / 2, cy), t, font=f, fill=fill
    )
    center("목차 — 전체 50개", ImageFont.truetype(BOLD, 40), 24, WHITE)

    y = top_pad + 40
    f_cat = ImageFont.truetype(BOLD, 34)
    f_item = ImageFont.truetype(REG, 27)
    f_num = ImageFont.truetype(BOLD, 27)

    for cat_idx, (category, titles) in enumerate(b.STARTER_CATEGORY_MAP, start=1):
        d.rounded_rectangle([60, y, W - 60, y + header_h], radius=10, fill=LIGHT)
        d.text((85, y + 14), f"{cat_idx}. {category}", font=f_cat, fill=INDIGO)
        y += header_h + 16
        for i, title in enumerate(titles, start=1):
            d.text((100, y), f"{i:02d}", font=f_num, fill=(199, 199, 214))
            d.text((150, y), title, font=f_item, fill=INK)
            y += item_h
        y += cat_gap

    img = img.crop((0, 0, W, min(y + 40, total_h)))
    img.save(OUT / "preview-00-toc.png")
    print("목차 이미지:", img.size)


# ── 2. 실제 PDF 내지 스크린샷 (표지 + 본문 다양한 페이지) ──
def make_pdf_page_previews():
    doc = fitz.open(str(PDF_PATH))
    n = doc.page_count
    # 표지 + 본문 전반에 걸쳐 고르게 분포한 페이지 선택 (카테고리별 예시가 섞이도록)
    picks = sorted(set([0] + [round(n * r) for r in (0.06, 0.22, 0.38, 0.54, 0.70, 0.86)]))
    zoom = 2.0  # A4(595pt) * 2 ≈ 1190px 폭 → 652px 이상 요건 충족
    mat = fitz.Matrix(zoom, zoom)
    for order, idx in enumerate(picks, start=1):
        page = doc[idx]
        pix = page.get_pixmap(matrix=mat)
        out_path = OUT / f"preview-{order:02d}-page.png"
        pix.save(str(out_path))
        print(f"내지 미리보기 {order}: page {idx + 1}/{n} -> {pix.width}x{pix.height}")
    doc.close()


if __name__ == "__main__":
    make_toc_image()
    make_pdf_page_previews()
