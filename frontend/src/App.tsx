import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import CategoriesPage from './pages/Categories/Categories';
import Home from './pages/Home/Home';
import WalletsPage from './pages/Wallets/Wallets';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='wallets' element={<WalletsPage />} />
        <Route path='categories' element={<CategoriesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
