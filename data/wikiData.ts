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
