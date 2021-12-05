import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCategory, useCategoryTransactions } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import TransactionList from '../wallets/WalletDetail/TransactionList'

interface CategoryDetailProps {
  category: TransactionCategory
}

const CategoryDetail: React.FunctionComponent<CategoryDetailProps> = ({ category }) => {
  const internalCategory = useCategory(category.id)
  const transactions = useCategoryTransactions(category.id)

  return (
    <Box padding={2}>
      <Typography variant='h3' marginBottom={2}>
        {internalCategory.data?.name}
      </Typography>
      <Divider />
      <TransactionList transactions={transactions.data || []} />
    </Box>
  )
}

export default CategoryDetail
