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

## Google 登入設定

此靜態 GitHub Pages 範例使用 Google Identity Services。正式啟用前：

1. 在 Google Cloud Console 建立 OAuth 2.0 **Web application** 用戶端 ID，並設定已授權的 JavaScript 來源為 `https://abai930.github.io`（本機測試另加 `http://localhost:8000`）。
2. 把用戶端 ID 填入 `index.html` 的 `google-client-id` meta 標籤，取代 `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`。
3. 提交並推送後，重新載入網站；Google 按鈕會顯示並可進行登入。

目前前端只讀取 Google 簽發的 ID token，在本分頁 session 顯示登入者名稱及 email；**不代表後端已驗證身分**，也不提供伺服器端授權或資料保護。若要保護 API、儲存帳戶資料或管理權限，需要後端驗證 ID token。登出只清除此分頁的登入顯示狀態。