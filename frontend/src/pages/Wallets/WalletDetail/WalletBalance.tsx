import { Typography } from '@mui/material';

interface WalletBalanceProps {
  balance: number;
}

const WalletBalance: React.FunctionComponent<WalletBalanceProps> = ({ balance }) => {
  const color = balance <= 0 ? 'red' : 'green';
  const currency = '$';
  const balanceDisplay = `${currency} ${balance}`;

  return (
    <Typography variant='h5' fontWeight='bold' color={color}>
      {balanceDisplay}
    </Typography>
  );
};

export default WalletBalance;
