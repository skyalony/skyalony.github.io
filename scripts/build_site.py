from __future__ import annotations

import html
import re
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class Page:
    key: str
    title: str
    description: str
    source: str
    output: str


PAGES = [
    Page(
        key="home",
        title="Zhiqi Wang",
        description=(
            "Personal academic website for Zhiqi Wang, PhD student in labor "
            "economics at Renmin University of China."
        ),
        source="content/home.md",
        output="index.html",
    ),
    Page(
        key="research",
        title="Research | Zhiqi Wang",
        description="Research and selected papers of Zhiqi Wang.",
        source="content/research.md",
        output="research.html",
    ),
    Page(
        key="notes",
        title="Notes | Zhiqi Wang",
        description="Research and method notes by Zhiqi Wang.",
        source="content/notes.md",
        output="notes.html",
    ),
    Page(
        key="blogs",
        title="Blogs | Zhiqi Wang",
        description="Blog posts and informal writing by Zhiqi Wang.",
        source="content/blogs.md",
        output="blogs.html",
    ),
    Page(
        key="teaching",
        title="Teaching | Zhiqi Wang",
        description="Teaching experience of Zhiqi Wang.",
        source="content/teaching.md",
        output="teaching.html",
    ),
]


NAV_ITEMS = [
    ("home", "主页/Home", "index.html#home"),
    ("cv", "简历/CV", "files/cv-placeholder.html"),
    ("research", "研究/Research", "research.html"),
    ("notes", "笔记/Notes", "notes.html"),
    ("blogs", "博客/Blogs", "blogs.html"),
    ("teaching", "教学/Teaching", "teaching.html"),
    ("contact", "联系/Contact", "index.html#contact"),
]


def render_inline(text: str) -> str:
    code_spans: list[str] = []

    def stash_code(match: re.Match[str]) -> str:
        code_spans.append(f"<code>{html.escape(match.group(1))}</code>")
        return f"@@CODE{len(code_spans) - 1}@@"

    text = re.sub(r"`([^`]+)`", stash_code, text)
    escaped = html.escape(text)

    def link_repl(match: re.Match[str]) -> str:
        label = match.group(1)
        url = match.group(2)
        return f'<a href="{html.escape(url, quote=True)}">{label}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link_repl, escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", escaped)
    escaped = escaped.replace("  \n", "<br>")

    for index, code_html in enumerate(code_spans):
        escaped = escaped.replace(f"@@CODE{index}@@", code_html)

    return escaped


def parse_heading(line: str) -> tuple[int, str, str | None] | None:
    match = re.match(r"^(#{1,4})\s+(.+?)(?:\s+\{#([A-Za-z0-9_-]+)\})?$", line)
    if not match:
        return None
    return len(match.group(1)), match.group(2), match.group(3)


def render_markdown(markdown: str) -> str:
    lines = markdown.splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    list_items: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if not paragraph:
            return
        text = " ".join(part.strip() for part in paragraph).strip()
        if text.startswith("Authors: "):
            output.append(f'<p class="authors">{render_inline(text.removeprefix("Authors: ").strip())}</p>')
        else:
            output.append(f"<p>{render_inline(text)}</p>")
        paragraph = []

    def flush_list() -> None:
        nonlocal list_items
        if not list_items:
            return
        output.append('<ul class="plain-list writing-list">')
        for item in list_items:
            output.append(f"  <li>{render_inline(item)}</li>")
        output.append("</ul>")
        list_items = []

    for raw_line in lines:
        line = raw_line.rstrip()
        stripped = line.strip()

        if not stripped:
            flush_paragraph()
            flush_list()
            continue

        heading = parse_heading(stripped)
        if heading:
            flush_paragraph()
            flush_list()
            level, title, heading_id = heading
            id_attr = f' id="{html.escape(heading_id, quote=True)}"' if heading_id else ""
            output.append(f"<h{level}{id_attr}>{render_inline(title)}</h{level}>")
            continue

        if stripped.startswith("- "):
            flush_paragraph()
            list_items.append(stripped[2:].strip())
            continue

        if list_items and (raw_line.startswith("  ") or raw_line.startswith("\t")):
            list_items[-1] = f"{list_items[-1]} {stripped}"
            continue

        flush_list()
        paragraph.append(line)

    flush_paragraph()
    flush_list()
    return "\n".join(output)


def nav_html(active_key: str) -> str:
    items = []
    for key, label, href in NAV_ITEMS:
        class_attr = ' class="active"' if key == active_key else ""
        items.append(f'          <a{class_attr} href="{href}">{label}</a>')
    return "\n".join(items)


def wrap_page(page: Page, body: str) -> str:
    home_href = "#home" if page.key == "home" else "index.html#home"
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{html.escape(page.title)}</title>
    <meta name="description" content="{html.escape(page.description, quote=True)}">
    <meta name="author" content="Zhiqi Wang">
    <meta property="og:title" content="{html.escape(page.title, quote=True)}">
    <meta property="og:description" content="{html.escape(page.description, quote=True)}">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" href="assets/img/headshot.png" type="image/png">
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to main content</a>

    <div class="site-shell">
      <aside class="sidebar" aria-label="Profile">
        <a class="profile-name" href="{home_href}">Zhiqi Wang</a>
        <img
          class="profile-photo"
          src="assets/img/headshot.png"
          alt="Portrait of Zhiqi Wang"
          width="220"
          height="220"
        >
        <p class="profile-email">
          <a href="mailto:zhiqiwang_econ@126.com">zhiqiwang_econ@126.com</a>
        </p>
        <p class="profile-title">
          PhD Student in Labor Economics<br>
          School of Labor and Human Resources<br>
          Renmin University of China
        </p>

        <nav class="side-nav" aria-label="Site navigation">
{nav_html(page.key)}
        </nav>
      </aside>

      <main class="content" id="main">
        <section class="content-section">
{indent(body, 10)}
        </section>

        <footer class="site-footer">
          <p>&copy; <span data-year>2026</span> Zhiqi Wang</p>
        </footer>
      </main>
    </div>

    <script src="assets/js/site.js"></script>
  </body>
</html>
"""


def indent(text: str, spaces: int) -> str:
    prefix = " " * spaces
    return "\n".join(f"{prefix}{line}" if line else "" for line in text.splitlines())


def main() -> None:
    for page in PAGES:
        markdown = (ROOT / page.source).read_text(encoding="utf-8")
        body = render_markdown(markdown)
        (ROOT / page.output).write_text(wrap_page(page, body), encoding="utf-8", newline="\n")
        print(f"built {page.output} from {page.source}")


if __name__ == "__main__":
    main()
