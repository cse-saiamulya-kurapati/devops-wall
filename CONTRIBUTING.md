# Contributing to DevOps Wall

This repo is a live demo of a CI/CD pipeline. Every card on the wall was added via a Pull Request.

## How to add yourself

1. **Fork** this repository on GitHub.

2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/devops-wall.git
   cd devops-wall
   ```

3. **Create** a new file at `src/contributors/<your-github-username>.json`:
   ```json
   {
     "name": "Your Name",
     "github": "your-github-username",
     "role": "Developer",
     "bio": "One sentence about you."
   }
   ```

   > Only `name` is required. `github`, `role`, and `bio` are optional.
   > Name your file after your GitHub username (e.g. `johndoe.json`). If you don't have a GitHub account, use your name in lowercase with hyphens (e.g. `john-doe.json`).

4. **Validate** your change locally before pushing:
   ```bash
   npm run validate
   ```

5. **Commit and push**:
   ```bash
   git add src/contributors/<your-github-username>.json
   git commit -m "feat: add <Your Name> to contributors"
   git push
   ```

6. **Open a Pull Request** against the `main` branch of the original repo.

## What happens next

| Step | Who |
|---|---|
| PR opened | You |
| `validate-pr.yml` runs JSON validation + build | GitHub Actions |
| PR is auto-merged if CI passes | GitHub Actions |
| Render detects the merge and deploys | Render |
| Your card is live | Everyone 🎉 |

## JSON schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Your display name |
| `github` | string | ❌ | GitHub username (no `@`) |
| `role` | string | ❌ | e.g. `"DevOps Engineer"` |
| `bio` | string | ❌ | One sentence |
