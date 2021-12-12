import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface ConfirmDialogProps {
  onConfirm?: () => void
  onClose?: () => void
  title: string
  content: string
  open: boolean
}

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  onConfirm,
  onClose,
  title,
  content,
  open,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button autoFocus onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
