# 크몽 판매용 스타터팩 PDF 생성 — 외부 링크 없음, 표지를 크몽 구매자용으로 교체
# 실행: python scripts/build_kmong_pdf.py
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import build_publish_assets as b

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "deliverables" / "starter-pack" / "AI시킴-스타터팩-v1-pdf-master.md"
OUT = ROOT / "deliverables" / "kmong" / "AI-작업지시서-스타터팩50-크몽판.pdf"

FORBIDDEN = re.compile(r"aisikim\.com|https?://|@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}|0502[-\s]?\d", re.IGNORECASE)


def main() -> None:
    md = MASTER.read_text(encoding="utf-8")

    # 안전장치: 외부 링크/연락처가 본문에 있으면 중단
    hits = FORBIDDEN.findall(md)
    if hits:
        raise SystemExit(f"외부 링크/연락처 발견 — 크몽판 생성 중단: {hits[:5]}")

    # 이용 안내(재배포 금지) 섹션을 본문 끝에 추가
    md += (
        "\n\n---\n\n## 이용 안내\n"
        "- 본 자료의 저작권은 판매자에게 있습니다.\n"
        "- 구매자 본인의 업무·학습 목적에 한해 이용할 수 있습니다.\n"
        "- 무단 복제, 재배포, 재판매, 공유는 금지됩니다.\n"
        "- 자료 관련 문의는 구매 플랫폼의 메시지 기능을 이용해 주세요.\n"
    )

    b.register_fonts()
    styles = b.build_styles()
    story = b.markdown_to_story(md, "AI 작업지시서 스타터팩 50")
    # 표지 부제 2줄을 크몽 구매자용 문구로 교체 (인덱스: 0 Spacer, 1 제목, 2·3 부제)
    story[2] = Paragraph("상황별로 복사해서 바로 쓰는 AI 작업지시서 50개", styles["cover_subtitle"])
    story[3] = Paragraph("구매자 개인 이용 전용 · 무단 복제와 재배포를 금지합니다", styles["cover_subtitle"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="AI 작업지시서 스타터팩 50",
        author="에이치앤에이치",
    )
    doc.build(story, onFirstPage=b.add_page_number, onLaterPages=b.add_page_number)
    print("생성 완료:", OUT)


if __name__ == "__main__":
    main()
