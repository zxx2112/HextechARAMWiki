import { parseFrontmatter, parseMarkdownList } from '~/utils/frontmatter';

export interface MetaTile {
  title: string;
  blurb: string;
  picks: string[];
  tip: string;
}

export interface ChampionCard {
  slug: string;
  name: string;
  role: Role;
  avatar?: string;
  build: string[];
  micro: string[];
  warning: string;
}

export interface ItemCard {
  name: string;
  tags: string[];
  bullets: string[];
}

export interface AugmentCard {
  name: string;
  icon?: string;
  tags: string[];
  bullets: string[];
}

export interface PlaybookEntry {
  title: string;
  body: string;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === 'string') : [];
}

function toSortedRawEntries(modules: Record<string, string>): Array<{ path: string; raw: string }> {
  return Object.entries(modules)
    .map(([path, raw]) => ({ path, raw }))
    .sort((a, b) => a.path.localeCompare(b.path, 'zh-Hans-CN'));
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '';
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-9) return String(Math.round(rounded));
  return String(rounded);
}

function parseValuesList(values: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const item of values) {
    const raw = String(item ?? '').trim();
    if (!raw) continue;

    const idx = raw.indexOf(':');
    if (idx === -1) continue;
    const key = raw.slice(0, idx).trim();
    const valueRaw = raw.slice(idx + 1).trim();
    if (!key || !valueRaw) continue;

    const num = Number(valueRaw);
    if (!Number.isFinite(num)) continue;
    out[key] = num;
  }
  return out;
}

type ExprToken =
  | { type: 'num'; value: number }
  | { type: 'id'; value: string }
  | { type: 'op'; value: string };

function tokenizeExpression(expr: string): ExprToken[] {
  const tokens: ExprToken[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr.charAt(i);
    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      i++;
      continue;
    }

    if ('()+-*/'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    if ((ch >= '0' && ch <= '9') || ch === '.') {
      let j = i + 1;
      while (j < expr.length) {
        const c = expr.charAt(j);
        if ((c >= '0' && c <= '9') || c === '.') j++;
        else break;
      }
      tokens.push({ type: 'num', value: Number(expr.slice(i, j)) });
      i = j;
      continue;
    }

    let j = i + 1;
    while (j < expr.length) {
      const c = expr.charAt(j);
      if (/[A-Za-z0-9_\.:]/.test(c)) j++;
      else break;
    }
    tokens.push({ type: 'id', value: expr.slice(i, j) });
    i = j;
  }
  return tokens;
}

function precedence(op: string): number {
  if (op === 'u-') return 3;
  if (op === '*' || op === '/') return 2;
  if (op === '+' || op === '-') return 1;
  return 0;
}

function toRpn(tokens: ExprToken[]): ExprToken[] {
  const output: ExprToken[] = [];
  const stack: ExprToken[] = [];
  let prev: ExprToken | null = null;

  for (const token of tokens) {
    if (token.type === 'num' || token.type === 'id') {
      output.push(token);
      prev = token;
      continue;
    }

    const op = token.value;
    if (op === '(') {
      stack.push({ type: 'op', value: op });
      prev = token;
      continue;
    }
    if (op === ')') {
      while (stack.length && (stack[stack.length - 1] as any).value !== '(') {
        output.push(stack.pop()!);
      }
      if (stack.length && (stack[stack.length - 1] as any).value === '(') stack.pop();
      prev = token;
      continue;
    }

    let actual = op;
    if (
      op === '-' &&
      (!prev || (prev.type === 'op' && prev.value !== ')') || (prev.type === 'op' && prev.value === '('))
    ) {
      actual = 'u-';
    }

    while (stack.length) {
      const top = stack[stack.length - 1];
      if (!top || top.type !== 'op') break;
      const topOp = (top as any).value as string;
      if (topOp === '(') break;
      if (precedence(topOp) < precedence(actual)) break;
      output.push(stack.pop()!);
    }
    stack.push({ type: 'op', value: actual });
    prev = token;
  }

  while (stack.length) output.push(stack.pop()!);
  return output;
}

function lookupValue(values: Record<string, number>, identifier: string): number | undefined {
  if (Object.prototype.hasOwnProperty.call(values, identifier)) return values[identifier];

  if (identifier.includes(':')) {
    const suffix = identifier.split(':').pop();
    if (suffix && Object.prototype.hasOwnProperty.call(values, suffix)) return values[suffix];
  }

  if (identifier.includes('.')) {
    const suffix = identifier.split('.').pop();
    if (suffix && Object.prototype.hasOwnProperty.call(values, suffix)) return values[suffix];
  }

  return undefined;
}

function evalRpn(rpn: ExprToken[], values: Record<string, number>): number {
  const stack: number[] = [];
  for (const token of rpn) {
    if (token.type === 'num') {
      stack.push(token.value);
      continue;
    }
    if (token.type === 'id') {
      const v = lookupValue(values, token.value);
      stack.push(typeof v === 'number' ? v : NaN);
      continue;
    }

    const op = token.value;
    if (op === 'u-') {
      const a = stack.pop();
      stack.push(typeof a === 'number' ? -a : NaN);
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();
    if (typeof a !== 'number' || typeof b !== 'number') {
      stack.push(NaN);
      continue;
    }

    if (op === '+') stack.push(a + b);
    else if (op === '-') stack.push(a - b);
    else if (op === '*') stack.push(a * b);
    else if (op === '/') stack.push(a / b);
    else stack.push(NaN);
  }
  return stack.at(-1) ?? NaN;
}

function fillPlaceholders(text: string, values: Record<string, number>): string {
  if (!text) return '';
  return text.replace(/@([^@]+)@/g, (full, inner) => {
    const expr = String(inner || '').trim();
    if (!expr) return full;

    try {
      const tokens = tokenizeExpression(expr);
      const rpn = toRpn(tokens);
      const v = evalRpn(rpn, values);
      if (!Number.isFinite(v)) return full;
      return formatNumber(v);
    } catch {
      return full;
    }
  });
}

function splitAugmentMetaFromBullets(bullets: string[]): { icon?: string; bullets: string[] } {
  let icon: string | undefined;

  const cleaned = bullets.filter((bullet) => {
    const trimmed = bullet.trim();

    const iconMatch = trimmed.match(/^图标[:：]\s*(.+)$/);
    if (iconMatch) {
      icon = iconMatch[1]?.trim() || icon;
      return false;
    }

    if (/^数据源[:：]/.test(trimmed)) return false;

    return true;
  });

  return { icon, bullets: cleaned };
}

const metaTileModules = import.meta.glob<string>('../content/metaTiles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const championModules = import.meta.glob<string>('../content/champions/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const itemModules = import.meta.glob<string>('../content/items/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const augmentModules = import.meta.glob<string>('../content/augments/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const playbookModules = import.meta.glob<string>('../content/playbook/*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const hextechModules = import.meta.glob<string>('../content/hextech.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

const tipsModules = import.meta.glob<string>('../content/tips.md', {
  eager: true,
  import: 'default',
  query: '?raw'
});

function firstRaw(modules: Record<string, string>): string {
  const first = Object.keys(modules).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))[0];
  return first ? (modules[first] ?? '') : '';
}

export const metaTiles: MetaTile[] = toSortedRawEntries(metaTileModules).map(({ raw }) => {
  const { data } = parseFrontmatter(raw);
  return {
    title: asString(data.title),
    blurb: asString(data.blurb),
    picks: asStringArray(data.picks),
    tip: asString(data.tip)
  };
});

export const hextechMarkdown = firstRaw(hextechModules);

function championSlugFromPath(path: string) {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.md$/i, '').replace(/^\d+-/, '');
}

export const champions: ChampionCard[] = toSortedRawEntries(championModules).map(({ path, raw }) => {
  const { data } = parseFrontmatter(raw);
  return {
    slug: championSlugFromPath(path),
    name: asString(data.name),
    role: asString(data.role) as Role,
    avatar: asString(data.avatar) || undefined,
    build: asStringArray(data.build),
    micro: asStringArray(data.micro),
    warning: asString(data.warning)
  };
});

export const championsBySlug: Record<string, ChampionCard> = (() => {
  const map: Record<string, ChampionCard> = {};
  for (const champ of champions) {
    if (!champ.slug) continue;
    map[champ.slug] = champ;
  }
  return map;
})();

export const items: ItemCard[] = toSortedRawEntries(itemModules).map(({ raw }) => {
  const { data } = parseFrontmatter(raw);
  return {
    name: asString(data.name),
    tags: asStringArray(data.tags),
    bullets: asStringArray(data.bullets)
  };
});

export const augments: AugmentCard[] = toSortedRawEntries(augmentModules).map(({ raw }) => {
  const { data } = parseFrontmatter(raw);
  const bullets = asStringArray(data.bullets);
  const { icon: iconFromBullets, bullets: cleanedBullets } = splitAugmentMetaFromBullets(bullets);
  const iconFromFrontmatter = asString((data as Record<string, unknown>).icon);
  const values = parseValuesList(asStringArray((data as Record<string, unknown>).values));

  const hydratedBullets = cleanedBullets.map((bullet) => fillPlaceholders(bullet, values));
  return {
    name: asString(data.name),
    icon: iconFromFrontmatter || iconFromBullets || undefined,
    tags: asStringArray(data.tags),
    bullets: hydratedBullets
  };
});

export const playbook: PlaybookEntry[] = toSortedRawEntries(playbookModules).map(({ raw }) => {
  const { data, body } = parseFrontmatter(raw);
  const fromFrontmatter = asString(data.body);
  return {
    title: asString(data.title),
    body: (fromFrontmatter || body).replace(/\s+/g, ' ').trim()
  };
});

export const tips: string[] = (() => {
  const raw = firstRaw(tipsModules);
  return raw ? parseMarkdownList(raw) : [];
})();

export const roleLabels = {
  poke: '消耗',
  frontline: '前排',
  assassin: '刺客',
  enchanter: '增益',
  mage: '战斗法师'
} as const;

export type Role = keyof typeof roleLabels;
