import { Box, Divider, Typography } from '@mui/material'
import { useTransactions, useWallet } from '../../../shared/api/queries'
import { Wallet } from '../../../shared/types/wallet'
import TransactionList from './TransactionList'
import WalletBalance from './WalletBalance'

interface WalletDetailProps {
  wallet: Wallet
}

const WalletDetail: React.FunctionComponent<WalletDetailProps> = ({ wallet }) => {
  const internalWallet = useWallet(wallet.id)
  const transactions = useTransactions(wallet.id)

  return (
    <Box padding={2}>
      <Typography variant='h3' marginBottom={2}>
        {internalWallet.data?.title}
      </Typography>
      <WalletBalance balance={internalWallet.data?.balance} />
      <Divider />
      <TransactionList transactions={transactions.data || []} />
    </Box>
  )
}

export default WalletDetail
