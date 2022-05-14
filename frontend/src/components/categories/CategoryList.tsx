import { Folder } from '@mui/icons-material'
import { List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import NoResults from '../NoResults'

interface CategoryListProps {
  categories: TransactionCategory[] | undefined
  onSelectCategory: (category: TransactionCategory) => void
}

const CategoryList: React.FunctionComponent<CategoryListProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | undefined
  >()

  const handleCategorySelect = (category: TransactionCategory) => {
    setSelectedCategory(category)
    onSelectCategory(category)
  }

  if (categories?.length === 0) return <NoResults />

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {categories?.map((category) => (
        <ListItemButton
          key={category.id}
          selected={category.id === selectedCategory?.id}
          onClick={() => handleCategorySelect(category)}
        >
          <ListItemAvatar>
            <Folder />
          </ListItemAvatar>
          <ListItemText primary={category.name} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default CategoryList
