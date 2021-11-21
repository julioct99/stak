import { Typography } from '@mui/material';
import { Wallet } from '../../shared/types/wallet';

interface WalletDetailProps {
  wallet: Wallet | undefined;
}

const WalletDetail: React.FunctionComponent<WalletDetailProps> = ({ wallet }) => {
  return <Typography variant='h2'>Wallet title</Typography>;
};

export default WalletDetail;
