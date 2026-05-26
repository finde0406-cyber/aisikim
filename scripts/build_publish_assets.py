from __future__ import annotations

import re
from pathlib import Path
from typing import Dict, List, Tuple

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
)
from reportlab.platypus.flowables import HRFlowable


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
DELIVERABLES = ROOT / "deliverables"
FONT_REGULAR = r"C:\Windows\Fonts\malgun.ttf"
FONT_BOLD = r"C:\Windows\Fonts\malgunbd.ttf"


STARTER_CATEGORY_MAP: List[Tuple[str, List[str]]] = [
    (
        "블로그/콘텐츠 작업지시서",
        [
            "블로그 글의 첫 구조를 잡고 싶을 때",
            "글 제목 후보를 여러 방향으로 뽑고 싶을 때",
            "블로그 도입부를 더 강하게 쓰고 싶을 때",
            "소제목 구조를 더 읽기 좋게 정리하고 싶을 때",
            "정보형 글을 더 구체적으로 확장하고 싶을 때",
            "판매형 콘텐츠 문구를 자연스럽게 녹이고 싶을 때",
            "같은 내용을 짧은 SNS용 문구로 바꾸고 싶을 때",
            "글 초안을 대상 독자에 맞게 다시 다듬고 싶을 때",
            "블로그 글의 마무리와 CTA를 더 좋게 쓰고 싶을 때",
            "완성된 글을 전체 검수하고 수정하고 싶을 때",
        ],
    ),
    (
        "업무/보고서 작업지시서",
        [
            "업무 보고서의 기본 구조를 잡고 싶을 때",
            "보고서 목차를 더 설득력 있게 만들고 싶을 때",
            "회의록을 실무 문서로 정리하고 싶을 때",
            "상사 보고용 요약본을 짧게 만들고 싶을 때",
            "기획서 초안을 항목별로 채우고 싶을 때",
            "업무 이메일을 더 명확하게 쓰고 싶을 때",
            "실행 계획을 체크리스트로 정리하고 싶을 때",
            "문제 보고 문서를 더 차분하고 정확하게 쓰고 싶을 때",
            "제안서를 읽는 사람이 바로 이해하게 고치고 싶을 때",
            "완성된 보고서나 기획서를 최종 검수하고 싶을 때",
        ],
    ),
    (
        "앱/웹사이트 개발 작업지시서",
        [
            "기능 요구사항을 처음 정리하고 싶을 때",
            "사용자 흐름을 화면 단위로 정리하고 싶을 때",
            "개발자에게 전달할 작업 지시문을 만들고 싶을 때",
            "버그 상황을 더 정확하게 설명하고 싶을 때",
            "UI 수정 요청을 더 구체적으로 하고 싶을 때",
            "API 연동 작업을 설명하고 싶을 때",
            "MVP 범위와 추후 확장 범위를 나누고 싶을 때",
            "코드를 직접 짜기 전 구조 제안을 받고 싶을 때",
            "이미 나온 코드나 구현안을 개선 요청하고 싶을 때",
            "개발 결과물을 최종 검수하고 싶을 때",
        ],
    ),
    (
        "결과물 검수/수정 작업지시서",
        [
            "너무 일반적인 답변을 더 구체적으로 바꾸고 싶을 때",
            "길기만 한 결과물을 더 짧고 명확하게 만들고 싶을 때",
            "방향은 맞지만 완성도가 낮은 결과를 다듬고 싶을 때",
            "독자나 대상에 맞게 톤을 바꾸고 싶을 때",
            "빠진 핵심 요소가 있는지 점검하고 싶을 때",
            "추상적인 표현을 실제 예시 중심으로 바꾸고 싶을 때",
            "읽기 쉬운 구조로 다시 나누고 싶을 때",
            "더 설득력 있게 다시 쓰고 싶을 때",
            "최종 제출 전 품질 체크를 받고 싶을 때",
            "여러 수정 버전 중 더 나은 방향을 판단하고 싶을 때",
        ],
    ),
    (
        "공통 AI 활용/작업설계 작업지시서",
        [
            "AI 작업을 어떤 순서로 시작해야 할지 모르겠을 때",
            "첫 질문을 더 잘 시작하고 싶을 때",
            "내 상황을 AI에게 설명하는 문장을 만들고 싶을 때",
            "원하는 결과물 형식을 먼저 고정하고 싶을 때",
            "후속 질문 흐름을 설계하고 싶을 때",
            "수정 요청을 어떻게 이어갈지 설계하고 싶을 때",
            "검수 질문을 어떻게 던질지 정리하고 싶을 때",
            "같은 작업을 다른 AI 도구에 맞게 바꾸고 싶을 때",
            "AI 답변이 뻔할 때 더 깊은 답을 끌어내고 싶을 때",
            "전체 작업 흐름을 한 번에 설계하고 싶을 때",
        ],
    ),
]


STARTER_SOURCE_FILES = [
    DOCS / "starter-pack-priority-5-premium-v2.md",
    DOCS / "starter-pack-priority-5b-premium-v2.md",
    DOCS / "starter-pack-priority-5c-premium-v2.md",
    DOCS / "starter-pack-remaining-35-batch1-draft-v1.md",
    DOCS / "starter-pack-remaining-35-batch2-draft-v1.md",
    DOCS / "starter-pack-remaining-35-batch3-draft-v1.md",
    DOCS / "starter-pack-remaining-35-batch4-draft-v1.md",
    DOCS / "starter-pack-remaining-35-batch5-draft-v1.md",
]


FOCUSED_PACKS = [
    {
        "slug": "app-web-development",
        "title": "AI시킴 앱/웹사이트 개발 집중팩",
        "subtitle": "개발 요청, 기능 정의, 구조 제안, 최종 검수까지 한 흐름으로 정리한 실전 작업지시서",
        "pdf_name": "AI시킴-앱-웹사이트-개발-집중팩-v1.pdf",
        "md_name": "AI시킴-앱-웹사이트-개발-집중팩-v1-final.md",
        "notion_name": "AI시킴-앱-웹사이트-개발-집중팩-v1-notion-final.md",
        "target": [
            "개발자에게 무엇을 어떻게 요청해야 할지 막막한 사람",
            "기능 정의와 요구사항 정리를 더 명확하게 하고 싶은 사람",
            "개발 결과물을 배포 전에 더 꼼꼼하게 검수하고 싶은 사람",
        ],
        "quick_start": [
            "기능 정의가 막힌다면 `기능 요구사항을 처음 정리하고 싶을 때`부터 시작합니다.",
            "개발자 전달 문장이 약하다면 `개발자에게 전달할 작업 지시문을 만들고 싶을 때`를 이어서 사용합니다.",
            "결과물을 내보내기 전에는 `개발 결과물을 최종 검수하고 싶을 때`로 마무리합니다.",
        ],
        "core": STARTER_CATEGORY_MAP[2][1],
        "support": [
            "빠진 핵심 요소가 있는지 점검하고 싶을 때",
            "수정 요청을 어떻게 이어갈지 설계하고 싶을 때",
            "검수 질문을 어떻게 던질지 정리하고 싶을 때",
            "같은 작업을 다른 AI 도구에 맞게 바꾸고 싶을 때",
            "전체 작업 흐름을 한 번에 설계하고 싶을 때",
        ],
    },
    {
        "slug": "work-report",
        "title": "AI시킴 업무/보고서 집중팩",
        "subtitle": "보고서 초안, 상사 보고, 기획서 정리, 문제 보고, 최종 검수까지 실무 문서 흐름에 맞춘 작업지시서",
        "pdf_name": "AI시킴-업무-보고서-집중팩-v1.pdf",
        "md_name": "AI시킴-업무-보고서-집중팩-v1-final.md",
        "notion_name": "AI시킴-업무-보고서-집중팩-v1-notion-final.md",
        "target": [
            "보고 문서 초안을 더 빨리 정리하고 싶은 직장인",
            "상사나 이해관계자가 바로 이해하는 문장을 만들고 싶은 사람",
            "실행안, 요약본, 문제 보고처럼 실무 문서를 반복 작성하는 사람",
        ],
        "quick_start": [
            "보고서 뼈대가 막히면 `업무 보고서의 기본 구조를 잡고 싶을 때`부터 시작합니다.",
            "상사 공유용으로 줄여야 하면 `상사 보고용 요약본을 짧게 만들고 싶을 때`를 이어서 사용합니다.",
            "제출 직전에는 `완성된 보고서나 기획서를 최종 검수하고 싶을 때`로 마무리합니다.",
        ],
        "core": STARTER_CATEGORY_MAP[1][1],
        "support": [
            "원하는 결과물 형식을 먼저 고정하고 싶을 때",
            "빠진 핵심 요소가 있는지 점검하고 싶을 때",
            "수정 요청을 어떻게 이어갈지 설계하고 싶을 때",
            "검수 질문을 어떻게 던질지 정리하고 싶을 때",
            "전체 작업 흐름을 한 번에 설계하고 싶을 때",
        ],
    },
    {
        "slug": "blog-content",
        "title": "AI시킴 블로그/콘텐츠 집중팩",
        "subtitle": "제목, 도입부, 구조, CTA, 최종 검수까지 콘텐츠를 끝까지 다듬는 흐름형 작업지시서",
        "pdf_name": "AI시킴-블로그-콘텐츠-집중팩-v1.pdf",
        "md_name": "AI시킴-블로그-콘텐츠-집중팩-v1-final.md",
        "notion_name": "AI시킴-블로그-콘텐츠-집중팩-v1-notion-final.md",
        "target": [
            "글 초안은 나오지만 도입부와 흐름이 늘 약한 사람",
            "콘텐츠를 게시 직전까지 더 강하게 다듬고 싶은 사람",
            "정보형 글과 판매형 문구를 자연스럽게 함께 쓰고 싶은 사람",
        ],
        "quick_start": [
            "초안부터 막히면 `블로그 글의 첫 구조를 잡고 싶을 때`부터 시작합니다.",
            "읽는 사람이 중간에 이탈하면 `블로그 도입부를 더 강하게 쓰고 싶을 때`와 `소제목 구조를 더 읽기 좋게 정리하고 싶을 때`를 이어서 사용합니다.",
            "게시 직전에는 `완성된 글을 전체 검수하고 수정하고 싶을 때`로 마무리합니다.",
        ],
        "core": STARTER_CATEGORY_MAP[0][1],
        "support": [
            "독자나 대상에 맞게 톤을 바꾸고 싶을 때",
            "빠진 핵심 요소가 있는지 점검하고 싶을 때",
            "수정 요청을 어떻게 이어갈지 설계하고 싶을 때",
            "검수 질문을 어떻게 던질지 정리하고 싶을 때",
            "전체 작업 흐름을 한 번에 설계하고 싶을 때",
        ],
    },
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.strip() + "\n", encoding="utf-8")


def extract_numbered_sections(markdown: str) -> Dict[str, str]:
    pattern = re.compile(r"^##\s+\d+\.\s+(.+?)\n", re.MULTILINE)
    matches = list(pattern.finditer(markdown))
    sections: Dict[str, str] = {}
    for idx, match in enumerate(matches):
        title = match.group(1).strip()
        start = match.start()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(markdown)
        block = markdown[start:end].strip()
        block = re.sub(r"^##\s+\d+\.\s+.+?$", f"## {title}", block, count=1, flags=re.MULTILINE)
        sections[title] = block
    return sections


def build_sample_pack_master() -> Tuple[str, str]:
    content = read_text(DOCS / "sample-pack-publish-master-v1.md").strip()
    pdf_path = DELIVERABLES / "sample-pack" / "AI시킴-무료-작업지시서-샘플팩-v1-final.md"
    notion_path = DELIVERABLES / "sample-pack" / "AI시킴-무료-작업지시서-샘플팩-v1-notion-final.md"
    write_text(pdf_path, content)
    write_text(notion_path, content)
    return str(pdf_path), str(notion_path)


def build_starter_pack_master() -> Tuple[str, str]:
    intro_pdf = read_text(DOCS / "starter-pack-pdf-final-copy-v1.md").strip()
    intro_notion = read_text(DOCS / "starter-pack-notion-final-copy-v1.md").strip()

    section_map: Dict[str, str] = {}
    for path in STARTER_SOURCE_FILES:
        section_map.update(extract_numbered_sections(read_text(path)))

    category_blocks: List[str] = []
    for category, titles in STARTER_CATEGORY_MAP:
        category_blocks.append(f"# {category}")
        for title in titles:
            if title not in section_map:
                raise KeyError(f"Missing starter-pack section: {title}")
            category_blocks.append(section_map[title].strip())

    joined_categories = "\n\n---\n\n".join(category_blocks)
    pdf_master = f"{intro_pdf}\n\n---\n\n{joined_categories}"
    notion_master = f"{intro_notion}\n\n---\n\n{joined_categories}"

    pdf_master_path = DELIVERABLES / "starter-pack" / "AI시킴-스타터팩-v1-pdf-master.md"
    notion_master_path = DELIVERABLES / "starter-pack" / "AI시킴-스타터팩-v1-notion-final.md"
    write_text(pdf_master_path, pdf_master)
    write_text(notion_master_path, notion_master)
    return str(pdf_master_path), str(notion_master_path)


def build_focused_pack_master(pack: Dict[str, object]) -> Tuple[str, str]:
    section_map: Dict[str, str] = {}
    for path in STARTER_SOURCE_FILES:
        section_map.update(extract_numbered_sections(read_text(path)))

    lines: List[str] = [
        f"# {pack['title']}",
        "",
        f"{pack['subtitle']}",
        "",
        "---",
        "",
        "## 이 팩이 특히 잘 맞는 사람",
    ]
    for item in pack["target"]:  # type: ignore[index]
        lines.append(f"- {item}")
    lines.extend(
        [
            "",
            "## 먼저 이렇게 사용하세요",
        ]
    )
    quick_start = pack["quick_start"]  # type: ignore[index]
    for idx, item in enumerate(quick_start, start=1):
        lines.append(f"{idx}. {item}")

    lines.extend(
        [
            "",
            "## 이 팩은 왜 따로 존재하나요?",
            "이 패키지는 특정 분야에서 바로 써먹을 수 있는 작업지시서만 빠르게 꺼내 쓰고 싶은 사용자를 위해 분리한 집중팩입니다.",
            "즉, 안 쓸 분야까지 같이 사는 느낌보다 `내가 지금 필요한 문제를 바로 해결하는 느낌`이 먼저 오도록 구성합니다.",
            "",
            "## 핵심 작업지시서",
        ]
    )

    for title in pack["core"]:  # type: ignore[index]
        if title not in section_map:
            raise KeyError(f"Missing focused-pack core section: {title}")
        lines.append(section_map[title].strip())
        lines.extend(["", "---", ""])

    lines.extend(
        [
            "## 보조 작업지시서",
            "아래 보조 작업지시서는 핵심 작업지시서를 더 오래, 더 깊게 쓰게 도와주는 연결 세트입니다.",
        ]
    )
    for title in pack["support"]:  # type: ignore[index]
        if title not in section_map:
            raise KeyError(f"Missing focused-pack support section: {title}")
        lines.append(section_map[title].strip())
        lines.extend(["", "---", ""])

    lines.extend(
        [
            "## 마지막 활용 팁",
            "이 팩은 한 개 문장을 던지고 끝내는 자료가 아니라, 핵심 작업지시서와 보조 작업지시서를 조합해서 결과를 끝까지 다듬는 데 목적이 있습니다.",
            "먼저 지금 가장 가까운 핵심 작업지시서 1개를 쓰고, 결과가 약하면 보조 작업지시서의 후속/수정/검수 흐름으로 이어가세요.",
        ]
    )

    content = "\n".join(lines).strip()
    base = DELIVERABLES / "focused-packs" / str(pack["slug"])
    pdf_master_path = base / str(pack["md_name"])
    notion_master_path = base / str(pack["notion_name"])
    write_text(pdf_master_path, content)
    write_text(notion_master_path, content)
    return str(pdf_master_path), str(notion_master_path)


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("MalgunGothic", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("MalgunGothic-Bold", FONT_BOLD))


def build_styles():
    styles = getSampleStyleSheet()
    body = ParagraphStyle(
        "AisikimBody",
        parent=styles["BodyText"],
        fontName="MalgunGothic",
        fontSize=10.5,
        leading=17,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=7,
    )
    h1 = ParagraphStyle(
        "AisikimH1",
        parent=body,
        fontName="MalgunGothic-Bold",
        fontSize=20,
        leading=28,
        textColor=colors.HexColor("#111827"),
        spaceBefore=14,
        spaceAfter=14,
    )
    h2 = ParagraphStyle(
        "AisikimH2",
        parent=body,
        fontName="MalgunGothic-Bold",
        fontSize=15.5,
        leading=22,
        textColor=colors.HexColor("#111827"),
        spaceBefore=16,
        spaceAfter=10,
    )
    h3 = ParagraphStyle(
        "AisikimH3",
        parent=body,
        fontName="MalgunGothic-Bold",
        fontSize=12.5,
        leading=18,
        textColor=colors.HexColor("#312e81"),
        spaceBefore=12,
        spaceAfter=7,
    )
    bullet = ParagraphStyle(
        "AisikimBullet",
        parent=body,
        leftIndent=12,
        firstLineIndent=-8,
        bulletIndent=0,
        spaceAfter=4,
    )
    number = ParagraphStyle(
        "AisikimNumber",
        parent=body,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4,
    )
    code = ParagraphStyle(
        "AisikimCode",
        parent=body,
        fontName="MalgunGothic",
        fontSize=9.2,
        leading=13,
        leftIndent=10,
        rightIndent=10,
        backColor=colors.HexColor("#f3f4f6"),
        borderPadding=8,
        spaceBefore=4,
        spaceAfter=10,
    )
    cover_title = ParagraphStyle(
        "AisikimCoverTitle",
        parent=body,
        alignment=TA_CENTER,
        fontName="MalgunGothic-Bold",
        fontSize=24,
        leading=34,
        textColor=colors.HexColor("#111827"),
        spaceAfter=14,
    )
    cover_subtitle = ParagraphStyle(
        "AisikimCoverSubtitle",
        parent=body,
        alignment=TA_CENTER,
        fontName="MalgunGothic",
        fontSize=13,
        leading=20,
        textColor=colors.HexColor("#4b5563"),
        spaceAfter=10,
    )
    return {
        "body": body,
        "h1": h1,
        "h2": h2,
        "h3": h3,
        "bullet": bullet,
        "number": number,
        "code": code,
        "cover_title": cover_title,
        "cover_subtitle": cover_subtitle,
    }


def paragraph_text(line: str) -> str:
    return line.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def markdown_to_story(markdown: str, title: str):
    styles = build_styles()
    story = []
    story.append(Spacer(1, 35 * mm))
    story.append(Paragraph(title, styles["cover_title"]))
    story.append(
        Paragraph(
            "AI시킴 고객 전달용 최종 산출물",
            styles["cover_subtitle"],
        )
    )
    story.append(
        Paragraph(
            "이 PDF는 실제 발송/판매용 원본을 기준으로 제작된 버전입니다.",
            styles["cover_subtitle"],
        )
    )
    story.append(PageBreak())

    lines = markdown.splitlines()
    in_code = False
    code_lines: List[str] = []

    def flush_code():
        nonlocal code_lines
        if code_lines:
            story.append(Preformatted("\n".join(code_lines), styles["code"]))
            code_lines = []

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()

        if stripped.startswith("```"):
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not stripped:
            story.append(Spacer(1, 4))
            continue

        if stripped == "---":
            story.append(Spacer(1, 6))
            story.append(HRFlowable(width="100%", color=colors.HexColor("#d1d5db"), thickness=0.7))
            story.append(Spacer(1, 6))
            continue

        if stripped.startswith("# "):
            story.append(Paragraph(paragraph_text(stripped[2:]), styles["h1"]))
            continue
        if stripped.startswith("## "):
            story.append(Paragraph(paragraph_text(stripped[3:]), styles["h2"]))
            continue
        if stripped.startswith("### "):
            story.append(Paragraph(paragraph_text(stripped[4:]), styles["h3"]))
            continue

        if re.match(r"^\d+\.\s+", stripped):
            story.append(Paragraph(paragraph_text(stripped), styles["number"]))
            continue
        if stripped.startswith("- "):
            story.append(Paragraph("• " + paragraph_text(stripped[2:]), styles["bullet"]))
            continue

        story.append(Paragraph(paragraph_text(stripped), styles["body"]))

    flush_code()
    return story


def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont("MalgunGothic", 9)
    canvas.setFillColor(colors.HexColor("#6b7280"))
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, str(doc.page))
    canvas.restoreState()


def build_pdf(markdown_path: Path, pdf_path: Path, title: str) -> None:
    register_fonts()
    story = markdown_to_story(read_text(markdown_path), title)
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=title,
        author="AI시킴",
    )
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)


def main() -> None:
    sample_pdf_master, sample_notion_master = build_sample_pack_master()
    starter_pdf_master, starter_notion_master = build_starter_pack_master()

    build_pdf(
        Path(sample_pdf_master),
        DELIVERABLES / "sample-pack" / "AI시킴-무료-작업지시서-샘플팩-v1.pdf",
        "AI시킴 무료 작업지시서 샘플팩",
    )
    build_pdf(
        Path(starter_pdf_master),
        DELIVERABLES / "starter-pack" / "AI시킴-스타터팩-v1.pdf",
        "AI시킴 스타터팩",
    )

    focused_results = []
    for pack in FOCUSED_PACKS:
        pdf_master, notion_master = build_focused_pack_master(pack)
        build_pdf(
            Path(pdf_master),
            DELIVERABLES / "focused-packs" / str(pack["slug"]) / str(pack["pdf_name"]),
            str(pack["title"]),
        )
        focused_results.append((pack["slug"], pdf_master, notion_master))

    print("sample_pdf_master", sample_pdf_master)
    print("sample_notion_master", sample_notion_master)
    print("starter_pdf_master", starter_pdf_master)
    print("starter_notion_master", starter_notion_master)
    for slug, pdf_master, notion_master in focused_results:
        print(f"{slug}_pdf_master", pdf_master)
        print(f"{slug}_notion_master", notion_master)


if __name__ == "__main__":
    main()
