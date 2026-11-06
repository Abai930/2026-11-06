# Three.js 星際漫遊

一個不需建置工具的互動式 Three.js 3D 星空頁面。

## 執行

以本機靜態伺服器開啟（ES Modules 通常不支援直接以 `file://` 開啟），例如：

```bash
python -m http.server 8000
```

然後瀏覽 `http://localhost:8000`。Three.js 與 OrbitControls 已隨專案提供於 `vendor/`，只需網路載入 Google Fonts。

## 操作

- 拖曳畫面旋轉視角
- 滾動滑鼠縮放
- 點擊畫面觸發星球共鳴效果

## 線上瀏覽（GitHub Pages）

目前可使用 GitHub Pages 將此單頁網站發佈為公開網頁：在 GitHub 專案的 **Settings → Pages**，將 **Source** 設為 **Deploy from a branch**，選擇 **main** 分支及 **/(root)** 後儲存。部署完成後可透過 `https://abai930.github.io/2026-11-06/` 開啟。
