# Tea & Me

A Hugo static site about Chinese tea for amateur tea lovers, using the [hugo-paper](https://github.com/nanxiaobei/hugo-paper) theme (loaded as a module).

## Features

- **Sections**: The Artisan’s Studio, The Tasting Room, and All Topics (tags)
- **Content**: Tea categories and varieties, production (harvest, techniques, producers, terroir), teaware, US tea shop samples, tea cuisine, and client-side search
- **Theme**: Hugo Paper with custom layouts and `assets/custom.css`

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/) (extended version recommended)

### Running the site

```bash
hugo server --buildDrafts
```

Open `http://localhost:1313`.

### Building for production

```bash
hugo --buildDrafts
```

Output is in `public/`. For production SEO (canonical, OG, schema), use:

```bash
hugo --environment production
```

## Site structure

- **`content/`** – All content (page bundles with `_index.md`)
  - `_index.md` – Homepage
  - `artisan-studio/` – The Artisan’s Studio
  - `tasting-room/` – The Tasting Room
  - `tea-categories/` – Green, white, yellow, oolong, red, black, Japanese green, English tea culture
  - `tea-varieties/` – Varieties by category (e.g. longjing, tieguanyin, dianhong, sheng-pu-erh)
  - `tea-production/` – Harvest, techniques, Dancong/Pu-erh producers, Pu-erh mountains
  - `teaware/` – Gai-wan, tea pot, zi-sha
  - `tea-shop/us-shops/` – US shops and sample reviews (e.g. White2Tea, Verdant Tea, Yunnan Sourcing)
  - `tea-cuisine/` – Tea in food (e.g. Longjing shrimp, tea egg, tea-smoked duck, matcha desserts)
  - `search/` – Search page (client-side, powered by `/index.json`)
- **`layouts/`** – Templates, shortcodes (`img`, `media-split`, `sample-grid`), partials
- **`assets/`** – Site CSS (e.g. `custom.css`)
- **`static/`** – Static assets (JS, images) copied as-is
- **`hugo.toml`** – Site config (base URL, menu, params, theme module, outputs)

Do **not** edit `public/` or `resources/_gen/`; they are generated.

## Configuration

- **Base URL**: `https://teaandme.com/`
- **Theme**: `github.com/nanxiaobei/hugo-paper` (Hugo module)
- **Outputs**: HTML, RSS, JSON (for search index)
- **Menu**: Artisan’s Studio, Tasting Room, All Topics (see `[menu]` in `hugo.toml`)

For detailed conventions (front matter, images, shortcodes, search, SEO), see `.cursor/skills/project-overview/SKILL.md`.

## Theme documentation

https://github.com/nanxiaobei/hugo-paper
