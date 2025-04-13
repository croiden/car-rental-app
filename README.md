# Car Rental App

## Getting Started

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/).

### User Guide

- [User Guide](docs/user-guide.md)

### Follow the steps below to run the app locally:

- Clone the repository:

```bash
  git clone https://github.com/croiden/car-rental-app.git
  cd car-rental-app
```

- Run using Docker:

```bash
  docker compose up --build
```

- Or run using Node.js: (make sure you have Node.js installed (v22.14.0 or higher) and run the following commands)

```bash
  npm install
  npm run dev
```

### Other Available Scripts

In the project directory, you can run:

- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Preview the production build.
- `npm run lint` - Lints the code using ESLint.
- `npm run test` - Runs the tests using Playwright.
- `npm run test:ui` - Runs the tests using Playwright in UI mode.
- `npm run test:coverage` - Runs the tests using Playwright and generates a coverage report.

### Playwright tests results

![Playwright tests results](docs/test-result.png)

### Playwright visual comparison results (snapshot tests)

![Playwright visual comparison results](docs/visual-test-result.png)

### Tests coverage results

![Tests coverage](docs/test-coverage.png)

## Below README content was auto generated during the template creation process:

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
   extends: [
      // Remove ...tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
   ],
   languageOptions: {
      // other options...
      parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
      },
   },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
   plugins: {
      // Add the react-x and react-dom plugins
      'react-x': reactX,
      'react-dom': reactDom,
   },
   rules: {
      // other rules...
      // Enable its recommended typescript rules
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
   },
})
```
