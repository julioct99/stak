import { DrawerMenuItem } from '../../../shared/types/drawerMenuItem'
import { Folder, Home, AccountBalanceWallet, Category } from '@mui/icons-material'

export const MAIN_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'Home', icon: Home, link: '/' },
  { name: 'Wallets', icon: AccountBalanceWallet, link: '/wallets' },
  { name: 'Categories', icon: Folder, link: '/categories' },
  { name: 'Subcategories', icon: Category, link: '/subcategories' },
]
