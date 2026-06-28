# Zhiqi Wang Personal Academic Website

This is a lightweight static academic website. Edit the Markdown files in
`content/`, then run `python scripts/build_site.py` to regenerate the HTML
pages for GitHub Pages.

## Files

- `content/home.md`: homepage content
- `content/research.md`: research and papers
- `content/notes.md`: notes list
- `content/blogs.md`: blog list
- `content/teaching.md`: teaching list
- `scripts/build_site.py`: Markdown-to-HTML generator
- `index.html`, `research.html`, `notes.html`, `blogs.html`, `teaching.html`: generated pages
- `assets/css/style.css`: visual design and responsive layout
- `assets/js/site.js`: mobile navigation and current year
- `assets/img/headshot.png`: profile photo
- `files/`: PDFs such as `cv.pdf` and paper drafts
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow
- `UPDATING.md`: owner-facing update guide

## Local Preview

After editing Markdown, run:

```powershell
python scripts/build_site.py
```

Then open `index.html` in a browser.

## Publish on GitHub Pages

1. Create a public GitHub repository, usually `USERNAME.github.io` for a user
   site or another repository name for a project site.
2. Push these files to the repository's `main` branch.
3. In GitHub, open `Settings > Pages` and set the source to GitHub Actions.
4. The workflow in `.github/workflows/deploy.yml` will publish the site after
   each push to `main`.

## Next Content to Add

- The current headshot is stored at `assets/img/headshot.png`.
- Put the CV at `files/cv.pdf`, then update CV links in `scripts/build_site.py`.
- Replace placeholder papers in `content/research.md`.
- Replace placeholder notes and blog links when ready.
