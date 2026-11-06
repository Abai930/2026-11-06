# Three.js 星空互動展示

互動式 Three.js 星球與星空場景，含 Firebase Authentication Google 登入介面。

## 目前狀態

網站已部署於 https://abai930.github.io/2026-11-06/ 。Google 登入功能仍需 Firebase 專案設定；尚未提供 Firebase Web App 設定值時，登入按鈕會顯示尚待設定提示。

## 啟用 Firebase Google 登入

1. 在 Firebase Console 建立 Firebase 專案與 Web App。
2. 前往 **Authentication → Sign-in method**，啟用 Google provider。
3. 在 **Authentication → Settings → Authorized domains** 加入 `abai930.github.io`。本機測試需另加 `localhost`。
4. 把 `.firebase/firebase-config.example.js` 複製為 `.firebase/firebase-config.js`，填入 Firebase Web App 的 `apiKey`、`authDomain`、`projectId`、`appId`。
5. 提交並推送 `.firebase/firebase-config.js`，讓 GitHub Pages 從 `main` 發佈時能取得設定檔。

Firebase Web app config 不是伺服器密碼；請勿公開 service-account key。登入驗證不會自動保護資料或 API，資料存取仍須以 Firebase Security Rules 或伺服器端驗證保護。

## 本機預覽

以靜態伺服器開啟，避免直接使用 `file://`：

```bash
python -m http.server 8000
```

接著瀏覽 `http://localhost:8000/`。
