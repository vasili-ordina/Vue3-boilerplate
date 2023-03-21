# Vue3-boilerplate

This template should help get you started developing with Vue 3 in Vite.

## How is this improving your (dev)life ##

### in general: ###
- filesystem that makes sense: i.e. Atomic Design components
- elements encourage HTML5, ARIA and Microdata (schema.org)
- running start with APIhandler
- using ```<script setup>``` (prevents verbose use of setup(), return all computed values etc.)
- Pinia instead of Vuex
- encouragement of using TypeScript
- no implicit imports, no BEM SCSS . both make reference searching hard to search and understand.
- policies? (is client allowed to store data? privacy etc)
- prettyfied but no linting

### API handling ###
- no Axios, but native "Fetch".
- checking internet connection and bandwidth
- versioning. caching must be refreshed when the api handler detects a new version of de client.
- secure
- fast
- caching requests in case there is temporarily broken internet connection due to (tunnel)interference, area with no service, data use cap. These are especially the case in mobile solutions
- caching / storing data in local store if dealt with masterdata. options are explored and possibly there are 3 types of dataretention: dynamic, static and session.
    - dynamic: fresh data with every request.
    - static data: almost never changes (translation tables etc). (stored indefinetly on local machine, only updates when version of website changes. cache is being flushed)
    - session data: semi persistant data. Assumption can be made that data won't change over the course of one usersession.
- error handling

### Asset management ###
- using image optimalisation based on device and resolution. (and bandwidth)



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
