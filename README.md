# Hextech ARAM Wiki

静态、零依赖的 ARAM 速查百科。页面位于 `index.html`，配合精简的 `styles.css` 与 `script.js` 完成样式和数据。

## 本地运行

```bash
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

你也可以直接双击浏览器打开 `index.html`，所有资源都是相对路径。

## 编辑内容
- 英雄卡片、版本热点、出装提示以及作战手册数据都存放在 `script.js` 的数组中。
- 样式修改集中在 `styles.css`，渐变与颜色变量位于文件顶部。
- 页面完全基于原生 HTML/JS/CSS，保持轻量以便快速加载。
