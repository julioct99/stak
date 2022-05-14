import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useRef, useState } from 'react'

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
  const [selectedDate, setSelectedDate] = useState<Date | null>()

  const theme = useTheme()

  const amountInputRef = useRef<HTMLInputElement>()

  const handleWalletSelect = (walletId: number) => {
    console.log('walletId', walletId)
  }

  const handleSubcategorySelect = (subcategoryId: number) => {
    console.log('subcategoryId', subcategoryId)
  }

  const handleDateChange = (newValue: Date | null) => {
    console.log(newValue)
    setSelectedDate(newValue)
  }

  const handleSubmit = () => {
    alert('Submit')
  }

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }
  const formTitle = `${editMode ? 'Edit' : 'New'} Transaction`
  const actionName = editMode ? 'Save' : 'Add'

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <Typography variant='h3'>{formTitle}</Typography>
        <Box marginBottom={2} marginTop={2}>
          <WalletSelector onWalletSelect={handleWalletSelect} />
          <SubcategorySelector onSubcategorySelect={handleSubcategorySelect} />
          <TextField
            autoComplete='off'
            type='number'
            fullWidth
            label='Amount'
            inputRef={amountInputRef}
            sx={inputStyle}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date'
              inputFormat='MM/dd/yyyy'
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {actionName}
        </Button>
      </CardContent>
    </Card>
  )
}

export default TransactionForm
