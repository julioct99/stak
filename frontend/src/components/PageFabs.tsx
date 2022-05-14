import { Add, AddShoppingCart } from '@mui/icons-material'
import { Fab, useTheme } from '@mui/material'
import { useState } from 'react'
import Modal from './Modal'
import TransactionForm from './transactions/TransactionForm'

interface PageFabsProps {
  onMainFabClick: () => void
  mainFabTitle: string
}

const PageFabs: React.FunctionComponent<PageFabsProps> = ({
  onMainFabClick,
  mainFabTitle,
}) => {
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)

  const theme = useTheme()

  return (
    <>
      <Modal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)}>
        <TransactionForm onSubmit={() => setTransactionModalOpen(false)} />
      </Modal>
      <Fab
        size='large'
        color='secondary'
        title='Add Transaction'
        onClick={() => setTransactionModalOpen(true)}
        sx={{ position: 'absolute', bottom: theme.spacing(16), right: theme.spacing(4) }}
      >
        <AddShoppingCart />
      </Fab>
      <Fab
        size='large'
        color='primary'
        onClick={onMainFabClick}
        title={mainFabTitle}
        sx={{ position: 'absolute', bottom: theme.spacing(4), right: theme.spacing(4) }}
      >
        <Add />
      </Fab>
    </>
  )
}

export default PageFabs
