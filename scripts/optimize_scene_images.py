from __future__ import annotations

import html
import json
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


PROJECT_ROOT = Path.cwd()
SOURCE_ROOT = Path("C:/Users/shawn/OneDrive/圖片/螢幕擷取畫面")
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "scenes"
PREVIEW_PATH = PROJECT_ROOT / "public" / "scene-preview.html"
SCENES_PATH = PROJECT_ROOT / "data" / "workplace-scenes.json"

IMAGE_SOURCES = [
    ("F01", "專注模式—思考.png"),
    ("F02", "專注模式—思考-2.png"),
    ("F03", "專注模式—辦公(靈活預約辦公區).png"),
    ("F04", "專注模式—電話視訊.png"),
    ("F05", "螢幕擷取畫面 2026-06-17 222544.png"),
    ("C01", "螢幕擷取畫面 2026-06-17 222619.png"),
    ("C02", "螢幕擷取畫面 2026-06-17 222631.png"),
    ("C03", "螢幕擷取畫面 2026-06-17 222637.png"),
    ("C04", "螢幕擷取畫面 2026-06-17 222646.png"),
    ("C05", "螢幕擷取畫面 2026-06-17 222652.png"),
    ("C06", "螢幕擷取畫面 2026-06-17 222659.png"),
    ("C07", "螢幕擷取畫面 2026-06-17 222705.png"),
    ("C08", "螢幕擷取畫面 2026-06-17 222712.png"),
    ("C09", "螢幕擷取畫面 2026-06-17 222718.png"),
    ("C10", "螢幕擷取畫面 2026-06-17 222732.png"),
    ("P01", "螢幕擷取畫面 2026-06-17 222739.png"),
    ("P02", "螢幕擷取畫面 2026-06-17 222752.png"),
    ("P03", "螢幕擷取畫面 2026-06-17 222746.png"),
    ("L01", "螢幕擷取畫面 2026-06-17 222814.png"),
    ("L02", "螢幕擷取畫面 2026-06-17 222820.png"),
    ("L03", "螢幕擷取畫面 2026-06-17 222827.png"),
    ("S01", "螢幕擷取畫面 2026-06-17 222842.png"),
    ("S02", "螢幕擷取畫面 2026-06-17 222849.png"),
    ("S03", "螢幕擷取畫面 2026-06-17 222856.png"),
    ("R01", "螢幕擷取畫面 2026-06-17 222912.png"),
    ("R02", "螢幕擷取畫面 2026-06-17 222920.png"),
    ("R03", "螢幕擷取畫面 2026-06-17 222926.png"),
]

MODE_LABELS = {
    "focus": "專注模式",
    "collaboration": "協作模式",
    "project": "項目共創",
    "learning": "學習模式",
    "social": "社交模式",
    "relax": "放鬆模式",
}


def e(value: object) -> str:
    return html.escape(str(value), quote=True)


def optimize_images() -> list[dict[str, object]]:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    outputs: list[dict[str, object]] = []

    for scene_id, filename in IMAGE_SOURCES:
        source = SOURCE_ROOT / filename
        output = OUTPUT_DIR / f"{scene_id}.webp"

        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            if image.width > 1440:
                ratio = 1440 / image.width
                image = image.resize((1440, round(image.height * ratio)), Image.Resampling.LANCZOS)

            image = ImageOps.autocontrast(image, cutoff=0.15)
            image = ImageEnhance.Contrast(image).enhance(1.04)
            image = ImageEnhance.Color(image).enhance(1.03)
            image = ImageEnhance.Sharpness(image).enhance(1.18)
            image = image.filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=3))
            image.save(output, "WEBP", quality=92, method=6)

        outputs.append(
            {
                "id": scene_id,
                "source": filename,
                "source_kb": round(source.stat().st_size / 1024),
                "output": output.name,
                "output_kb": round(output.stat().st_size / 1024),
            }
        )

    return outputs


def build_preview(outputs: list[dict[str, object]]) -> None:
    scenes = json.loads(SCENES_PATH.read_text(encoding="utf-8"))
    output_ids = {item["id"] for item in outputs}
    cards = []

    for scene in scenes:
        if scene["id"] not in output_ids:
            continue

        needs = "".join(f"<li>{e(item)}</li>" for item in scene["needs"][:3])
        features = "".join(f"<li>{e(item)}</li>" for item in scene["features"][:3])
        recommended_for = "／".join(scene["recommendedFor"][:2])

        cards.append(
            f"""
        <article class="card">
          <div class="image-wrap">
            <img src="./images/scenes/{e(scene['id'])}.webp" alt="{e(scene['title'])}" loading="lazy" />
          </div>
          <div class="content">
            <div class="meta">
              <span>{e(scene['id'])}</span>
              <span>{e(MODE_LABELS.get(scene['mode'], scene['mode']))}</span>
              <span>{e(scene['people'])}</span>
            </div>
            <h2>{e(scene['title'])}</h2>
            <p class="reason">{e(recommended_for)}</p>
            <div class="cols">
              <section>
                <h3>需求</h3>
                <ul>{needs}</ul>
              </section>
              <section>
                <h3>特點</h3>
                <ul>{features}</ul>
              </section>
            </div>
          </div>
        </article>
            """
        )

    preview_html = f"""<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ACTIVA Workplace DNA Scene Image Preview</title>
    <style>
      :root {{
        --red: #c8102e;
        --ink: #202124;
        --graphite: #4b5563;
        --line: #e5e7eb;
        --soft: #f7f7f8;
      }}
      * {{ box-sizing: border-box; }}
      body {{
        margin: 0;
        background: #fff;
        color: var(--ink);
        font-family: Arial, "Noto Sans TC", "Microsoft JhengHei", sans-serif;
      }}
      header {{
        border-bottom: 1px solid var(--line);
        padding: 32px 28px;
      }}
      main {{
        margin: 0 auto;
        max-width: 1280px;
        padding: 28px;
      }}
      .eyebrow {{
        color: var(--red);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
      }}
      h1 {{
        margin: 10px 0 0;
        font-size: 34px;
        line-height: 1.2;
      }}
      .summary {{
        margin-top: 12px;
        color: var(--graphite);
        line-height: 1.7;
      }}
      .grid {{
        display: grid;
        gap: 22px;
      }}
      .card {{
        display: grid;
        grid-template-columns: minmax(360px, 0.92fr) 1fr;
        border: 1px solid var(--line);
        background: #fff;
      }}
      .image-wrap {{
        background: var(--soft);
        border-right: 1px solid var(--line);
      }}
      img {{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }}
      .content {{
        padding: 24px;
      }}
      .meta {{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }}
      .meta span {{
        border: 1px solid var(--line);
        color: var(--graphite);
        font-size: 12px;
        padding: 5px 9px;
      }}
      h2 {{
        margin: 16px 0 0;
        font-size: 24px;
        line-height: 1.35;
      }}
      .reason {{
        margin: 12px 0 0;
        border-left: 4px solid var(--red);
        background: var(--soft);
        padding: 12px 14px;
        color: var(--ink);
        line-height: 1.6;
      }}
      .cols {{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        margin-top: 18px;
      }}
      h3 {{
        margin: 0;
        font-size: 14px;
      }}
      ul {{
        margin: 8px 0 0;
        padding-left: 18px;
        color: var(--graphite);
        font-size: 14px;
        line-height: 1.7;
      }}
      @media (max-width: 900px) {{
        .card,
        .cols {{
          grid-template-columns: 1fr;
        }}
        .image-wrap {{
          border-right: 0;
          border-bottom: 1px solid var(--line);
        }}
      }}
    </style>
  </head>
  <body>
    <header>
      <p class="eyebrow">ACTIVA Workplace DNA Explorer</p>
      <h1>27 張辦公場景圖片優化預覽</h1>
      <p class="summary">本頁使用優化後 WebP 圖片，對照場景 ID、模式、需求與特點，供上線前快速檢查圖片品質與資料對應。</p>
    </header>
    <main>
      <section class="grid">
        {''.join(cards)}
      </section>
    </main>
  </body>
</html>"""

    PREVIEW_PATH.write_text(preview_html, encoding="utf-8")


def main() -> None:
    outputs = optimize_images()
    build_preview(outputs)
    print("id,source_kb,output_kb,file")
    for item in outputs:
        print(f"{item['id']},{item['source_kb']},{item['output_kb']},{item['output']}")


if __name__ == "__main__":
    main()
