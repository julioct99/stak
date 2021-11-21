import { Transaction } from '../../../shared/types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FunctionComponent<TransactionListProps> = ({
  transactions,
}) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>{JSON.stringify(transaction, null, 2)}</li>
      ))}
    </ul>
  );
};

export default TransactionList;
