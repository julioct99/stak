import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { DrawerMenuItem } from '../../../shared/types/drawerMenuItem'

interface DrawerItemsProps {
  items: DrawerMenuItem[]
  drawerOpen: boolean
}

const DrawerItems: React.FunctionComponent<DrawerItemsProps> = ({
  items,
  drawerOpen,
}) => {
  const location = useLocation()

  return (
    <>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem
            selected={location.pathname === item.link}
            component={Link}
            to={item.link}
            title={drawerOpen ? '' : item.name}
            button
            key={item.name}
          >
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DrawerItems
