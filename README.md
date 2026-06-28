# Zhiqi Wang Personal Academic Website

This is a lightweight static academic website. It is designed for GitHub Pages and
does not require Hugo, Node, or a local build step.

## Files

- `index.html`: homepage content and main profile sections
- `research.html`, `notes.html`, `blogs.html`, `teaching.html`: standalone secondary pages
- `assets/css/style.css`: visual design and responsive layout
- `assets/js/site.js`: mobile navigation and current year
- `assets/img/headshot.png`: profile photo
- `files/`: PDFs such as `cv.pdf` and paper drafts
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow
- `UPDATING.md`: owner-facing update guide

## Local Preview

Open `index.html` in a browser.

## Publish on GitHub Pages

1. Create a public GitHub repository, usually `USERNAME.github.io` for a user
   site or another repository name for a project site.
2. Push these files to the repository's `main` branch.
3. In GitHub, open `Settings > Pages` and set the source to GitHub Actions.
4. The workflow in `.github/workflows/deploy.yml` will publish the site after
   each push to `main`.

## Next Content to Add

- The current headshot is stored at `assets/img/headshot.png`.
- Put the CV at `files/cv.pdf`, then update CV links across the HTML pages.
- Replace placeholder papers in `research.html`.
- Replace placeholder notes and blog links when ready.
