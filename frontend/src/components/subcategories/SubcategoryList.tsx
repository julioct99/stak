import { Category } from '@mui/icons-material'
import { List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { useSubcategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import { TransactionSubcategory } from '../../shared/types/transactionSubcategory'

interface SubcategoryListProps {
  category: TransactionCategory
  onSelectSubcategory: (subcategory: TransactionSubcategory) => void
}

const SubcategoryList: React.FunctionComponent<SubcategoryListProps> = ({
  category,
  onSelectSubcategory,
}) => {
  const subcategories = useSubcategories(category.id)

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {subcategories.data?.map((subcategory) => (
        <ListItemButton onClick={() => onSelectSubcategory(subcategory)}>
          <ListItemAvatar>
            <Category />
          </ListItemAvatar>
          <ListItemText primary={subcategory.name} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default SubcategoryList
