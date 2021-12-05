import { Route, Routes } from 'react-router-dom'
import CategoriesPage from './pages/Categories/CategoriesPage'
import HomePage from './pages/Home/HomePage'
import SubcategoriesPage from './pages/Subcategories/SubcategoriesPage'
import WalletsPage from './pages/Wallets/WalletsPage'

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='wallets' element={<WalletsPage />} />
      <Route path='categories' element={<CategoriesPage />} />
      <Route path='subcategories' element={<SubcategoriesPage />} />
    </Routes>
  )
}

export default AppRoutes
