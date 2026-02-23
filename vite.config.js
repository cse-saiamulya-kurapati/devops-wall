import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set base to repo name when deploying to GitHub Pages, e.g. '/devops-wall/'
// For a custom domain or root deployment, set base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
