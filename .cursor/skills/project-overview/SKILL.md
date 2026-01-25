---
name: project-overview
description: General project structure, conventions, and Hugo guidelines for the Tea & Me static site, including content authoring, images, templates, search, SEO, and development workflows.
---

# Tea & Me Project Overview

## Role

You are an AI assistant working on the **Tea & Me** Hugo static site (`teaandme.com`). This document provides essential context about the project structure, conventions, and workflows to help you work effectively with this codebase.

## Project Context

**Tea & Me** is a Hugo static site targeting **amateur tea lovers** who want to gain more knowledge about Chinese tea tasting. The site covers:

- **Tea Categories**: Green, White, Yellow, Oolong, Red, Black/Dark tea
- **Tea Varieties**: Famous varieties within each category (e.g., Longjing, Tieguanyin, Pu-erh)
- **Tea Production**: Harvest timing, processing techniques, terroir, producers
- **Teaware**: Gai-wan, tea pots, zi-sha pots
- **Tea Shops**: Where to buy online

## Site Structure

### Content Organization

The site uses **Hugo page bundles** (directories with `_index.md` files):

```
content/
├── _index.md                    # Homepage
├── artisan-studio/              # The Artisan's Studio section
│   └── _index.md
├── tasting-room/                # The Tasting Room section
│   └── _index.md
├── tea-categories/              # Major tea categories
│   ├── _index.md
│   ├── green/
│   │   └── _index.md
│   └── ...
├── tea-varieties/               # Individual tea varieties
│   ├── _index.md
│   ├── green/
│   │   ├── longjing/
│   │   │   ├── _index.md
│   │   │   ├── _ai.prompt      # Image generation prompts
│   │   │   └── longjing-1.png  # Images
│   └── ...
├── tea-production/              # Production topics
│   ├── harvest/
│   ├── technics/
│   ├── puerh-mountains/
│   └── ...
├── teaware/                     # Teaware information
├── tea-shop/                    # Shopping guides
└── search/                      # Search page
```

### Key Directories

- **`content/`**: All site content (Markdown files + page bundles)
- **`layouts/`**: Hugo templates and shortcodes
- **`assets/`**: Site CSS (`assets/custom.css`)
- **`static/`**: Static assets (images, JS) copied as-is
- **`themes/paper/`**: Hugo Paper theme (vendored, avoid editing)
- **`public/`**: Generated build output (DO NOT edit manually)
- **`resources/_gen/`**: Hugo image pipeline cache (DO NOT edit manually)

## Content Authoring Conventions

### Front Matter (YAML)

All content files use **YAML front matter** with `---` delimiters:

```yaml
---
draft: false

title: "Article Title (with Chinese name if applicable)"
tags: [tag1, tag2, tag3]
date: 'YYYY-MM-DDTHH:MM:SS-08:00'
---
```

**Front Matter Rules**:
- Always set `draft: false` for published content
- `title`: Use title case, include Chinese name in parentheses if relevant
- `tags`: Array of lowercase, kebab-case tags (typically 3-5 tags)
- `date`: ISO format timestamp with timezone `-08:00`
- When updating a page, update the `date` field to reflect modification time

### Content Structure

1. **Start at `##`**: Page title comes from front matter, so content starts with `##` (not `#`)
2. **Section Dividers**: Use `---` on its own line to separate major sections
3. **Headings**: Use `##` for main sections, `###` for subsections
4. **Lists**: Use bullet points (`*`) or numbered lists as appropriate
5. **Emphasis**: Use `**bold**` for important terms, `*italic*` for emphasis

### Writing Style

- **Tone**: Informational, structured, practical
- **Voice**: Accessible to amateurs, not overly academic
- **Focus**: Practical advice, comparison tables, buying guides, quality identification
- **Cultural Context**: Weave in history and culture naturally, but don't make it the sole focus

### Tag Taxonomy

Use appropriate tags (lowercase, kebab-case):

- **Tea types**: `green-tea`, `oolong`, `red-tea`, `white-tea`, `yellow-tea`, `dark-tea`
- **Topics**: `culture`, `brewing`, `buying-guide`, `grading`, `processing`, `harvest`
- **Geographic regions**: `zhejiang`, `fujian`, `yunnan`, `guangdong`, `anhui`, `sichuan`, `taiwan`, `hunan`, `henan`, `jiangsu`, `guangxi`
- **Other**: `vendors`, `teaware`

## Images and Media

### Image Shortcodes

Use Hugo shortcodes for images:

**Basic image**:
```markdown
{{< img src="image-name.png" w="1200x" alt="Descriptive alt text" >}}
```

**Media split** (for images with text alongside):
```markdown
{{< media-split
  src="image-name.jpg"
  w="900x"
  alt="Descriptive alt text"
>}}
[Text content here]
{{< /media-split >}}
```

**Image Placement**:
- Hero images: Usually placed right after front matter, before first `##` heading
- Supporting images: Placed within relevant sections
- Always include meaningful `alt` text for accessibility

### Image Naming Convention

Images are stored in the same directory as the page's `_index.md`:
- First image: `{slug}-1.png` (or `.jpg`, `.svg`)
- Second image: `{slug}-2.png`
- Where `{slug}` is the page bundle directory name

### Image Generation Prompts

Some pages include `_ai.prompt` files for AI-generated images. Format:

```
# image 1
Style: Chinese Ink Wash (Sumi-e)
Aspect Ratio: 16:9
[Detailed prompt description]
```

## Hugo Shortcodes

### Available Shortcodes

- **`{{< img >}}`**: Image with optional resizing (`w` parameter)
- **`{{< media-split >}}`**: Image with text content alongside
- **`{{< sample-grid >}}`**: Grid layout for samples (if used)

See `layouts/_shortcodes/` for implementation details.

## Templates and Layouts

### Layout Files

- **`layouts/baseof.html`**: Base template
- **`layouts/home.html`**: Homepage template
- **`layouts/_default/single.html`**: Single page template
- **`layouts/_default/list.html`**: List page template
- **`layouts/_default/terms.html`**: Taxonomy/terms page template
- **`layouts/search/list.html`**: Search page template

### Partials

- **`layouts/partials/head.html`**: Head section (SEO, meta tags)
- **`layouts/partials/header.html`**: Site header/navigation
- **`layouts/partials/logo.html`**: Logo component
- **`layouts/partials/page-tags.html`**: Tag display component

### Theme Overrides

- Prefer making changes via `layouts/**` overrides and `assets/custom.css`
- Only modify `themes/paper/**` if explicitly requested or if no override approach exists

## Search Functionality

The site uses **client-side search** powered by a Hugo-generated JSON index:

- Hugo generates `/index.json` via `layouts/index.json.json`
- Search page loads the index and ranks results via `static/js/search.js`
- To exclude a page from search, set front matter: `search: false`
- Keep `description` and summaries clean for SEO and search index

## SEO and Robots

- Tag/taxonomy/pagination pages are marked `noindex,follow` in `layouts/partials/head.html`
- Production SEO tags (canonical/OG/schema/twitter) are enabled when building in production or when `params.env = "production"` (see `hugo.toml`)

## Development Workflow

### Running the Site

```bash
hugo server --buildDrafts
```

Opens at `http://localhost:1313`

### Building for Production

```bash
hugo --buildDrafts
```

Output goes to `public/` directory.

### Creating New Content

1. Create a new page bundle directory: `content/section/topic/`
2. Create `_index.md` with front matter and content
3. Add images to the same directory
4. Optionally create `_ai.prompt` for image generation

## File Editing Guidelines

### ✅ Edit These (Source of Truth)

- `content/**` (Markdown + page bundles)
- `layouts/**` (templates + shortcodes)
- `assets/**` (site CSS like `assets/custom.css`)
- `static/**` (static assets copied as-is)
- `hugo.toml` (site configuration)

### ❌ Do NOT Edit These (Generated/Build Artifacts)

- `public/**` (production build output)
- `resources/_gen/**` (Hugo image pipeline/cache output)

If a user asks for a visual/output change, implement it by changing **source files**, not `public/`.

## Common Tasks

### Adding a New Tea Variety Article

1. Create directory: `content/tea-varieties/{category}/{variety-name}/`
2. Create `_index.md` with:
   - YAML front matter (title, tags, date)
   - Content starting with `##`
   - Image shortcodes referencing images in the same directory
3. Add images to the directory
4. Optionally create `_ai.prompt` for image generation

### Adding a Production Topic

1. Create directory: `content/tea-production/{topic-name}/`
2. Follow same structure as tea varieties
3. Use appropriate tags (`processing`, `harvest`, `culture`, etc.)

### Updating Existing Content

1. Edit the `_index.md` file
2. Update the `date` field in front matter to current timestamp
3. Ensure images referenced actually exist in the bundle

### Styling Changes

1. Edit `assets/custom.css` for CSS changes
2. Edit `layouts/**` templates for structural changes
3. Avoid editing `themes/paper/**` unless necessary

## Best Practices

1. **Consistency**: Match existing content style and structure
2. **Accessibility**: Always include meaningful alt text for images
3. **SEO**: Keep descriptions clean, use appropriate tags
4. **Organization**: Place images in the same directory as the page
5. **Minimal Diffs**: Keep changes focused and consistent with existing style
6. **No Secrets**: Never introduce secrets or external network dependencies unless requested

## Related Skills

This project also includes specialized skill files following the Agent Skills standard:

- **`ai/skills/blog-writer/SKILL.md`**: Guidelines for writing blog posts
- **`ai/skills/blog-illustrator/SKILL.md`**: Guidelines for creating image prompts
- **`ai/skills/topic-proposer/SKILL.md`**: Guidelines for proposing blog topics
- **`ai/skills/content-workflow/SKILL.md`**: Complete 3-stage workflow for content creation

Refer to these for specific workflows related to content creation.

## Configuration Reference

Key settings in `hugo.toml`:

- **Base URL**: `https://teaandme.com/`
- **Theme**: hugo-paper (via module)
- **Outputs**: HTML, RSS, JSON (for search)
- **Pagination**: 5 items per page
- **Environment**: Production (for SEO tags)

## Troubleshooting

### Image Not Found

If an image shortcode shows "Image not found":
- Verify the image file exists in the same directory as `_index.md`
- Check the filename matches exactly (case-sensitive)
- Ensure the image is not in `public/` (that's generated output)

### Content Not Appearing

- Check `draft: false` in front matter
- Verify the file is in the correct directory structure
- Run `hugo server --buildDrafts` to see drafts

### Search Not Working

- Ensure `layouts/index.json.json` exists
- Check that `outputs` in `hugo.toml` includes `JSON`
- Verify `static/js/search.js` exists

## Notes

- The site uses **absolute paths** in tool calls (workspace runs on macOS)
- Prefer **absolute paths** when calling tools: `/Users/155715/work/mytools/tea-lab/...`
- The site is optimized for correct Hugo behavior, clean Markdown content, and not editing generated artifacts

