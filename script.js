const metaTiles = [
  {
    title: '消耗阵容',
    blurb: '利用射程与清线。慢推磨血后拆塔皮。',
    picks: ['吉格斯', '泽拉斯', '韦鲁斯'],
    tip: '站在近战兵后方，用模型掩护躲技能。'
  },
  {
    title: '正面团',
    blurb: '堆前排与增益，守好炮车兵。',
    picks: ['赛恩', '奥恩', '璐璐'],
    tip: '让坦克上前吃塔皮，触发拆塔饰品。'
  },
  {
    title: '开团/收割',
    blurb: '滚雪球式大招衔接与处决伤害。',
    picks: ['卡特琳娜', '派克', '尼菈'],
    tip: '盯住虚弱。打炮车波时更容易收割。'
  }
];

const hextechMarkdown = `
### 模式速览
- 海克斯大乱斗是极地大乱斗的特别版本，加入海克斯强化、随机事件与更多经济奖励，整体节奏更快。
- 开局保留随机英雄/重掷规则，但从 3 分钟开始全队一起选择海克斯强化，6、9 分钟会再次出现更高品质的备选。
- 地图保留海克斯传送门与全图商店，死亡后可用 Hexgate 更快回到兵线，鼓励持续进攻。

### 海克斯事件
- 每隔约 4 分钟会在河道或兵线刷新事件：可能掉落金币宝箱、加速地带、爆破果实或治疗包，需要团队抢占视野。
- 拆塔饰品依旧生效，但事件提供的加速和爆破果实让强势阵容可以更快抢塔皮。
- 部分事件会在己方二塔后刷出 “海克斯增幅装置”，拾取后提供短时间攻速与技能急速，适合开团或快推。

### 战术重点
- 3/6/9 分钟的海克斯强化会影响英雄定位：拉克丝、泽拉斯等远程偏好范围扩展与法穿，赛恩、奥恩则需要肉度或护盾强化。
- 团队至少准备一枚控制或开团强化（如额外位移、冷却重置），以便在事件点先手；增益类（治疗、移速）留给后排。
- 事件点爆发团时，优先确保炮车存活再接塔皮，失败方可借助 Hexgate 快速集结反扑。

### 经济与装备
- 事件宝箱与高额助攻奖励让经济膨胀更快，AP 英雄可提早做出大件，前排可快速合成神话后补抗性散件。
- 若对方拥有持久治疗（索拉卡、蒙多、赛恩等），仍需第一时间做出重伤组件避免被拖入拉扯战。
- 因为 Hexgate 回防迅速，复活后可先在泉水买控制守卫或侦测饰品，回线时顺便排空草丛。
`;

const champions = [
  {
    name: '拉克丝',
    role: 'poke',
    build: ['卢登的同伴', '召唤：艾黎 + 超然', '集中心灵'],
    micro: ['留 Q 给雪球先手', 'E 等对手侧移后再引爆'],
    warning: '注意敌方韧性层数，分散控制多个目标。'
  },
  {
    name: '赛恩',
    role: 'frontline',
    build: ['心之钢', '日炎圣盾', '狂徒铠甲'],
    micro: ['草丛蓄力 Q', '保存 W 护盾抵挡消耗'],
    warning: '塔下开车前先标记复活时间。'
  },
  {
    name: '卡特琳娜',
    role: 'assassin',
    build: ['夜之收割者', '纳什之牙', '灭世者的死亡之帽'],
    micro: ['等队友控制后切入收割', '雪球接瞬步躲技能或进场'],
    warning: '等沉默/虚弱交掉再交大。'
  },
  {
    name: '伊泽瑞尔',
    role: 'poke',
    build: ['三相之力', '魔宗', '赛瑞尔达的怨恨'],
    micro: ['Q 间穿插平 A', 'E 斜向位移保证安全'],
    warning: '没有队友控制时不要 E 到前排。'
  },
  {
    name: '萨勒芬妮',
    role: 'enchanter',
    build: ['月石再生器', '流水法杖', '炽热香炉'],
    micro: ['护盾给队友后打双音符', '通过兵线放大制造奇袭'],
    warning: '错开护盾节奏，避免被重伤限制。'
  },
  {
    name: '斯维因',
    role: 'mage',
    build: ['兰德里的折磨', '瑞莱的冰晶节杖', '振奋盔甲'],
    micro: ['队友控制后拉回', '团战提前开大吸血'],
    warning: '进场前确认对面是否有重伤。'
  }
];

const items = [
  {
    name: '遗失的章节 / 处刑者',
    tags: ['anti-heal'],
    bullets: ['对面有索拉卡、蒙多、赛恩、剑魔时尽早买', '只有在治疗依旧压制时再升级']
  },
  {
    name: '拆塔饰品',
    tags: ['core'],
    bullets: ['炮车波免费塔皮', '与坦克或近战辅助搭配使用']
  },
  {
    name: '蓝色饰品 / 海克斯侦测器',
    tags: ['situational'],
    bullets: ['蓝色饰品插在河道侧翼', '开团前先扫掉草丛']
  },
  {
    name: '狂徒铠甲',
    tags: ['situational'],
    bullets: ['前排被消耗时的高额回血', '约 1500 额外生命值后购买收益更高']
  },
  {
    name: '炽天使之拥',
    tags: ['core'],
    bullets: ['ARAM 的强力回蓝与护盾', '带泪水的法师尽早做出']
  }
];

const playbook = [
  {
    title: '3 级窗口',
    body: '大多数远程英雄 3 级解锁完整连招，可用雪球先手或塔皮消耗。'
  },
  {
    title: '炮车波布置',
    body: '与坦克一起护送炮车，拆塔饰品落点时由消耗英雄负责压制。'
  },
  {
    title: '复活时间',
    body: '15 分钟后死亡计时变长，只在推进状态下接受 1 换 1。'
  },
  {
    title: '同步回城',
    body: '利用 /shop 或死亡回城一起买装备，避免兵线劣势时的分批回城。'
  }
];

const tips = [
  '消耗型英雄鞋子可后买，优先急速与蓝量。',
  '等对面交位移后再丢雪球；要么开团要么收割。',
  '开团前标记召唤师技能，虚弱与净化会改变击杀线。',
  '若对面缺侦查，草丛放鬼灵精怪控制河道侧翼。',
  '中期卖掉多兰装换真眼或药水爆发。',
  '遇到隐身英雄准备红色饰品再开团。'
];

const roleLabels = {
  poke: '消耗',
  frontline: '前排',
  assassin: '刺客',
  enchanter: '增益',
  mage: '战斗法师'
};

function renderMetaTiles() {
  const container = document.getElementById('meta-tiles');
  container.innerHTML = metaTiles
    .map(
      (tile) => `
      <article class="card">
        <div class="card__title">${tile.title}<span class="card__role">${tile.picks.join(', ')}</span></div>
        <p class="muted">${tile.blurb}</p>
        <div class="tag">关键提示</div>
        <p class="muted">${tile.tip}</p>
      </article>
    `
    )
    .join('');
}

function markdownToHtml(markdown) {
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

function renderHextechMarkdown() {
  const target = document.getElementById('hextech-markdown');
  target.innerHTML = markdownToHtml(hextechMarkdown);
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
    container.innerHTML = '<p class="muted">没有匹配的英雄，请尝试其他名称或类型。</p>';
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
renderHextechMarkdown();
renderChampions();
renderItems();
renderPlaybook();
renderTips();
registerFilters();
