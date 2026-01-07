# Hextech ARAM Wiki

这个仓库支持「Nuxt 静态生成」模式（接近 https://csff-db.uuppi.com/ 这类站点的技术形态：框架化、路由化、可生成静态资源部署）。

## 前置要求

- 安装 Node.js（推荐 LTS 版本，需包含 npm）

## 本地运行（Nuxt）

```bash
npm install
npm run dev
```

启动后访问终端输出的本地地址（通常是 `http://localhost:3000`）。

Windows PowerShell 如果提示 `npm.ps1` 被禁止运行：

- 推荐（仅当前用户）：`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- 或者临时用：`npm.cmd ...`

## 静态构建（用于部署）

```bash
npm run generate
```

Nuxt 会生成纯静态站点文件，默认输出在 `.output/public/`（将该目录部署到任意静态托管即可）。

你也可以用：

```bash
npm run preview
```

来在本地预览构建产物。

## 编辑内容（Nuxt 版本）

- 内容主要放在 [content/](content/) 的 Markdown 文件中（推荐直接新增/编辑这些文件）
	- 模式文章：`content/hextech.md`
	- 小贴士：`content/tips.md`（`- ` 列表）
	- 版本速览：`content/metaTiles/*.md`
	- 英雄卡片：`content/champions/*.md`
	- 出装转向：`content/items/*.md`
	- 作战手册：`content/playbook/*.md`
- 数据加载与解析在 [data/wikiData.ts](data/wikiData.ts) 与 [utils/frontmatter.ts](utils/frontmatter.ts)
- Markdown 简易渲染在 [utils/markdownToHtml.ts](utils/markdownToHtml.ts)
- 页面在 [pages/index.vue](pages/index.vue)
- 全局样式在 [assets/styles.css](assets/styles.css)

### Markdown frontmatter 格式

支持非常轻量的 frontmatter：

```md
---
key: value
list:
	- a
	- b
---
```

（目前只用到字符串、字符串数组；不支持复杂 YAML。）
