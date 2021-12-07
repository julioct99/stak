import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material'
import { useRef } from 'react'
import { useWallets } from '../../shared/api/queries'
import { WalletService } from '../../shared/api/services'
import { WalletPost } from '../../shared/types/wallet'

interface WalletFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const WalletForm: React.FunctionComponent<WalletFormProps> = ({ editMode, onSubmit }) => {
  const titleInputRef = useRef<HTMLInputElement>()
  const balanceInputRef = useRef<HTMLInputElement>()

  const wallets = useWallets()

  const theme = useTheme()

  const handleSubmit = () => {
    const wallet: WalletPost = {
      balance: balanceInputRef.current?.valueAsNumber || 0,
      title: titleInputRef.current?.value || '',
      owner: 1,
    }

    WalletService.create(wallet).then(() => wallets.refetch())
    onSubmit()
  }

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const formTitle = `${editMode ? 'Edit' : 'New'} Wallet`
  const actionName = editMode ? 'Save' : 'Add'

  return (
    <form>
      <Container>
        <Typography variant='h3'>{formTitle}</Typography>
        <Box marginBottom={2} marginTop={2}>
          <TextField
            type='text'
            fullWidth
            label='Title'
            sx={inputStyle}
            inputRef={titleInputRef}
          />
          <TextField
            type='number'
            fullWidth
            label='Balance'
            sx={inputStyle}
            inputRef={balanceInputRef}
            defaultValue={0}
          />
        </Box>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {actionName}
        </Button>
      </Container>
    </form>
  )
}

export default WalletForm
