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
import { TransactionPost } from '../../shared/types/transaction'
import { TransactionService } from '../../shared/api/services'
import { toDjangoDateString } from '../../shared/utils/date'
import { useWallets, useWalletTransactions } from '../../shared/api/queries'

interface TransactionFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const TransactionForm: React.FunctionComponent<TransactionFormProps> = ({
  onSubmit,
  editMode,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedWallet, setSelectedWallet] = useState<number | null>()
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>()

  const transactions = useWalletTransactions(selectedWallet)
  const wallets = useWallets()
  const theme = useTheme()

  const amountInputRef = useRef<HTMLInputElement>()
  const descriptionInputRef = useRef<HTMLInputElement>()

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue)
  }

  const handleSubmit = async () => {
    const transaction: TransactionPost = {
      amount: amountInputRef.current?.valueAsNumber || 0,
      description: descriptionInputRef.current?.value || '',
      date: toDjangoDateString(selectedDate),
      subcategory: selectedSubcategory || -1,
      wallet: selectedWallet || -1,
    }

    await TransactionService.create(transaction)
    transactions.refetch()
    wallets.refetch()
    onSubmit()
  }

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }
  const formTitle = `${editMode ? 'Edit' : 'New'} Transaction`
  const actionName = editMode ? 'Save' : 'Add'
  const isSaveDisabled = !selectedSubcategory || !selectedWallet

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <Typography variant='h3'>{formTitle}</Typography>
        <Box marginBottom={2} marginTop={2}>
          <WalletSelector onWalletSelect={setSelectedWallet} />
          <SubcategorySelector onSubcategorySelect={setSelectedSubcategory} />
          <TextField
            autoComplete='off'
            type='number'
            fullWidth
            label='Amount'
            inputRef={amountInputRef}
            sx={inputStyle}
          />
          <TextField
            type='text'
            fullWidth
            label='Description'
            inputRef={descriptionInputRef}
            sx={inputStyle}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date'
              inputFormat='yyyy/MM/dd'
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Button
          disabled={isSaveDisabled}
          variant='contained'
          color='primary'
          onClick={handleSubmit}
        >
          {actionName}
        </Button>
      </CardContent>
    </Card>
  )
}

export default TransactionForm
