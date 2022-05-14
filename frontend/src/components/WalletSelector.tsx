import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useWallets } from '../shared/api/queries'

interface WalletSelectorProps {
  onWalletSelect: (walletId: number) => void
}

const WalletSelector: React.FunctionComponent<WalletSelectorProps> = ({
  onWalletSelect,
}) => {
  const theme = useTheme()
  const wallets = useWallets()

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const handleWalletSelect = (e: SelectChangeEvent) => {
    onWalletSelect(+e.target.value)
  }

  const selector = (
    <>
      <InputLabel id='walletId'>Wallet</InputLabel>
      <Select
        label='Wallet'
        labelId='walletId'
        sx={inputStyle}
        onChange={handleWalletSelect}
      >
        {wallets.data?.map((wallet) => (
          <MenuItem key={wallet.id} value={wallet.id}>
            {wallet.title}
          </MenuItem>
        ))}
      </Select>
    </>
  )

  const noWalletsMessage = (
    <p>
      Yo have no wallets. Create one in the <Link to='/wallets'>wallets page</Link>.
    </p>
  )

  const shouldShowSelector = wallets.data && wallets.data?.length > 0

  return (
    <FormControl fullWidth>
      {shouldShowSelector ? selector : noWalletsMessage}
    </FormControl>
  )
}

export default WalletSelector
