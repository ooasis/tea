# Tea Lab / 小茶坊

A multilingual Hugo static site about tea, featuring the [hugo-paper](https://github.com/nanxiaobei/hugo-paper) theme.

## Features

- **Multilingual Support**: English and Chinese (中文)
- **Navigation Menu**: Blogs, Tea Families, and About sections in both languages
- **Sample Content**: Home pages and blog posts in both languages

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/) installed (extended version recommended)

### Running the Site

1. Start the Hugo development server:
   ```bash
   hugo server --buildDrafts
   ```

2. Open your browser to `http://localhost:1313`

### Building for Production

```bash
hugo --buildDrafts
```

The site will be built in the `public/` directory.

## Site Structure

- `content/` - English content
- `content/zh/` - Chinese content
- `content/blogs/` - Blog posts (English)
- `content/zh/blogs/` - Blog posts (Chinese)
- `content/tea-families/` - Tea families section (English)
- `content/zh/tea-families/` - Tea families section (Chinese)
- `content/about/` - About page (English)
- `content/zh/about/` - About page (Chinese)

## Configuration

The site configuration is in `hugo.toml`. Key settings:

- **Languages**: English (en) and Chinese (zh)
- **Theme**: hugo-paper
- **Navigation**: Configured in the `[languages]` section

## Adding Content

### English Content

```bash
hugo new blogs/my-new-post.md
```

### Chinese Content

```bash
hugo new zh/blogs/my-new-post.md
```

## Theme Documentation

For more information about the hugo-paper theme, visit:
https://github.com/nanxiaobei/hugo-paper

