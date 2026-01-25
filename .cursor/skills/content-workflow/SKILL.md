---
name: content-workflow
description: Complete 3-stage workflow for creating blog posts using topic-proposer, blog-writer, and blog-illustrator skills, with examples, variations, best practices, and troubleshooting for the Tea & Me Hugo site.
---

# Content Creation Workflow

## Role

You are orchestrating a **3-stage content creation workflow** for the Tea & Me Hugo site. This workflow uses three specialized skills to transform a rough idea into a complete, publishable blog post with images.

## Workflow Overview

The content creation process follows this pipeline:

```
Initial Idea → Topic Proposer → Blog Writer → Blog Illustrator → Complete Blog Post
```

Each stage refines and expands the content until you have a fully-formed Hugo page bundle ready for publication.

## Stage 1: Topic Proposer

**Skill File**: `ai/skills/topic-proposer/SKILL.md`

**Purpose**: Transform a vague idea or topic into **3 distinct, well-structured blog ideas**.

**Input**: 
- A rough topic or idea (e.g., "Pu-erh aging", "tea harvest", "Longjing tea")

**Process**:
1. Analyze the initial topic
2. Generate 3 distinct blog ideas with different angles
3. Each idea includes:
   - Title
   - Description (2-3 sentences)
   - Target word count (500-1000 words)
   - Suggested tags
   - Suggested content path
   - Key topics to cover

**Output**: 3 blog idea proposals formatted as structured outlines

**Example**:
```
### Idea 1: Understanding Pu-erh Aging: A Beginner's Guide
**Description**: An accessible introduction to how Pu-erh tea changes over time...
**Target Word Count**: 800 words
**Suggested Tags**: [dark-tea, culture, buying-guide, yunnan]
**Suggested Content Path**: content/tea-production/aging/
**Key Topics to Cover**:
- Raw (Sheng) vs. Ripe (Shu) Pu-erh aging differences
- Ideal storage conditions
- ...
```

**When to Use**: 
- Starting a new blog post from scratch
- Exploring different angles for a topic
- Need structured ideas before writing

---

## Stage 2: Blog Writer

**Skill File**: `ai/skills/blog-writer/SKILL.md`

**Purpose**: Take a selected blog idea and generate **3 complete blog drafts** ready for publication.

**Input**: 
- One selected blog idea from Stage 1 (or a user-provided idea)
- The idea should include title, tags, content path, and key topics

**Process**:
1. Study existing content style (`content/tea-varieties/green/longjing/_index.md`, etc.)
2. Generate 3 complete `_index.md` files with:
   - YAML front matter (title, tags, date, draft: false)
   - Markdown content starting at `##`
   - Image shortcodes referencing images to be generated
   - 500-1000 words
   - Clear structure with sections
   - Practical information

**Output**: 3 complete Hugo `_index.md` files, each ready to be saved to a page bundle directory

**Example Structure**:
```markdown
---
draft: false

title: "Understanding Pu-erh Aging: A Beginner's Guide"
tags: [dark-tea, culture, buying-guide, yunnan]
date: '2026-01-20T10:00:00-08:00'
---

{{< img src="aging-1.png" w="1200x" alt="Pu-erh aging illustration" >}}

## Introduction
[Content...]

---
## Raw vs. Ripe Pu-erh Aging
[Content...]
```

**When to Use**:
- After selecting a blog idea from Stage 1
- When you have a clear idea and need full content
- Need multiple draft options to choose from

---

## Stage 3: Blog Illustrator

**Skill File**: `ai/skills/blog-illustrator/SKILL.md`

**Purpose**: Analyze a blog post and generate **1-2 image creation prompts** plus integrate them into the blog.

**Input**: 
- A complete blog post (`_index.md` file)
- The page bundle directory name (slug)

**Process**:
1. Analyze the blog content to determine what images would enhance it
2. Generate 1-2 image prompts in `_ai.prompt` format:
   - Style (Chinese Ink Wash, Digital Illustration, etc.)
   - Aspect Ratio (16:9, 1:1, etc.)
   - Detailed description
3. Ensure image shortcodes are properly placed in the blog
4. Suggest alt text for accessibility

**Output**: 
- `_ai.prompt` file with image generation prompts
- Updated blog post with properly placed image shortcodes
- Alt text suggestions

**Example**:
```
# image 1
Style: Chinese Ink Wash (Sumi-e)
Aspect Ratio: 16:9
An artistic illustration of aged Pu-erh tea cakes arranged in a traditional storage room, warm earthy tones, misty atmosphere, wet-on-wet technique, dreamy and peaceful, high quality digital art.
```

**When to Use**:
- After selecting a final blog draft from Stage 2
- When a blog post needs images
- Before generating actual images

---

## Complete Workflow Example

### Step 1: Start with an Idea
**User**: "I want to write about tea harvest timing"

### Step 2: Use Topic Proposer
**Agent** (using `topic-proposer/SKILL.md`): Generates 3 distinct ideas:
- Idea 1: "Understanding Tea Harvest Timing: Solar Terms and Quality"
- Idea 2: "When to Buy: Decoding Pre-Qingming vs. Pre-Rain Teas"
- Idea 3: "The Art of Timing: How Harvest Affects Flavor Profiles"

**User selects**: Idea 1

### Step 3: Use Blog Writer
**Agent** (using `blog-writer/SKILL.md`): Generates 3 complete drafts of Idea 1

**User selects**: Draft 2 (best version)

### Step 4: Use Blog Illustrator
**Agent** (using `blog-illustrator/SKILL.md`): 
- Analyzes the selected draft
- Creates `_ai.prompt` with 2 image prompts
- Ensures image shortcodes are properly placed
- Suggests alt text

### Step 5: Final Steps
**User**:
1. Creates the page bundle directory: `content/tea-production/harvest-timing/`
2. Saves the `_index.md` file
3. Saves the `_ai.prompt` file
4. Generates images using the prompts
5. Places images in the directory
6. Reviews and publishes

---

## Workflow Variations

### Quick Path (Skip Topic Proposer)
If you already have a clear, specific idea:
1. **Skip Stage 1** (Topic Proposer)
2. Go directly to **Stage 2** (Blog Writer)
3. Then **Stage 3** (Blog Illustrator)

### Iterative Refinement
You can iterate within stages:
- Generate 3 ideas → refine → generate 3 more
- Generate 3 drafts → select one → refine it → generate variations
- Generate images → review → adjust prompts → regenerate

### Single Draft Path
If you only need one draft:
- Use Blog Writer but request "1 complete draft" instead of 3
- Still use Blog Illustrator for images

---

## Best Practices

### 1. Always Start with Topic Proposer (Unless Idea is Very Specific)
- Helps explore different angles
- Ensures ideas fit the site's structure
- Provides proper tags and paths upfront

### 2. Review Before Moving to Next Stage
- Don't rush through stages
- Select the best option before proceeding
- Make minor edits if needed

### 3. Use Blog Illustrator After Final Draft Selection
- Don't generate images for all 3 drafts
- Wait until you've chosen the final version
- This saves time and resources

### 4. Follow the Suggested Content Path
- Topic Proposer suggests paths like `content/tea-production/aging/`
- Use these paths when creating page bundles
- Maintains site organization

### 5. Update Dates When Editing
- When refining drafts, update the `date` field
- Reflects last modification time
- Important for SEO and freshness

---

## Integration with Project Overview

This workflow integrates with the general project guidelines in `ai/skills/project-overview/SKILL.md`:

- **File Structure**: Follows Hugo page bundle conventions
- **Content Style**: Matches existing site tone and structure
- **Image Handling**: Uses Hugo shortcodes and proper naming
- **Tag Taxonomy**: Uses consistent tag system
- **SEO**: Maintains proper front matter and descriptions

---

## Common Workflow Patterns

### Pattern 1: New Tea Variety Article
```
Topic: "Dragon Well tea"
→ Topic Proposer: 3 ideas about Longjing
→ Blog Writer: 3 drafts about Longjing varieties/grading/buying
→ Blog Illustrator: Images of Longjing tea and Hangzhou landscapes
→ Result: content/tea-varieties/green/longjing/_index.md
```

### Pattern 2: Production Topic
```
Topic: "Tea processing techniques"
→ Topic Proposer: 3 ideas (oxidation, rolling, firing)
→ Blog Writer: 3 drafts on oxidation process
→ Blog Illustrator: Images of tea processing steps
→ Result: content/tea-production/technics/oxidation/_index.md
```

### Pattern 3: Buying Guide
```
Topic: "Where to buy Pu-erh"
→ Topic Proposer: 3 ideas (online shops, quality indicators, price ranges)
→ Blog Writer: 3 drafts on online shopping
→ Blog Illustrator: Images of tea shops and tea cakes
→ Result: content/tea-shop/puerh-online/_index.md
```

---

## Troubleshooting

### "The drafts don't match my vision"
- Go back to Topic Proposer and refine the idea
- Or provide more specific guidance to Blog Writer
- Consider editing the selected draft manually

### "Images don't fit the content"
- Review the Blog Illustrator output
- Adjust prompts in `_ai.prompt` manually
- Regenerate images with modified prompts

### "The content path doesn't exist"
- Create the directory structure first
- Follow the suggested path from Topic Proposer
- Ensure parent directories exist (e.g., `content/tea-production/`)

### "Tags don't match existing taxonomy"
- Check `ai/skills/project-overview/SKILL.md` for tag list
- Review existing content for tag usage
- Adjust tags in front matter manually

---

## Instructions for Using This Workflow

When creating new content:

1. **Start with Topic Proposer**: Provide your initial idea and get 3 structured proposals
2. **Select Best Idea**: Choose the idea that best fits your goals
3. **Use Blog Writer**: Generate 3 complete drafts from the selected idea
4. **Select Best Draft**: Choose the draft that best matches your vision
5. **Use Blog Illustrator**: Generate image prompts and integrate them
6. **Create Page Bundle**: 
   - Create directory: `content/{section}/{slug}/`
   - Save `_index.md`
   - Save `_ai.prompt`
   - Generate and add images
7. **Review and Publish**: Check everything, then publish

Remember: Each stage can be iterated. Don't hesitate to refine ideas, regenerate drafts, or adjust images until you're satisfied with the result.

