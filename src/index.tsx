import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/rootReducer';
import App from './App/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
