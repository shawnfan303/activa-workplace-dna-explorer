# Workplace DNA 共用使用人次設定

目標：讓首頁顯示「已使用：3898人次」，並在任何使用者完成一次問卷後，全站共用累計 +1。

## 1. 建立 Google Sheet

建立一份私有 Google 試算表，作為使用人次資料來源。試算表不需要公開。

## 2. 建立 Google Apps Script

在 Google Apps Script 新專案中貼上：

```text
docs/usage-counter-apps-script.js
```

接著到 Apps Script 專案設定，新增 Script Property：

```text
SPREADSHEET_ID = 你的 Google Sheet ID
```

## 3. 發布 Web App

部署為 Web App：

```text
Execute as: Me
Who has access: Anyone
```

取得 Web App URL，例如：

```text
https://script.google.com/macros/s/xxxx/exec
```

## 4. 設定 GitHub Pages 變數

到 GitHub repository：

```text
Settings -> Secrets and variables -> Actions -> Variables
```

新增 Repository variable：

```text
USAGE_COUNTER_ENDPOINT = 你的 Apps Script Web App URL
```

## 5. 重新部署

推送 main branch 或手動執行 GitHub Actions。

完成後：

- 首頁會讀取 Google Sheet 的共用數字。
- 問卷完成一次會呼叫 Apps Script，讓 Google Sheet 中的 count +1。
- 不會消耗 OpenAI token。
