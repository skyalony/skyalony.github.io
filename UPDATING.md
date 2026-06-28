# Updating the Website

The site is intentionally simple. Main profile content is in `index.html`;
research output is in `research.html`; notes, blogs, and teaching are in their
own pages.

## Replace the Headshot

Save a professional photo in `assets/img/`, for example:

```text
assets/img/headshot.jpg
```

The current homepage uses:

```text
assets/img/headshot.png
```

Then in each HTML page, change:

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

Then replace this path across the HTML pages:

```html
files/cv-placeholder.html
```

with:

```html
files/cv.pdf
```

## Add a Paper

Copy one existing `.paper` block in `research.html`, then edit:

- status and year
- title
- authors
- abstract or short description
- links to PDF, replication files, DOI, SSRN, or journal page

Place paper PDFs in `files/`.

## Update Notes or Blogs

Edit `notes.html` or `blogs.html`. Each item in those pages is a simple list
entry with a link and one short description.

## Update Teaching

Edit `teaching.html`. Keep each teaching record as one concise list item.

## Deployment

After editing, push to GitHub. If GitHub Pages is configured to use GitHub
Actions, the workflow deploys automatically.
