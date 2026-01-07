type FrontmatterValue = string | string[] | undefined;

export type FrontmatterData = Record<string, FrontmatterValue>;

export interface ParsedMarkdown {
  data: FrontmatterData;
  body: string;
}

function parseList(lines: string[], startIndex: number) {
  const items: string[] = [];
  let i = startIndex;
  for (; i < lines.length; i++) {
    const raw = lines[i] ?? '';
    if (!raw.trim()) continue;
    const match = raw.match(/^\s*-\s+(.*)$/);
    if (!match) break;
    const value = match[1];
    if (value) items.push(value.trim());
  }
  return { items, nextIndex: i };
}

/**
 * Minimal YAML-like frontmatter parser.
 * Supports:
 * ---
 * key: value
 * key:
 *   - a
 *   - b
 * ---
 */
export function parseFrontmatter(markdown: string): ParsedMarkdown {
  const normalized = markdown.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { data: {}, body: normalized.trim() };
  }

  const endIndex = normalized.indexOf('\n---', 4);
  if (endIndex === -1) {
    return { data: {}, body: normalized.trim() };
  }

  const header = normalized.slice(4, endIndex).trimEnd();
  const rest = normalized.slice(endIndex + 4);

  const data: FrontmatterData = {};
  const lines = header.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    if (!line.trim()) continue;

    const keyMatch = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);
    if (!keyMatch) continue;

    const key = keyMatch[1];
    const value = keyMatch[2] ?? '';
    if (!key) continue;

    if (value) {
      data[key] = value.trim();
      continue;
    }

    const { items, nextIndex } = parseList(lines, i + 1);
    if (items.length) {
      data[key] = items;
      i = nextIndex - 1;
    } else {
      data[key] = '';
    }
  }

  return { data, body: rest.replace(/^\n+/, '').trim() };
}

export function parseMarkdownList(markdown: string): string[] {
  const normalized = markdown.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n');
  const items: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    const match = line.match(/^-\s+(.*)$/);
    const value = match?.[1];
    if (value) items.push(value.trim());
  }
  return items;
}
