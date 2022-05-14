import { List } from '@mui/material'
import { Transaction } from '../../../shared/types/transaction'
import NoResults from '../../NoResults'
import TransactionListItem from './TransactionListItem'

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList: React.FunctionComponent<TransactionListProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) return <NoResults />

  return (
    <List sx={{ maxHeight: '60vh', overflowY: 'auto' }} dense>
      {transactions.map((transaction, index) => (
        <TransactionListItem transaction={transaction} index={index} />
      ))}
    </List>
  )
}

export default TransactionList
