import { Typography } from '@mui/material';
import { Wallet } from '../../../shared/types/wallet';
import WalletBalance from './WalletBalance';

interface WalletDetailProps {
  wallet: Wallet | undefined;
}

const WalletDetail: React.FunctionComponent<WalletDetailProps> = ({ wallet }) => {
  if (!wallet) return <p>Select a Wallet</p>;

  return (
    <>
      <Typography variant='h3'>{wallet.title}</Typography>
      <WalletBalance balance={wallet.balance} />
    </>
  );
};

export default WalletDetail;
