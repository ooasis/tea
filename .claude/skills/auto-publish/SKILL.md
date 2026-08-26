---
name: auto-publish
description: Daily automated publishing run for chaandme.com — sweeps pending PRs past their veto window, then creates the blog post or weekly digest that is due. Run headless by launchd every day at 10:15, or invoke manually with /auto-publish.
---

# Tea & Me automated publishing run

You are the maintainer of chaandme.com running the daily 10:15 publishing job.
Work from the repo root. Derive all state from git/GitHub — there are no state files.

## Hard rules

- NEVER push to `main` directly. All content ships as a PR from an `auto/*` branch.
- At most ONE new PR per run.
- Every fact in a post must come from research done this run; every deal/event in a digest must link its source. No invented prices, dates, or quotes.
- Verify `hugo --environment production` builds cleanly before opening any PR.
- Follow all content conventions in CLAUDE.md and the writing pipeline in `.cursor/skills/` (topic-proposer, blog-writer, blog-illustrator).

## Step 1 — Sync

```
git fetch origin && git checkout main && git pull origin main
```

## Step 2 — Sweep pending PRs (the 48h veto window)

For each OPEN PR whose head branch starts with `auto/` (`gh pr list --json number,createdAt,headRefName` and filter):

1. Skip if any comment or review contains "hold" (case-insensitive): check `gh pr view N --json comments,reviews`.
2. Skip if younger than 48 hours.
3. **Calibration gate**: count MERGED automated PRs (`gh pr list --state merged --json headRefName --limit 30` filtered to `auto/` branches). If fewer than 3, do NOT auto-merge anything — the user merges the first three by hand.
4. Otherwise merge: `gh pr merge N --merge --delete-branch`.

## Step 3 — Determine what is due (local date)

Compute ISO week `W=$(date +%G-W%V)` and day of week.

- **Monday**: weekly digest is due unless a branch/PR `auto/digest-$W` already exists (open or merged).
- **Tuesday or later**: post slot A is due unless `auto/post-$W-a` exists (open or merged).
- **Friday or later**: post slot B is due unless `auto/post-$W-b` exists (open or merged).

Take the FIRST due item only (digest > slot A > slot B). If nothing is due, log "nothing due" and stop.
Check existence with `git ls-remote origin 'refs/heads/auto/*'` AND `gh pr list --state all --head <branch>` (merged PRs delete their branches).

## Step 4a — Blog post (slots A/B)

1. **Topic**: list existing titles (`grep -rh '^title:' content --include='_index.md'`). Pick ONE new topic a tea amateur would find genuinely useful, not covered yet, fitting an existing section (tea-varieties, tea-categories, tea-production, teaware, tea-cuisine, tea-shop). Vary topic type across recent posts (variety guide / brewing / buying / culture / cuisine).
2. **Research**: web search, at least 3 reputable sources. Note factual claims (origin, processing, brewing parameters) only when sources agree.
3. **Write**: 500–1000 words as a page bundle `content/<section>/.../<slug>/_index.md` per CLAUDE.md front matter and structure conventions. Practical, structured, amateur-friendly. Include a comparison table or actionable brewing/buying guidance where natural.
4. **Image**: one image via Workers AI (see Image generation below). On any failure, ship text-only and say so in the PR body.
5. **Verify**: production build passes; the new page renders (check the built HTML exists and the image shortcode resolved).

## Step 4b — Weekly digest (Mondays)

Page bundle `content/tea-weekly/<YYYY-Www>/_index.md`, title like "Tea This Week — <Month Day, Year>", tags `[tea-weekly, deals, events]`.

1. **Deals**: check ONLY these shops' own sites (sale/specials/news pages): yunnansourcing.us, redblossomtea.com, teavivre.com, sevencups.com, white2tea.com, verdanttea.com, teadrunk.com, oldwaystea.com. List each genuine current promotion with shop, what's discounted, the direct link, and "seen on <date>". No coupon aggregators, no guessed expiry dates.
2. **Events**: web search for upcoming tea events that are online-attendable or in the NYC metro area. Name, date, venue/platform, link.
3. **Empty week**: if there are neither deals nor events, do NOT publish — log "empty digest week, skipped" and stop.

## Step 5 — Open the PR

```
git checkout -b <auto-branch> && git add <bundle only> && git commit && git push -u origin <branch>
gh pr create --title "<post title>" --body "<summary>"
```

Plain commit messages — no Co-Authored-By or other AI attribution trailers.
Then poll `wrangler pages deployment list --project-name tea` (every 20s, up to 3 min) for this branch's preview URL and add it to the PR body (`gh pr edit`).

## Step 6 — Email the user

Send via the Gmail MCP tool to `sunh11373@gmail.com`:
- Subject: `[Tea & Me] New <post|digest> pending: <title>`
- Body: 2–3 sentence summary, preview URL, PR URL, and either "Auto-publishes in 48h unless you comment 'hold' on the PR" or, during calibration, "Calibration mode: this will NOT auto-publish — merge the PR yourself to approve."

If the Gmail tool is unavailable or errors, continue — GitHub's own PR notification email is the fallback. Never let email failure block the PR.

## Image generation (Workers AI)

Token file: `~/.config/tea-lab/cf_ai_token` (plain text, a Cloudflare API token with Workers AI permission). If missing, skip images silently.

```
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/accounts/6e39487c5dfe88cabed2e448298904d0/ai/run/@cf/black-forest-labs/flux-1-schnell" \
  -H "Authorization: Bearer $(cat ~/.config/tea-lab/cf_ai_token)" \
  -d '{"prompt": "<prompt>", "steps": 8}'
```

Response JSON has `result.image` (base64) — decode to `<slug>-1.png` in the bundle. Write the matching `_ai.prompt` file per CLAUDE.md. Style: match the site's existing art (Chinese ink wash / watercolor / soft digital illustration). NEVER ask for Chinese characters or any text in the image. Reference it with `{{< img src="<slug>-1.png" w="1200x" alt="..." >}}`.

## Logging

Print a one-line summary at the end: what was swept/merged, what was created (or "nothing due"), email sent or not.
