import { DrawerMenuItem } from '../../../shared/types/drawerMenuItem';
import { Mail, Inbox } from '@mui/icons-material';

export const MAIN_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'Inbox', icon: Inbox },
  { name: 'Starred', icon: Mail },
  { name: 'Send email', icon: Inbox },
  { name: 'Drafts', icon: Mail },
];

export const SECONDARY_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'All Mail', icon: Inbox },
  { name: 'Trash', icon: Mail },
  { name: 'Spam', icon: Inbox },
];
