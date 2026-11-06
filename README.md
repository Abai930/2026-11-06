# Three.js 星際漫遊

一個不需建置工具的互動式 Three.js 3D 星空頁面。

## 執行

以本機靜態伺服器開啟（ES Modules 通常不支援直接以 `file://` 開啟），例如：

```bash
python -m http.server 8000
```

然後瀏覽 `http://localhost:8000`。需要網路連線以載入 Three.js CDN 模組。

## 操作

- 拖曳畫面旋轉視角
- 滾動滑鼠縮放
- 點擊畫面觸發星球共鳴效果
