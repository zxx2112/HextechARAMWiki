const v=`---\r
title: 消耗阵容\r
blurb: 利用射程与清线。慢推磨血后拆塔皮。\r
picks:\r
  - 吉格斯\r
  - 泽拉斯\r
  - 韦鲁斯\r
tip: 站在近战兵后方，用模型掩护躲技能。\r
---\r
`,k=`---\r
title: 正面团\r
blurb: 堆前排与增益，守好炮车兵。\r
picks:\r
  - 赛恩\r
  - 奥恩\r
  - 璐璐\r
tip: 让坦克上前吃塔皮，触发拆塔饰品。\r
---\r
`,y=`---\r
title: 开团/收割\r
blurb: 滚雪球式大招衔接与处决伤害。\r
picks:\r
  - 卡特琳娜\r
  - 派克\r
  - 尼菈\r
tip: 盯住虚弱。打炮车波时更容易收割。\r
---\r
`,w=`---\r
name: 拉克丝\r
role: poke\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Lux.png\r
build:\r
  - 卢登的同伴\r
  - 召唤：艾黎 + 超然\r
  - 集中心灵\r
micro:\r
  - 留 Q 给雪球先手\r
  - E 等对手侧移后再引爆\r
warning: 注意敌方韧性层数，分散控制多个目标。\r
---\r
`,x=`---\r
name: 赛恩\r
role: frontline\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sion.png\r
build:\r
  - 心之钢\r
  - 日炎圣盾\r
  - 狂徒铠甲\r
micro:\r
  - 草丛蓄力 Q\r
  - 保存 W 护盾抵挡消耗\r
warning: 塔下开车前先标记复活时间。\r
---\r
`,M=`---\r
name: 卡特琳娜\r
role: assassin\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Katarina.png\r
build:\r
  - 夜之收割者\r
  - 纳什之牙\r
  - 灭世者的死亡之帽\r
micro:\r
  - 等队友控制后切入收割\r
  - 雪球接瞬步躲技能或进场\r
warning: 等沉默/虚弱交掉再交大。\r
---\r
`,O=`---\r
name: 伊泽瑞尔\r
role: poke\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Ezreal.png\r
build:\r
  - 三相之力\r
  - 魔宗\r
  - 赛瑞尔达的怨恨\r
micro:\r
  - Q 间穿插平 A\r
  - E 斜向位移保证安全\r
warning: 没有队友控制时不要 E 到前排。\r
---\r
`,S=`---\r
name: 萨勒芬妮\r
role: enchanter\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Seraphine.png\r
build:\r
  - 月石再生器\r
  - 流水法杖\r
  - 炽热香炉\r
micro:\r
  - 护盾给队友后打双音符\r
  - 通过兵线放大制造奇袭\r
warning: 错开护盾节奏，避免被重伤限制。\r
---\r
`,j=`---\r
name: 斯维因\r
role: mage\r
avatar: https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Swain.png\r
build:\r
  - 兰德里的折磨\r
  - 瑞莱的冰晶节杖\r
  - 振奋盔甲\r
micro:\r
  - 队友控制后拉回\r
  - 团战提前开大吸血\r
warning: 进场前确认对面是否有重伤。\r
---\r
`,z=`---\r
name: 遗失的章节 / 处刑者\r
tags:\r
  - anti-heal\r
bullets:\r
  - 对面有索拉卡、蒙多、赛恩、剑魔时尽早买\r
  - 只有在治疗依旧压制时再升级\r
---\r
`,A=`---\r
name: 拆塔饰品\r
tags:\r
  - core\r
bullets:\r
  - 炮车波免费塔皮\r
  - 与坦克或近战辅助搭配使用\r
---\r
`,E=`---\r
name: 蓝色饰品 / 海克斯侦测器\r
tags:\r
  - situational\r
bullets:\r
  - 蓝色饰品插在河道侧翼\r
  - 开团前先扫掉草丛\r
---\r
`,H=`---\r
name: 狂徒铠甲\r
tags:\r
  - situational\r
bullets:\r
  - 前排被消耗时的高额回血\r
  - 约 1500 额外生命值后购买收益更高\r
---\r
`,T=`---\r
name: 炽天使之拥\r
tags:\r
  - core\r
bullets:\r
  - ARAM 的强力回蓝与护盾\r
  - 带泪水的法师尽早做出\r
---\r
`,C=`---\r
title: 3 级窗口\r
---\r
大多数远程英雄 3 级解锁完整连招，可用雪球先手或塔皮消耗。\r
`,L=`---\r
title: 炮车波布置\r
---\r
与坦克一起护送炮车，拆塔饰品落点时由消耗英雄负责压制。\r
`,$=`---\r
title: 复活时间\r
---\r
15 分钟后死亡计时变长，只在推进状态下接受 1 换 1。\r
`,F=`---\r
title: 同步回城\r
---\r
利用 /shop 或死亡回城一起买装备，避免兵线劣势时的分批回城。\r
`,I=`---\r
title: 强化节点开团\r
---\r
强化回合前先攒关键技能与雪球，确认队伍缺口后再选强化，并把第一波团打在强化刚到手的强势窗口。`,Q=`---\r
title: 传送门分批进场\r
---\r
传送门点击进场先后很关键：先手位先落点吃第一波技能，后排确认安全再进，避免全员落地吃控被秒。`,R=`---\r
title: 9级锻造器补短板\r
---\r
9级后若能买属性锻造器，用它补移速/韧性/穿透等关键属性；买完立刻围绕事件点或兵线兑现优势。`,K=`---\r
title: 封王要等成型\r
---\r
封王这类高风险触发型强化别硬冲：先做出核心传说装，再在视野与技能优势下执行，成功后立刻逼团或推塔。`,N=`### 模式速览\r
- 海克斯大乱斗是极地大乱斗的特别版本，加入海克斯强化、随机事件与更多经济奖励，整体节奏更快。\r
- 开局保留随机英雄/重掷规则，并在对局过程中多次提供海克斯强化选择（常见为开局与 7/11/15 级节点；具体以当前版本为准）。\r
- 地图保留海克斯传送门与全图商店，死亡后可用 Hexgate 更快回到兵线，鼓励持续进攻。\r
\r
### 海克斯事件\r
- 每隔约 4 分钟会在河道或兵线刷新事件：可能掉落金币宝箱、加速地带、爆破果实或治疗包，需要团队抢占视野。\r
- 拆塔饰品依旧生效，但事件提供的加速和爆破果实让强势阵容可以更快抢塔皮。\r
- 部分事件会在己方二塔后刷出 “海克斯增幅装置”，拾取后提供短时间攻速与技能急速，适合开团或快推。\r
\r
### 战术重点\r
- 3/6/9 分钟的海克斯强化会影响英雄定位：拉克丝、泽拉斯等远程偏好范围扩展与法穿，赛恩、奥恩则需要肉度或护盾强化。\r
- 团队至少准备一枚控制或开团强化（如额外位移、冷却重置），以便在事件点先手；增益类（治疗、移速）留给后排。\r
- 事件点爆发团时，优先确保炮车存活再接塔皮，失败方可借助 Hexgate 快速集结反扑。\r
\r
### 强化选择：先补短板\r
- 把强化当作“第二套出装/第二张定位”：先补团队缺口（开团、控制、清线、续航、处理前排），再考虑个人上限。\r
- 如果你的强化需要在阵亡后才能更换，把“什么时候死”当作资源：想换强化就别硬苟残血；不想换就避免无意义送死。\r
- 高品质强化回合往往是强开窗口：提前攒关键技能、卡兵线位置、把团战打在对手技能真空或站位散的时候。\r
\r
### 传送门：点击前先看控\r
- 传送门从“触碰触发”变为“点击触发”后，更容易做到分批进场：先手/控制位先落点，后排确认安全再点。\r
- 外塔倒塌后落点会变化，复活回线先报集合点，避免队友分批到场被逐个击破。\r
- 可以使用敌方传送门意味着侧翼路线成立：适合刺客或强开找角度，但失败代价也更大，别全员盲点。\r
\r
### 9 级锻造器：用金币买关键属性\r
- 部分版本在 9 级后提供固定价格的“属性锻造器/属性选择”道具：用来补移速、韧性、穿透或生存等关键短板。\r
- 原则是“买完就兑现”：拿到关键属性后立刻围绕事件点/兵线打一波，别把它当作长期存钱罐。\r
\r
### 触发型强化：封王（King Me）\r
- 这类强化往往要求你在拥有传说装备后，利用敌方传送装置完成一次高风险交互来换取大幅增益。\r
- 触发前先成型核心装，再找“对手技能交过/视野优势/队友能牵制”的窗口执行；触发成功立刻逼团或推塔把增益转成胜势。\r
\r
### 经济与装备\r
- 事件宝箱与高额助攻奖励让经济膨胀更快，AP 英雄可提早做出大件，前排可快速合成神话后补抗性散件。\r
- 若对方拥有持久治疗（索拉卡、蒙多、赛恩等），仍需第一时间做出重伤组件避免被拖入拉扯战。\r
- 因为 Hexgate 回防迅速，复活后可先在泉水买控制守卫或侦测饰品，回线时顺便排空草丛。\r
`,P=`- 消耗型英雄鞋子可后买，优先急速与蓝量。\r
- 等对面交位移后再丢雪球；要么开团要么收割。\r
- 开团前标记召唤师技能，虚弱与净化会改变击杀线。\r
- 若对面缺侦查，草丛放鬼灵精怪控制河道侧翼。\r
- 中期卖掉多兰装换真眼或药水爆发。\r
- 遇到隐身英雄准备红色饰品再开团。\r
- 强化别只选“爽的”：先补团队缺口（前排/控制/清线/续航）。\r
- 想换强化就别硬苟残血：规划一次“有价值的阵亡”顺便同步买装。\r
- 点传送门前先看控制与范围技能，后排不要盲跟先手落点。\r
- 外塔倒塌后传送门落点会变，复活回线先报集合点再进场。\r
- 触发型强化（如封王）别急：核心装成型后再找窗口执行。\r
`;function W(r,n){const t=[];let e=n;for(;e<r.length;e++){const c=r[e]??"";if(!c.trim())continue;const a=c.match(/^\s*-\s+(.*)$/);if(!a)break;const s=a[1];s&&t.push(s.trim())}return{items:t,nextIndex:e}}function _(r){const n=r.replace(/\r\n/g,`
`);if(!n.startsWith(`---
`))return{data:{},body:n.trim()};const t=n.indexOf(`
---`,4);if(t===-1)return{data:{},body:n.trim()};const e=n.slice(4,t).trimEnd(),c=n.slice(t+4),a={},s=e.split(`
`);for(let i=0;i<s.length;i++){const p=s[i]??"";if(!p.trim())continue;const d=p.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);if(!d)continue;const m=d[1],b=d[2]??"";if(!m)continue;if(b){a[m]=b.trim();continue}const{items:u,nextIndex:f}=W(s,i+1);u.length?(a[m]=u,i=f-1):a[m]=""}return{data:a,body:c.replace(/^\n+/,"").trim()}}function B(r){const t=r.replace(/\r\n/g,`
`).trim().split(`
`),e=[];for(const c of t){const i=c.trim().match(/^-\s+(.*)$/)?.[1];i&&e.push(i.trim())}return e}function o(r){return typeof r=="string"?r:""}function l(r){return Array.isArray(r)?r.filter(n=>typeof n=="string"):[]}function g(r){return Object.entries(r).map(([n,t])=>({path:n,raw:t})).sort((n,t)=>n.path.localeCompare(t.path,"zh-Hans-CN"))}const Z=Object.assign({"../content/metaTiles/01-poke.md":v,"../content/metaTiles/02-front.md":k,"../content/metaTiles/03-engage.md":y}),q=Object.assign({"../content/champions/01-lux.md":w,"../content/champions/02-sion.md":x,"../content/champions/03-katarina.md":M,"../content/champions/04-ezreal.md":O,"../content/champions/05-seraphine.md":S,"../content/champions/06-swain.md":j}),D=Object.assign({"../content/items/01-antiheal.md":z,"../content/items/02-demolish.md":A,"../content/items/03-vision.md":E,"../content/items/04-warmog.md":H,"../content/items/05-seraph.md":T}),G=Object.assign({"../content/playbook/01-level3.md":C,"../content/playbook/02-cannon.md":L,"../content/playbook/03-deathTimer.md":$,"../content/playbook/04-syncShop.md":F,"../content/playbook/05-augments.md":I,"../content/playbook/06-portals.md":Q,"../content/playbook/07-forge.md":R,"../content/playbook/08-kingme.md":K}),J=Object.assign({"../content/hextech.md":N}),U=Object.assign({"../content/tips.md":P});function h(r){const n=Object.keys(r).sort((t,e)=>t.localeCompare(e,"zh-Hans-CN"))[0];return n?r[n]??"":""}g(Z).map(({raw:r})=>{const{data:n}=_(r);return{title:o(n.title),blurb:o(n.blurb),picks:l(n.picks),tip:o(n.tip)}});h(J);function V(r){return(r.split("/").pop()??"").replace(/\.md$/i,"").replace(/^\d+-/,"")}const X=g(q).map(({path:r,raw:n})=>{const{data:t}=_(n);return{slug:V(r),name:o(t.name),role:o(t.role),avatar:o(t.avatar)||void 0,build:l(t.build),micro:l(t.micro),warning:o(t.warning)}}),Y=(()=>{const r={};for(const n of X)n.slug&&(r[n.slug]=n);return r})();g(D).map(({raw:r})=>{const{data:n}=_(r);return{name:o(n.name),tags:l(n.tags),bullets:l(n.bullets)}});g(G).map(({raw:r})=>{const{data:n,body:t}=_(r),e=o(n.body);return{title:o(n.title),body:(e||t).replace(/\s+/g," ").trim()}});(()=>{const r=h(U);return r?B(r):[]})();const nn={poke:"消耗",frontline:"前排",assassin:"刺客",enchanter:"增益",mage:"战斗法师"};export{Y as a,X as c,nn as r};
