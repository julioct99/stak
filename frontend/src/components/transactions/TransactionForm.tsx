import { Card, CardContent } from '@mui/material'
import SubcategorySelector from '../SubcategorySelector'
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

  const handleSubcategorySelect = (subcategoryId: number) => {
    console.log('subcategoryId', subcategoryId)
  }

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <h1>Transaction form</h1>
        <WalletSelector onWalletSelect={handleWalletSelect} />
        <SubcategorySelector onSubcategorySelect={handleSubcategorySelect} />
      </CardContent>
    </Card>
  )
}

export default TransactionForm
