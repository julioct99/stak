import { AccountBalanceWallet } from '@mui/icons-material'
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'

import { Wallet } from '../../shared/types/wallet'

interface WalletListProps {
  wallets: Wallet[] | undefined
  onSelectWallet: (wallet: Wallet) => void
}

const WalletList: React.FunctionComponent<WalletListProps> = ({
  wallets,
  onSelectWallet,
}) => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>()

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet)
    onSelectWallet(wallet)
  }

  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {wallets?.map((wallet) => (
        <ListItemButton
          selected={wallet.id === selectedWallet?.id}
          onClick={() => handleWalletSelect(wallet)}
        >
          <ListItemAvatar>
            <Avatar>
              <AccountBalanceWallet />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={wallet.title} secondary={wallet.balance} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default WalletList
