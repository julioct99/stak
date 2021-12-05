import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useSubcategory, useSubcategoryTransactions } from '../../shared/api/queries'
import { TransactionSubcategory } from '../../shared/types/transactionSubcategory'
import TransactionList from '../wallets/WalletDetail/TransactionList'

interface SubcategoryDetailProps {
  subcategory: TransactionSubcategory
}

const SubcategoryDetail: React.FunctionComponent<SubcategoryDetailProps> = ({
  subcategory,
}) => {
  const internalSubcategory = useSubcategory(subcategory.category, subcategory.id)
  const transactions = useSubcategoryTransactions(subcategory.category, subcategory.id)

  return (
    <Box padding={2}>
      <Typography variant='h3' marginBottom={2}>
        {internalSubcategory.data?.name}
      </Typography>
      <Divider />
      <TransactionList transactions={transactions.data || []} />
    </Box>
  )
}

export default SubcategoryDetail
