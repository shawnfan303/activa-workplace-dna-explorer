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

## Aurora Product & Scene Recommender

此專案新增 `Aurora Product & Scene Recommender｜震旦家具產品風格／場景推薦器`，入口為：

```text
/product-scene-recommender
```

### 專案目的

協助震旦家具／大震設計的營業、行銷、設計顧問或潛在企業客戶，依據空間類型、使用者角色、工作模式、風格偏好、痛點、解決方案主題、產業與專案情境，產生產品分類、辦公場景與大震設計服務方向的初步推薦。

此工具不是報價系統、電商選品工具或 CRM 工具；它只用於拜訪前準備、展廳參觀前討論與初步提案方向整理。

### 使用情境

- 營業拜訪前，快速整理可討論的產品分類與場景方向。
- 行銷人員規劃公開內容、展廳導覽或社群素材時，建立一致的產品場景語言。
- 設計顧問與客戶初談時，先確認需求焦點，再進入正式規劃。
- 潛在企業客戶在展廳參觀前，先理解可優先體驗的家具與空間場景。

### 資料來源

正式資料只允許來自以下公開網站：

- 震旦家具官網：`https://www.aurora.com.tw/of/`
- 大震設計官網：`https://aid.aurora.com.tw/`

目前示範資料位於：

```text
src/data/products.json
src/data/scenes.json
src/data/solutions.json
src/data/designServices.json
src/data/tags.json
src/data/sourceRegistry.json
```

重要提醒：目前資料為 `SAMPLE_PUBLIC_DATA_PENDING_REVIEW`。正式上線前，需由人工以震旦家具與大震設計官網公開資料替換 sample data，並將 `review_status` 改為 `approved_public` 後才可顯示於正式介面。

### 資料安全原則

- 不要求或儲存姓名、電話、Email、公司名稱、地址、預算或專案金額。
- 不使用 CRM、報價、毛利、成交率、進案狀態、合約、設計圖、施工圖或未公開專案資料。
- 不輸出價格、折扣、交期、庫存、正式規格承諾或未經驗證的效益數據。
- 推薦語氣必須保守，只使用「建議參考」、「可作為初步討論方向」、「適合展廳體驗時優先了解」等文字。
- 每筆資料都必須保留 `source_url`、`source_domain`、`source_type`、`last_crawled`、`review_status`。

### 如何安裝

本專案使用 lockfile 指定的 pnpm：

```bash
pnpm install
```

### 如何啟動

```bash
pnpm run dev
```

瀏覽：

```text
http://localhost:3000/product-scene-recommender
```

### 如何執行資料擷取

```bash
pnpm run ingest
```

此指令會建立 raw placeholder：

```text
data/raw/aurora-furniture/
data/raw/aid/
```

目前腳本是保守 scaffold，不會繞過登入、不抓取表單資料、不使用 API Key，也不抓取其他網域。

### 如何人工審核資料

1. 只從允許網域整理公開頁面資訊。
2. 將資料先放入 raw 或 structured 工作區。
3. 執行：

```bash
pnpm run normalize
pnpm run validate-data
```

4. 人工確認無個資、價格、報價、毛利、成交、未公開資訊或不適合公開推薦的字眼。
5. 只有確認可公開使用的資料，才能將 `review_status` 改為 `approved_public`。
6. 未審核資料維持 `pending_review` 或 `sample_pending_review`；疑似敏感資料需標記為 `blocked`。

### 如何新增產品分類

在 `src/data/products.json` 新增一筆資料，至少包含：

- `id`
- `name`
- `parent_category`
- `suitable_spaces`
- `suitable_work_modes`
- `suitable_users`
- `solution_themes`
- `style_tags`
- `pain_points`
- `recommendation_logic`
- `source_url`
- `review_status`

新增後執行：

```bash
pnpm run validate-data
pnpm run build
```

### 如何新增場景資料

在 `src/data/scenes.json` 新增一筆資料，至少包含：

- `name`
- `description`
- `suitable_products`
- `suitable_work_modes`
- `solution_themes`
- `style_tags`
- `pain_points`
- `design_guidance`
- `source_url`
- `review_status`

### 如何新增大震設計服務資料

在 `src/data/designServices.json` 新增一筆資料，至少包含：

- `name`
- `description`
- `suitable_scenarios`
- `related_spaces`
- `related_solution_themes`
- `recommendation_logic`
- `source_url`
- `review_status`

### 如何部署到 GitHub Pages / Vercel / Netlify

GitHub Pages 仍使用既有 `.github/workflows/deploy-pages.yml` 靜態輸出流程。Vercel 或 Netlify 可直接使用 Next.js build：

```bash
pnpm run build
```

若部署為正式公開版本，請先完成資料人工審核，並確認正式顯示資料皆為 `approved_public`。

## 未來擴充方向

1. 與 Aurora Case Match Engine 串接，讓產品推薦可同時推薦公開案例。
2. 與 Workplace DNA 工具串接，將 DNA 測驗結果自動帶入產品與場景推薦。
3. 增加展廳動線推薦器。
4. 增加 ESG 採購問答模組。
5. 增加一頁式簡報輸出。
6. 增加產品比較卡，但仍不顯示價格。
7. 增加多語系版本。
8. 增加管理層可用的公開內容覆蓋率儀表板。
9. 增加人工標籤管理後台，但僅限內部或本地環境。
10. 增加官網公開資料更新檢查器。
11. 串接公開官網案例爬取流程，但需人工審核後才能進入正式資料庫。
12. 增加案例標籤管理後台，但僅限本地或內部環境。
13. 增加與輿情監測系統的趨勢標籤串接。
14. 增加「管理層案例資產成熟度儀表板」。

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

## Aurora Discovery Assistant

此專案新增 `Aurora Discovery Assistant｜企業辦公需求探索器`，入口為：

```text
/discovery-assistant
```

### 專案定位

公開資料驅動的 B2B 顧問式銷售問診助手。工具協助營業、行銷、設計顧問或潛在企業客戶，在案件前期拜訪前，依據產業、專案情境、對話窗口、空間需求、痛點、解決方案主題與工作模式，產生問診腳本、角色化問題、追問邏輯、初步解方、展廳參觀建議與拜訪摘要。

此工具不是 CRM、報價系統、客戶資料庫或正式規劃工具。

### 使用情境

- 營業拜訪前快速建立專業問診架構。
- 新人營業建立標準化訪談邏輯。
- 資深營業依決策、總務、人資、ESG、採購、財務、IT 與使用單位切換問法。
- 展廳參觀前整理必看場景與討論問題。
- 後續串接 Workplace DNA、Product & Scene Recommender 與 Case Match Engine。

### 資料來源

正式資料只允許來自：

- 震旦家具官網：`https://www.aurora.com.tw/of/`
- 大震設計官網：`https://aid.aurora.com.tw/`

目前資料為 `SAMPLE_PUBLIC_DATA_PENDING_REVIEW`，位於：

```text
src/data/discoveryQuestions.json
src/data/stakeholderPlaybooks.json
src/data/solutionMapping.json
src/data/followUpLogic.json
src/data/exhibitionAdvice.json
src/data/publicSources.json
src/data/tags.discovery.json
```

正式上線前，需由人工以震旦家具與大震設計官網公開資料替換 sample data，並將 `review_status` 改為 `approved_public` 後才可顯示於正式介面。

### 資料安全原則

此工具不儲存個資、不處理報價、不連接 CRM、不紀錄客戶名稱、不追蹤個別使用者。不得輸入或顯示姓名、公司名稱、電話、Email、地址、預算、報價、折扣、毛利、成交率、設計圖、合約、CRM 資料、未公開案例或任何內部專案資料。

敏感資料檢查位於：

```text
src/lib/sensitiveDataGuard.ts
```

若偵測到疑似個資、地址、價格、金額或禁用詞，前端會阻擋摘要輸出並顯示警示。

### 如何安裝與啟動

本專案使用 lockfile 指定的 pnpm：

```bash
pnpm install
pnpm run dev
```

瀏覽：

```text
http://localhost:3000/discovery-assistant
```

### 如何新增問診題

在 `src/data/discoveryQuestions.json` 新增資料，需包含題目、題型、適用 stakeholder、產業、情境、痛點、解方、目的、追問、來源 URL 與 `review_status`。未完成公開資料人工審核前，請維持 `sample_pending_review`。

### 如何新增角色化 Playbook

在 `src/data/stakeholderPlaybooks.json` 新增角色，至少包含 `primary_concerns`、`opening_angle`、`recommended_questions`、`avoid_topics`、`solution_angle` 與 `tone`。

### 如何新增追問邏輯

在 `src/data/followUpLogic.json` 新增 `trigger_need`、`risk`、`suggested_follow_ups` 與 `related_solution_themes`，用於把表面需求拉回工作情境與顧問式需求探索。

### 如何新增解方對應

在 `src/data/solutionMapping.json` 新增痛點與解方對應，需保留 `source_url` 與 `review_status`。不得加入未公開產品規格、價格或客戶資訊。

### 計數器功能與隱私保護

計數器核心位於：

```text
src/lib/counterEngine.ts
```

包含條件選擇、問診題數、角色覆蓋、解方對應、追問建議、摘要產出、公開資料安全檢查與完成度。計數器起始值為 `5889`。

本機計數器僅用於 session 或 localStorage 的使用體驗，不得作為跨使用者追蹤、個人識別或行銷再行銷用途。不記錄 IP、裝置資訊、使用者身份、公司名稱、Email、電話或任何可識別資訊。

### 部署

GitHub Pages 仍使用既有靜態輸出流程。Vercel 或 Netlify 可直接執行：

```bash
pnpm run build
```

正式部署前請先完成公開資料人工審核，並確認正式顯示資料皆為 `approved_public`。

### 未來擴充方向

1. 與 Workplace DNA 工具串接。
2. 與 Product & Scene Recommender 串接。
3. 與 Case Match Engine 串接。
4. 增加展廳導覽路線推薦。
5. 增加 ESG 採購問答模組。
6. 增加一頁式拜訪簡報輸出。
7. 增加內部訓練版營業問診模擬器。
8. 增加管理層案件前期需求趨勢儀表板，但僅使用匿名化統計。
9. 增加公開資料更新檢查器。
10. 增加人工題庫管理介面，但僅限內部或本地環境。
