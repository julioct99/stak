import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import CategoriesPage from './pages/Categories/Categories';
import HomePage from './pages/Home/HomePage';
import WalletsPage from './pages/Wallets/WalletsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='wallets' element={<WalletsPage />} />
        <Route path='categories' element={<CategoriesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
