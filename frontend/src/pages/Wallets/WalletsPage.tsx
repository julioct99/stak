import { Grid } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useWallets } from '../../shared/api/queries'
import { Wallet } from '../../shared/types/wallet'
import WalletDetail from './WalletDetail/WalletDetail'
import WalletList from './WalletList'

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>()

  const wallets = useWallets()

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet)
  }

  return (
    <>
      {wallets.isLoading ? <p>Loading...</p> : null}
      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={3}>
          <GridItemContent>
            <WalletList wallets={wallets.data} onSelectWallet={handleWalletSelect} />
          </GridItemContent>
        </Grid>
        {selectedWallet && (
          <Grid item xs={9}>
            <GridItemContent>
              <WalletDetail wallet={selectedWallet} />
            </GridItemContent>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default WalletsPage
