# 📷 回忆长廊 · Memory Walk

> 一条温暖的时间线，记录你生命中的每一个重要瞬间。

## 是什么？

**回忆长廊** 是一个纯前端的时间线记忆工具。上传一张照片、选一个心情、写几句话——每一条记忆就会变成时间线上的一张卡片，像博物馆展品一样陈列在你的"回忆长廊"里。

## 功能

- 📸 **上传照片** - 用图片定格那一刻
- 😊 **心情标记** - 开心、平静、难过、惊喜……每个记忆都有自己的情绪颜色
- 📜 **时间线浏览** - 按时间顺序滑动浏览，像翻阅一本相册
- ✏️ **编辑/删除** - 随时修改你的记忆
- 🔒 **本地存储** - 数据只存在你的浏览器里，不上传任何服务器
- 📱 **响应式设计** - 手机和电脑都能用

## 技术栈

- **Vite** - 构建工具
- **原生 HTML + CSS + JavaScript** - 零框架，轻量快速
- **localStorage** - 数据持久化
- **GitHub Pages** - 部署

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐，自动部署）

1. 在 GitHub 上新建一个仓库（例如 `memory-walk`）
2. 将项目代码推送到 GitHub：

```bash
git remote add origin https://github.com/你的用户名/memory-walk.git
git branch -M main
git push -u origin main
```

3. 在 GitHub 仓库页面，点击 **Settings** → **Pages**
4. 在 **Source** 中选择 **GitHub Actions**
5. 项目自带的 `.github/workflows/deploy.yml` 会自动构建并部署
6. 等待几分钟，访问 `https://你的用户名.github.io/memory-walk/` 即可

### 方法二：手动部署（无需 Actions）

1. 在 GitHub 新建仓库，推送代码
2. 仓库 Settings → Pages
3. Source 选择 **Deploy from a branch**
4. Branch 选择 `gh-pages` / `/root`
5. 或者本地构建后手动上传 `dist/` 文件夹内容

> **注意**: 数据存储在浏览器 localStorage 中，每个人打开看到的都是自己添加的内容，别人看不到你的数据。

## License

MIT
