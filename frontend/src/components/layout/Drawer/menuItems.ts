import { DrawerMenuItem } from '../../../shared/types/drawerMenuItem';
import { Category, Home, AccountBalanceWallet } from '@mui/icons-material';

export const MAIN_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'Home', icon: Home, link: '/' },
  { name: 'Wallets', icon: AccountBalanceWallet, link: '/wallets' },
  { name: 'Categories', icon: Category, link: '/categories' },
];
