import { ViteSSG } from 'vite-ssg';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
import generatedRoutes from '~pages';
import { installBaas } from '~/composables';

import './styles/main.css';
import 'uno.css';

import 'vfonts/Lato.css';

const routes = setupLayouts(generatedRoutes);

installBaas();

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) => i.install?.(ctx));
});
