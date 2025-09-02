# 📦 Using Changesets for Automatic Versioning & Publishing

This guide explains how to use [Changesets](https://github.com/changesets/changesets) in your repository to **automatically bump versions, publish to npm, and manage releases**, along with the required GitHub repository settings.

---

## 1️⃣ Install Changesets

Install the CLI as a dev dependency:

```bash
npm install --save-dev @changesets/cli
```

Initialize the changesets folder:

```bash
npx changeset init
```

This will create a `.changeset/` folder in your repo.

---

## 2️⃣ Add Scripts to `package.json`

Add the following scripts for versioning and release:

```json
"scripts": {
  "build": "tsc",
  "test": "vitest run",
  "changeset": "changeset",
  "version-packages": "changeset version",
  "release": "changeset publish"
}
```

* `changeset`: Create a new changeset (describe what changed).
* `version-packages`: Bump package versions locally.
* `release`: Publish to npm and create GitHub release.

---

## 3️⃣ Create a Changeset

Whenever you make changes you want to release:

```bash
npx changeset
```

You’ll be prompted to:

* Select which packages changed.
* Choose version type (`patch`, `minor`, `major`).
* Add a summary message.

This generates a file in `.changeset/` that describes your changes.

---

## 4️⃣ GitHub Actions Workflow

Create `.github/workflows/release.yml`:

```yaml
name: Version & Publish

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write      # Needed to push version bump & tags
      pull-requests: write # Needed if creating PRs (optional)
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org/'

      - run: npm ci
      - run: npm run build
      # Optional test step, remove if no tests
      # - run: npm test

      - uses: changesets/action@v1
        with:
          publish: npm run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Notes:

* `GITHUB_TOKEN` is automatically provided by GitHub Actions.
* `NODE_AUTH_TOKEN` must be added as a **Repository Secret** containing your npm publish token.
* If you do not want PR creation, Changesets will skip it and publish directly.

---

## 5️⃣ Required GitHub Repository Settings

1. **Workflow permissions**
   Go to `Settings → Actions → General → Workflow permissions`

   * Select **“Read and write permissions”**

2. **Allow GitHub Actions to create PRs** (only if you want PRs)

   * Enable **“Allow GitHub Actions to create and approve pull requests”**

> ⚠️ If PR creation is disabled, any workflow attempting to create a PR will fail.
> You can still use Changesets to auto-bump versions and publish to npm without PRs.

---

## 6️⃣ Publishing Process

1. Make code changes.
2. Run `npx changeset` to create a changeset.
3. Push changes to `main`.
4. GitHub Actions will:

   * Bump package version
   * Publish to npm
   * Create a GitHub release (if configured)

---

## 7️⃣ Optional: Skipping Tests

If you do not have test files yet, either:

* Remove the test step from the workflow, **or**
* Make it non-blocking:

```yaml
- run: npm test || echo "No tests found, skipping..."
```

---

## 8️⃣ Useful Links

* [Changesets Documentation](https://github.com/changesets/changesets)
* [GitHub Actions: Permissions for GITHUB\_TOKEN](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
* [GitHub Actions: Create a Pull Request](https://docs.github.com/rest/pulls/pulls#create-a-pull-request)

---