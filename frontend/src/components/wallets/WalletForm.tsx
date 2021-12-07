import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material'
import { useRef } from 'react'
import { WalletPost } from '../../shared/types/wallet'

interface WalletFormProps {
  editMode?: boolean
}

const WalletForm: React.FunctionComponent<WalletFormProps> = ({ editMode }) => {
  const titleInputRef = useRef<HTMLInputElement>()
  const balanceInputRef = useRef<HTMLInputElement>()

  const theme = useTheme()

  const handleSubmit = () => {
    const wallet: WalletPost = {
      balance: balanceInputRef.current?.valueAsNumber || 0,
      title: titleInputRef.current?.value || '',
      owner: 1,
    }
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
