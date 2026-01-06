# Hextech ARAM Wiki

Static, no-dependency wiki for fast ARAM references. The page lives in `index.html` and uses a small `styles.css` + `script.js` bundle.

## Running locally

```bash
python -m http.server 8000
# visit http://localhost:8000
```

You can also double-click `index.html` in a browser; the assets are all relative.

## Editing content
- Champion cards, meta tiles, item notes, and the playbook live in `script.js` as JSON-style arrays.
- Styling tweaks are in `styles.css`. Gradients and color variables sit at the top of the file.
- The page uses only vanilla HTML/JS/CSS to stay lightweight for quick loading.
