export function markdownToHtml(markdown: string) {
  const lines = markdown.trim().split('\n');
  let html = '';
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += '</ul>';
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      html += `<h3>${line.slice(4)}</h3>`;
      continue;
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      continue;
    }

    closeList();
    html += `<p>${line}</p>`;
  }

  closeList();
  return html;
}
