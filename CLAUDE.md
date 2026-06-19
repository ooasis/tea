# CLAUDE.md — Tea & Me

A Hugo static site about Chinese tea for amateur tea lovers (`teaandme.com`), using the [hugo-paper](https://github.com/nanxiaobei/hugo-paper) theme as a Hugo module.

## Quick reference

```bash
hugo server --buildDrafts     # Dev server at http://localhost:1313
hugo --environment production # Production build → public/
```

## Source of truth vs generated output

**Edit these (source of truth):**
- `content/**` — Markdown + page bundles
- `layouts/**` — templates, shortcodes, partials
- `assets/**` — site CSS (`assets/custom.css`)
- `static/**` — static assets (JS, images) copied as-is
- `hugo.toml` — site configuration

**Never edit (generated):**
- `public/` — build output
- `resources/_gen/` — Hugo image pipeline cache

**Theme:** prefer `layouts/**` overrides and `assets/custom.css` over editing `themes/paper/**`.

## Content conventions

### Page bundles

Every page is a Hugo page bundle: a directory containing `_index.md` plus optional images and `_ai.prompt`.

```
content/tea-varieties/green/longjing/
├── _index.md        # Content
├── _ai.prompt       # Image generation prompts
├── longjing-1.png   # Images (named {slug}-N.ext)
└── longjing-2.png
```

### Front matter (YAML)

```yaml
---
draft: false

title: "Article Title (Chinese Name 中文名)"
tags: [tag1, tag2, tag3]
date: 'YYYY-MM-DDTHH:MM:SS-08:00'
---
```

- Always `draft: false` for published content
- Tags: lowercase, kebab-case, 3-5 tags
- Update `date` when modifying a page

### Content structure

- Start at `##` (page title comes from front matter)
- Use `---` dividers between major sections
- `##` for main sections, `###` for subsections

### Image shortcodes

```markdown
{{< img src="slug-1.png" w="1200x" alt="Descriptive alt text" >}}

{{< media-split src="slug-1.jpg" w="900x" alt="Alt text" >}}
Text content alongside image
{{< /media-split >}}
```

Images go in the same directory as `_index.md`, named `{slug}-1.png`, `{slug}-2.png`, etc.

### Tag taxonomy

- **Tea types:** `green-tea`, `oolong`, `red-tea`, `white-tea`, `yellow-tea`, `dark-tea`
- **Topics:** `culture`, `brewing`, `buying-guide`, `grading`, `processing`, `harvest`
- **Regions:** `zhejiang`, `fujian`, `yunnan`, `guangdong`, `anhui`, `sichuan`, `taiwan`, `hunan`, `henan`, `jiangsu`, `guangxi`
- **Other:** `vendors`, `teaware`

## Content sections

| Section | Path | Description |
|---|---|---|
| Tea Categories | `content/tea-categories/` | Green, white, yellow, oolong, red, dark |
| Tea Varieties | `content/tea-varieties/{category}/{variety}/` | Individual varieties |
| Tea Production | `content/tea-production/` | Harvest, techniques, producers, terroir |
| Teaware | `content/teaware/` | Gai-wan, tea pots, zi-sha |
| Tea Shops | `content/tea-shop/us-shops/` | US shops and sample reviews |
| Tea Cuisine | `content/tea-cuisine/` | Tea in food (recipes) |
| Search | `content/search/` | Client-side search page |

## Layouts

- `layouts/baseof.html` — base template
- `layouts/home.html` — homepage
- `layouts/_default/single.html` — single page
- `layouts/_shortcodes/` — `img`, `media-split`, `sample-grid`
- `layouts/partials/` — `head.html`, `header.html`, `logo.html`, `page-tags.html`
- `layouts/index.json.json` — search index generator

## Search

Client-side search via Hugo JSON index (`/index.json`) + `static/js/search.js`. Set `search: false` in front matter to exclude a page.

## Content creation workflow

The project has a 3-stage content pipeline (see `.cursor/skills/` for full details):

1. **Topic Proposer** — rough idea → 3 structured blog proposals
2. **Blog Writer** — selected idea → 3 complete drafts (500-1000 words)
3. **Blog Illustrator** — selected draft → 1-2 `_ai.prompt` image prompts

### `_ai.prompt` format

```
# image 1
Style: Chinese Ink Wash (Sumi-e)
Aspect Ratio: 16:9
[Detailed prompt description]
```

Common styles: Chinese Ink Wash (Sumi-e), Digital Illustration, Photography, Watercolor.

## Writing style

- **Tone:** informational, structured, practical
- **Voice:** accessible to amateurs, not academic
- **Focus:** actionable advice, comparison tables, buying guides, quality identification
- Weave in history/culture naturally without making it the sole focus
