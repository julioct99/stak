import { Category } from '@mui/icons-material'
import { List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { useSubcategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import { TransactionSubcategory } from '../../shared/types/transactionSubcategory'
import NoResults from '../NoResults'

interface SubcategoryListProps {
  category: TransactionCategory
  onSelectSubcategory: (subcategory: TransactionSubcategory) => void
}

const SubcategoryList: React.FunctionComponent<SubcategoryListProps> = ({
  category,
  onSelectSubcategory,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    TransactionSubcategory | undefined
  >()

  const subcategories = useSubcategories(category.id)

  const handleSubcategorySelect = (subcategory: TransactionSubcategory) => {
    setSelectedSubcategory(subcategory)
    onSelectSubcategory(subcategory)
  }

  if (subcategories.data?.length === 0) return <NoResults />

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {subcategories.data?.map((subcategory) => (
        <ListItemButton
          key={subcategory.id}
          selected={subcategory.id === selectedSubcategory?.id}
          onClick={() => handleSubcategorySelect(subcategory)}
        >
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
