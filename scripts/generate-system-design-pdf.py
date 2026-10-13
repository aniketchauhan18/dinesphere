#!/usr/bin/env python3
from pathlib import Path
import re

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.pdfgen import canvas
except ImportError as exc:
    raise SystemExit(
        "Missing dependency 'reportlab'. Install with: pip install reportlab"
    ) from exc


def markdown_to_text(md: str) -> str:
    text = re.sub(
        r"```mermaid[\s\S]*?```",
        "[Mermaid diagram omitted in PDF text export]\n",
        md,
        flags=re.MULTILINE,
    )
    text = re.sub(r"```[\s\S]*?```", lambda m: "\n" + m.group(0).replace("```", "").strip() + "\n", text)
    text = re.sub(r"^#+\s?", "", text, flags=re.MULTILINE)
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return text


def write_pdf(input_path: Path, output_path: Path) -> None:
    content = input_path.read_text(encoding="utf-8")
    text = markdown_to_text(content)

    output_path.parent.mkdir(parents=True, exist_ok=True)

    c = canvas.Canvas(str(output_path), pagesize=A4)
    width, height = A4

    margin_x = 48
    margin_top = 56
    margin_bottom = 48
    line_height = 13
    max_chars = 110

    y = height - margin_top
    c.setFont("Helvetica", 10)

    for raw_line in text.splitlines():
        line = raw_line.rstrip()
        if not line:
            wrapped = [""]
        else:
            words = line.split(" ")
            wrapped = []
            cur = ""
            for w in words:
                candidate = w if not cur else f"{cur} {w}"
                if len(candidate) <= max_chars:
                    cur = candidate
                else:
                    wrapped.append(cur)
                    cur = w
            wrapped.append(cur)

        for segment in wrapped:
            if y <= margin_bottom:
                c.showPage()
                c.setFont("Helvetica", 10)
                y = height - margin_top
            c.drawString(margin_x, y, segment)
            y -= line_height

    c.save()


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parents[1]
    input_md = repo_root / "docs" / "system-design.md"
    output_pdf = repo_root / "docs" / "dinesphere-system-design.pdf"
    write_pdf(input_md, output_pdf)
    print(f"Generated PDF at {output_pdf}")
