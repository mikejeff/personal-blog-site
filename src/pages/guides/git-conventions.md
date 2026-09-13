---
layout: ../../layouts/DocsLayout.astro
title: "Git Conventions"
headline: "Git Conventions"
pubDate: 2026-08-18
description: 'A reference for frequently used and often forgotten git conventions'
author: 'Mike Jeffery'
---


## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>: <description>
```

| Type        | Use for                                      |
| ----------- | -------------------------------------------- |
| `feat:`     | New functionality                            |
| `fix:`      | Bug fixes                                    |
| `refactor:` | Code restructuring without changing behavior |
| `chore:`    | Maintenance, dependencies, tooling, etc.     |
| `docs:`     | Documentation                                |
| `style:`    | Formatting/style-only changes                |
| `test:`     | Tests                                        |
| `perf:`     | Performance improvements                     |
| `build:`    | Build system/tooling changes                 |
| `ci:`       | CI/CD changes                                |

Examples:

```text
feat: add dark mode toggle
fix: correct mobile navigation spacing
refactor: simplify SEO metadata
chore: update dependencies
docs: document accessibility testing
```

## Branch names

Use:

```text
<type>/<short-description>
```

Examples:

```text
feat/dark-mode
fix/mobile-navigation
refactor/seo-metadata
chore/update-dependencies
docs/accessibility-guide
```

Keep branch names **lowercase, short, and kebab-case**.

## Quick rule

**Branch:** What am I working on?

```text
fix/mobile-navigation
```

**Commit:** What did I just do?

```text
fix: prevent navigation from overflowing on mobile
```