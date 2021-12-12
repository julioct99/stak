import { Delete } from '@mui/icons-material'
import { CardHeader, Divider, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import {
  useCategories,
  useCategory,
  useCategoryTransactions,
} from '../../shared/api/queries'
import { CategoryService } from '../../shared/api/services/categories'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import ConfirmDialog from '../ConfirmDialog'
import TransactionList from '../wallets/WalletDetail/TransactionList'

interface CategoryDetailProps {
  category: TransactionCategory
  onCategoryDeselect?: () => void
}

const CategoryDetail: React.FunctionComponent<CategoryDetailProps> = ({
  category,
  onCategoryDeselect,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const categories = useCategories()
  const internalCategory = useCategory(category.id)
  const transactions = useCategoryTransactions(category.id)

  const handleConfirmDelete = () => {
    CategoryService.delete(category).then(() => {
      categories.refetch()
      if (onCategoryDeselect) onCategoryDeselect()
    })
  }

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <ConfirmDialog
        open={deleteDialogOpen}
        title={`Deleting category: ${category.name}`}
        content='Are you sure you want to delete the category?'
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
      <Box padding={2}>
        <CardHeader
          action={
            <IconButton onClick={handleDeleteDialogOpen} size='large' color='error'>
              <Delete />
            </IconButton>
          }
          title={
            <Typography variant='h3' marginBottom={2}>
              {internalCategory.data?.name}
            </Typography>
          }
        />
        <TransactionList transactions={transactions.data || []} />
      </Box>
    </>
  )
}

export default CategoryDetail
