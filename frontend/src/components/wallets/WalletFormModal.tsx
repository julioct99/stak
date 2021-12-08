import { Card, CardContent } from '@mui/material'
import Modal from '../Modal'
import WalletForm from './WalletForm'

interface WalletFormModalProps {
  modalOpen: boolean
  onModalClose: () => void
}

const WalletFormModal: React.FunctionComponent<WalletFormModalProps> = ({
  modalOpen,
  onModalClose,
}) => {
  return (
    <Modal onClose={onModalClose} open={modalOpen}>
      <Card sx={{ width: '750px' }}>
        <CardContent>
          <WalletForm onSubmit={onModalClose} />
        </CardContent>
      </Card>
    </Modal>
  )
}

export default WalletFormModal
