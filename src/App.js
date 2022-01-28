import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import GlobalStyle from './styles/global';
import AppRouter from './routes/index';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <GlobalStyle />
    </Layout>
  );
}

export default App;
