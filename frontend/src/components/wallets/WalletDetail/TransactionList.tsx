import { Receipt } from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Transaction } from '../../../shared/types/transaction'
import NoResults from '../../NoResults'

interface TransactionListProps {
  transactions: Transaction[]
}

const renderTransactionItem = (transaction: Transaction, index: number) => {
  const amountColor = transaction.amount <= 0 ? 'red' : 'green'
  const date = new Date(transaction.date).toLocaleDateString()

  return (
    <>
      {index > 0 && <Divider />}
      <ListItem>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText
          primary={`$ ${transaction.amount}`}
          primaryTypographyProps={{
            fontWeight: 'bold',
            color: amountColor,
          }}
          secondary={date}
        />
      </ListItem>
    </>
  )
}

const TransactionList: React.FunctionComponent<TransactionListProps> = ({
  transactions,
}) => {
  if (transactions.length === 0) return <NoResults />

  return <List dense>{transactions.map(renderTransactionItem)}</List>
}

export default TransactionList
