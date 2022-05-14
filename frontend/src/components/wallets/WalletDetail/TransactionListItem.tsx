import { Receipt } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Transaction } from '../../../shared/types/transaction'

interface TransactionListItemProps {
  transaction: Transaction
  index: number
}

const TransactionListItem: React.FunctionComponent<TransactionListItemProps> = ({
  transaction,
  index,
}) => {
  const amountColor = transaction.amount <= 0 ? 'red' : 'green'
  const date = new Date(transaction.date).toLocaleDateString()
  const transactionSecondary = transaction.description
    ? `${date}: ${transaction.description}`
    : date

  return (
    <div key={transaction.id}>
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
          secondary={transactionSecondary}
        />
      </ListItem>
    </div>
  )
}

export default TransactionListItem
