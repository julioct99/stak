import { Category } from '@mui/icons-material'
import { List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { TransactionCategory } from '../../shared/types/transactionCategory'

interface CategoryListProps {
  categories: TransactionCategory[] | undefined
  onSelectCategory: (category: TransactionCategory) => void
}

const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {categories?.map((category) => (
        <ListItemButton onClick={() => onSelectCategory(category)}>
          <ListItemAvatar>
            <Category />
          </ListItemAvatar>
          <ListItemText primary={category.name} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default CategoryList
