import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useCategory, useTransactions } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import TransactionList from '../Wallets/WalletDetail/TransactionList'

interface CategoryDetailProps {
  category: TransactionCategory
}

const CategoryDetail: React.FunctionComponent<CategoryDetailProps> = ({ category }) => {
  const internalCategory = useCategory(category.id)
  const transactions = useTransactions(1)

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
