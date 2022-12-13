# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Что использовал

CRA + typescript + react-router-dom + sass

Если захотите сами поднять реакт приложение+ts+react-router-dom+sass и потренироваться используйте: 
1) npx create-react-app my-app --template typescript
2) npm i react-router-dom
3) npm install sass
4) установить и настроить линтер\претир как вам нужно

Там будет много лишнего, что вместе с create-react-app прилетит, лишнее можно удалить, либо оставить.

## На что обратить внимание

1) в src/index.tsx входна точка приложения
2) в src/App/RootRouter настройки для роутинга по SPA
3) в src/Pages/Main можете глянуть пример рендера однотипных компонентов с использованием массива
4) в src/Pages/Other зарендерин компонент использующий хуки 
5) в src/Components/TestComponentsWithHooks можете глянуть базовое применение хуков useState, useEffect
6) стили навешиваем используя импорт scss файлов прямо в компоненты, если инетесно написал ещё работу со стилями через модули в src/Components/header
7) в src/Components/TestForMain можно глянуть пример типизации и деструктуризации пропсов
8) структура проекта примерная, можете переделать как хотите

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
