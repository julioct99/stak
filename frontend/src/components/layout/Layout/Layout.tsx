import { FunctionComponent } from 'react';
import MiniDrawer from '../Drawer/Drawer';

interface LayoutProps {
  children: JSX.Element;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <MiniDrawer>{children}</MiniDrawer>;
};

export default Layout;
