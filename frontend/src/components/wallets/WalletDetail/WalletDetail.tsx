import { Delete } from '@mui/icons-material'
import { Box, CardHeader, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useWalletTransactions, useWallet, useWallets } from '../../../shared/api/queries'
import { WalletService } from '../../../shared/api/services'
import { Wallet } from '../../../shared/types/wallet'
import ConfirmDialog from '../../ConfirmDialog'
import TransactionList from './TransactionList'
import WalletBalance from './WalletBalance'

interface WalletDetailProps {
  wallet: Wallet
  onWalletDeselect?: () => void
}

const WalletDetail: React.FunctionComponent<WalletDetailProps> = ({
  wallet,
  onWalletDeselect,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const wallets = useWallets()

  const internalWallet = useWallet(wallet.id)
  const transactions = useWalletTransactions(wallet.id)

  const handleConfirmDelete = () => {
    WalletService.delete(wallet).then(() => {
      wallets.refetch()
      if (onWalletDeselect) onWalletDeselect()
    })
  }

  const handleDialogOpen = () => {
    setDeleteDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <ConfirmDialog
        open={deleteDialogOpen}
        title={`Deleting wallet ${wallet.title}`}
        content='Are you sure you want to delete the wallet?'
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
      <Box padding={2}>
        <CardHeader
          action={
            <IconButton onClick={handleDialogOpen} size='large' color='error'>
              <Delete />
            </IconButton>
          }
          title={
            <Typography variant='h4' marginBottom={2}>
              {internalWallet.data?.title}
            </Typography>
          }
          subheader={<WalletBalance balance={internalWallet.data?.balance} />}
        />
        <TransactionList transactions={transactions.data || []} />
      </Box>
    </>
  )
}

export default WalletDetail
