import { Card, CardContent } from '@mui/material'
import WalletSelector from '../WalletSelector'

interface TransactionFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const TransactionForm: React.FunctionComponent<TransactionFormProps> = ({
  onSubmit,
  editMode,
}) => {
  const handleWalletSelect = (walletId: number) => {
    console.log('walletId', walletId)
  }

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <h1>Transaction form</h1>
        <WalletSelector onWalletSelect={handleWalletSelect} />
      </CardContent>
    </Card>
  )
}

export default TransactionForm
