# mikejeff.com, the personal website of Mike Jeffery

## Why this site exists
This is my personal site. This is where I will showcase my work and express my creativity.
It's OK to get weird.

## Git Conventions

### Commit messages

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

### Branch names

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

### Quick rule

**Branch:** What am I working on?

```text
fix/mobile-navigation
```

**Commit:** What did I just do?

```text
fix: prevent navigation from overflowing on mobile
```


## Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

### 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

### 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
