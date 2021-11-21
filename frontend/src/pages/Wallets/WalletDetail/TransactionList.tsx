import { Receipt } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Transaction } from '../../../shared/types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

const renderTransactionItem = (transaction: Transaction) => {
  const amountColor = transaction.amount <= 0 ? 'red' : 'green';
  const date = new Date(transaction.date).toLocaleDateString();

  return (
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
  );
};

const TransactionList: React.FunctionComponent<TransactionListProps> = ({
  transactions,
}) => {
  return <List>{transactions.map(renderTransactionItem)}</List>;
};

export default TransactionList;
