import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store.jsx';
import { ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose={500}
 />
    </Provider>

  </BrowserRouter>
);