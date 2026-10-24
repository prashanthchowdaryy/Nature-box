import { defineConfig } from 'vite';

// GitHub Pages serves this project from https://<username>.github.io/Nature-box/
// so the production build needs that sub-folder as its base. Local dev stays at '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Nature-box/' : '/',
}));
