import { Box, Typography } from '@mui/material';
import { useTransactions } from '../../../shared/api/queries';
import { Wallet } from '../../../shared/types/wallet';
import TransactionList from './TransactionList';
import WalletBalance from './WalletBalance';

interface WalletDetailProps {
  wallet: Wallet;
}

const WalletDetail: React.FunctionComponent<WalletDetailProps> = ({ wallet }) => {
  const transactions = useTransactions(wallet?.id);

  return (
    <Box padding={2}>
      <Typography variant='h3' marginBottom={2}>
        {wallet.title}
      </Typography>
      <WalletBalance balance={wallet.balance} />
      <TransactionList transactions={transactions.data || []} />
    </Box>
  );
};

export default WalletDetail;
