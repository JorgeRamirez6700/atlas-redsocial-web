/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

// additional config to direct the vite build to src directory
// https://vitejs.dev/config/#conditional-config
// https://vitejs.dev/config/shared-options.html#root

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      root: 'src',
      // para hacer un deploy en github pages, configura propiedad base con el
      // nombre/url de tu repo
      // para fazer uma implantação github pages, defina a propriedade base
      // para o nome/url do seu repositório
      // https://vitejs.dev/guide/static-deploy.html#github-pages
      // ejemplo base: '/social-network/',
      build: {
        minify: false,
        rollupOptions: {
          output: {
            dir: './dist',
          },
        },
      },
    };
  }
  return {};
});