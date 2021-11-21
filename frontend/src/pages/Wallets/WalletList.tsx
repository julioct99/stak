import { AccountBalanceWallet } from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { Wallet } from '../../shared/types/wallet';

interface WalletListProps {
  wallets: Wallet[] | undefined;
  onSelectWallet: (wallet: Wallet) => void;
}

const WalletList: React.FunctionComponent<WalletListProps> = ({
  wallets,
  onSelectWallet,
}) => {
  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {wallets?.map((wallet) => (
        <ListItemButton onClick={() => onSelectWallet(wallet)}>
          <ListItemAvatar>
            <Avatar>
              <AccountBalanceWallet />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={wallet.title} secondary={wallet.balance} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default WalletList;
