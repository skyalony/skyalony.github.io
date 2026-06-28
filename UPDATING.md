# Updating the Website

The site is intentionally simple. Edit Markdown files in `content/`; do not edit
the generated HTML directly unless you are changing structure. After editing,
run:

```powershell
python scripts/build_site.py
```

Then preview `index.html` in a browser.

Content files:

- `content/home.md`: homepage, research highlights, contact
- `content/research.md`: working papers and publications
- `content/notes.md`: notes
- `content/blogs.md`: blogs
- `content/teaching.md`: teaching

## Replace the Headshot

Save a professional photo in `assets/img/`, for example:

```text
assets/img/headshot.jpg
```

The current homepage uses:

```text
assets/img/headshot.png
```

Then in `scripts/build_site.py`, change:

```html
src="assets/img/headshot.png"
```

to:

```html
src="assets/img/headshot.jpg"
```

## Add the CV

Save the PDF as:

```text
files/cv.pdf
```

Then replace this path in `scripts/build_site.py`:

```html
files/cv-placeholder.html
```

with:

```html
files/cv.pdf
```

## Add a Paper

Copy one existing paper block in `content/research.md`, then edit:

- status and year
- title
- authors
- abstract or short description
- links to PDF, replication files, DOI, SSRN, or journal page

Place paper PDFs in `files/`.

## Update Notes or Blogs

Edit `content/notes.md` or `content/blogs.md`. Each item is a simple list entry
with a link and one short description.

## Update Teaching

Edit `content/teaching.md`. Keep each teaching record as one concise list item.

## Deployment

After editing Markdown, rebuild the HTML, commit, and push to GitHub:

```powershell
python scripts/build_site.py
git add .
git commit -m "Update website content"
git push origin main:master
```

GitHub Pages deploys automatically after the push.
