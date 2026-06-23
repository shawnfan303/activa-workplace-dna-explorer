# ACTIVA Workplace DNA Explorer

Next.js + TypeScript + Tailwind CSS prototype for exploring workplace DNA profiles and matching ACTIVA workplace scenes.

## AURORA Case Match Engine

此專案也包含 `AURORA Case Match Engine｜公開案例匹配器`，入口為：

```text
/case-match
```

專案目的：協助震旦家具／大震設計營業與行銷同仁，根據產業、專案情境、空間需求、痛點、解決方案主題、工作模式與主要溝通對象，從公開案例資料中產生 Top 5 案例推薦與一份可輸出 PDF 的案例匹配摘要。

目前案例資料位於：

```text
data/cases.json
data/tags.json
lib/matching.ts
lib/briefGenerator.ts
app/case-match/page.tsx
```

注意：`data/cases.json` 目前為 sample data。案例名稱、產業分類與來源 URL 僅取自公開來源：

- `https://www.aurora.com.tw/of/case`
- `https://aid.aurora.com.tw/interior`
- `https://aid.aurora.com.tw/furniture`

其他標籤、摘要與話術為示範用保守分類。大震設計頁面目前以公開分類與前端動態資料呈現，若要拆成個別客戶案例，正式上線前需由人工依公開頁面逐筆審核。

## Scripts

```bash
pnpm install
pnpm run dev
pnpm run build
```

## Deployment

This project is configured for GitHub Pages through `.github/workflows/deploy-pages.yml`.

After pushing to `main`, GitHub Actions builds a static export and publishes it to:

```text
https://shawnfan303.github.io/activa-workplace-dna-explorer/
```

## Data

The first version uses local scene data at `data/workplace-scenes.json`. Questionnaire answers are stored in `localStorage`.

## 新增公開案例方式

1. 只使用已公開於震旦家具或大震設計網站的案例資料。
2. 在 `data/cases.json` 新增一筆案例，保留 `source_url`、`source_type` 與 `last_reviewed`。
3. 若公開頁沒有明確資訊，請使用保守標籤，並在 `summary` 標註需要人工覆核。
4. 不得加入客戶窗口姓名、電話、Email、報價、毛利、成交率、CRM 狀態、設計圖、施工圖、合約或未公開專案內容。
5. 新增後執行 `pnpm run build` 確認靜態輸出可通過。

## 資料安全原則

- 本工具僅根據公開資料進行案例匹配與初步建議。
- 不儲存姓名、電話、Email、公司名稱或任何個資。
- 不使用 API Key、後端資料庫或追蹤工具。
- 不宣稱案例一定適合客戶，只使用「建議參考」、「可借鏡」、「適合初步討論」等保守語氣。
- 不自動生成未公開的成果數據、減碳量、財務效益或投資報酬率。
- 正式規劃仍需由震旦家具／大震設計專人依實際需求評估。

## 未來擴充方向

1. 串接公開官網案例爬取流程，但需人工審核後才能進入正式資料庫。
2. 增加案例標籤管理後台，但僅限本地或內部環境。
3. 增加展廳參觀動線推薦。
4. 增加 ESG 採購問答模組。
5. 增加產品分類推薦。
6. 增加案例一頁式簡報輸出。
7. 增加多語系版本。
8. 增加與 Workplace DNA 工具的結果串接。
9. 增加與輿情監測系統的趨勢標籤串接。
10. 增加「管理層案例資產成熟度儀表板」。

## Scene Image Preview

Optimized ACTIVA scene images are stored in `public/images/scenes/`.

Open the static preview page:

```text
public/scene-preview.html
```

Regenerate optimized scene images and preview HTML:

```bash
python scripts/optimize_scene_images.py
```
