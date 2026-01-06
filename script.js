const metaTiles = [
  {
    title: 'Poke lanes',
    blurb: 'Abuse long range + waveclear. Play for slow push and chip.',
    picks: ['Ziggs', 'Xerath', 'Varus'],
    tip: 'Stand behind melees to dodge skillshots using hitbox padding.'
  },
  {
    title: 'Front-to-back',
    blurb: 'Layer tanks + enchanters. Guard cannon minions.',
    picks: ['Sion', 'Ornn', 'Lulu'],
    tip: 'Let tanks step up for tower plate demolisher procs.'
  },
  {
    title: 'Dive / Reset',
    blurb: 'Snowball ult chains and execute damage.',
    picks: ['Katarina', 'Pyke', 'Nilah'],
    tip: 'Track exhausts. Fight on cannon waves for better resets.'
  }
];

const champions = [
  {
    name: 'Lux',
    role: 'poke',
    build: ['Luden\'s Companion', 'Aery + Transcendence', 'Horizon Focus'],
    micro: ['Hold Q for snowball engages', 'E detonate after enemy sidesteps'],
    warning: 'Respect tenacity stacks; spread roots to multiple targets.'
  },
  {
    name: 'Sion',
    role: 'frontline',
    build: ['Heartsteel', 'Sunfire Aegis', 'Warmog\'s Armor'],
    micro: ['Charge Q through brushes', 'Save W shield to block poke'],
    warning: 'Ping revive timer before tower dives.'
  },
  {
    name: 'Katarina',
    role: 'assassin',
    build: ['Night Harvester', 'Nashor\'s Tooth', 'Rabadon\'s Deathcap'],
    micro: ['Look for resets after ally CC', 'Use snowball+Shunpo to dodge skillshots'],
    warning: 'Wait for silence/exhaust before committing.'
  },
  {
    name: 'Ezreal',
    role: 'poke',
    build: ['Trinity Force', 'Manamune', 'Serylda\'s Grudge'],
    micro: ['Weave autos between Qs', 'E diagonally to stay safe'],
    warning: 'Do not E forward without ally CC ready.'
  },
  {
    name: 'Seraphine',
    role: 'enchanter',
    build: ['Moonstone Renewer', 'Staff of Flowing Water', 'Ardent Censer'],
    micro: ['Cast double notes after shielding ally', 'Ult through minions for surprise picks'],
    warning: 'Space out shields to avoid anti-heal timings.'
  },
  {
    name: 'Swain',
    role: 'mage',
    build: ['Liandry\'s Torment', 'Rylai\'s Crystal Scepter', 'Spirit Visage'],
    micro: ['Pull after ally CC', 'Activate R early in brawls'],
    warning: 'Track grievous wounds before committing to drain fights.'
  }
];

const items = [
  {
    name: 'Oblivion Orb / Executioner\'s',
    tags: ['anti-heal'],
    bullets: ['Buy early vs. Soraka, Mundo, Sion, Aatrox', 'Upgrade only if healing remains oppressive']
  },
  {
    name: 'Demolisher Trinket',
    tags: ['core'],
    bullets: ['Use on cannon waves for free plates', 'Pair with tanks or melee supports']
  },
  {
    name: 'Farsight / Hextech Sweeper',
    tags: ['situational'],
    bullets: ['Place farsight in river flank', 'Sweep brushes before committing to fights']
  },
  {
    name: 'Warmog\'s Armor',
    tags: ['situational'],
    bullets: ['Great for frontline regen after poke', 'Buy after ~1500 bonus HP thresholds']
  },
  {
    name: 'Seraph\'s Embrace',
    tags: ['core'],
    bullets: ['Massive ARAM mana sustain', 'Rush on mages with Tear spikes']
  }
];

const playbook = [
  {
    title: 'Level 3 window',
    body: 'Most ranged champs unlock full combo. Look for snowball engage or tower plate poke.'
  },
  {
    title: 'Cannon wave setup',
    body: 'Group with tank to escort cannon. Drop demolisher trinket while poke champions zone.'
  },
  {
    title: 'Respawn timers',
    body: 'Post-15 minutes, death timers snowball. Trade 1 for 1 only when waves are pushed.'
  },
  {
    title: 'Reset discipline',
    body: 'Shop together using /shop timer or fountain deaths. Avoid staggered recalls on losing wave.'
  }
];

const tips = [
  'Buy boots late on poke champs; prioritize ability haste and mana.',
  'Hold snowball until after enemies burn dashes. Throw to start or finish picks.',
  'Ping summoners before you engage; exhaust and cleanse change kill pressure.',
  'Take ghost poro in brush if enemy lacks sweepers to control river flank.',
  'Sell Doran\'s items mid-game for control wards or elixir spikes.',
  'Swap to red trinket when diving versus stealth champions.'
];

const roleLabels = {
  poke: 'Poke',
  frontline: 'Frontline',
  assassin: 'Assassin',
  enchanter: 'Enchanter',
  mage: 'Battlemage'
};

function renderMetaTiles() {
  const container = document.getElementById('meta-tiles');
  container.innerHTML = metaTiles
    .map(
      (tile) => `
      <article class="card">
        <div class="card__title">${tile.title}<span class="card__role">${tile.picks.join(', ')}</span></div>
        <p class="muted">${tile.blurb}</p>
        <div class="tag">Key tip</div>
        <p class="muted">${tile.tip}</p>
      </article>
    `
    )
    .join('');
}

function renderChampions(filter = { search: '', role: 'all' }) {
  const container = document.getElementById('champion-grid');
  const normalizedSearch = filter.search.trim().toLowerCase();

  const filtered = champions.filter((champ) => {
    const matchesRole = filter.role === 'all' || champ.role === filter.role;
    const matchesSearch = champ.name.toLowerCase().includes(normalizedSearch);
    return matchesRole && matchesSearch;
  });

  if (!filtered.length) {
    container.innerHTML = '<p class="muted">No champions match that search. Try another name or archetype.</p>';
    return;
  }

  container.innerHTML = filtered
    .map(
      (champ) => `
      <article class="card">
        <div class="card__title">${champ.name} <span class="card__role">${roleLabels[champ.role]}</span></div>
        <div class="tag">${champ.build[0]}</div>
        <ul class="card__list">
          ${champ.micro.map((tip) => `<li>${tip}</li>`).join('')}
        </ul>
        <p class="muted">${champ.warning}</p>
      </article>
    `
    )
    .join('');
}

function renderItems() {
  const container = document.getElementById('item-grid');
  container.innerHTML = items
    .map(
      (item) => `
      <article class="card">
        <div class="card__title">${item.name}</div>
        <div class="legend">
          ${item.tags
            .map((tag) => `<span class="pill pill--${tag}">${tag.replace('-', ' ')}</span>`)
            .join('')}
        </div>
        <ul class="card__list">${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </article>
    `
    )
    .join('');
}

function renderPlaybook() {
  const container = document.getElementById('playbook-timeline');
  container.innerHTML = playbook
    .map(
      (entry) => `
      <div class="timeline__entry">
        <h3 class="timeline__title">${entry.title}</h3>
        <p class="timeline__body">${entry.body}</p>
      </div>
    `
    )
    .join('');
}

function renderTips() {
  const list = document.getElementById('tips-list');
  list.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join('');
}

function registerFilters() {
  const searchInput = document.getElementById('champion-search');
  const roleSelect = document.getElementById('role-filter');
  const update = () =>
    renderChampions({
      search: searchInput.value,
      role: roleSelect.value
    });

  searchInput.addEventListener('input', update);
  roleSelect.addEventListener('change', update);
}

renderMetaTiles();
renderChampions();
renderItems();
renderPlaybook();
renderTips();
registerFilters();
