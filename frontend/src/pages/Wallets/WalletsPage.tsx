import { Fab, Grid, useTheme } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useWallets } from '../../shared/api/queries'
import { Wallet } from '../../shared/types/wallet'
import WalletDetail from '../../components/wallets/WalletDetail/WalletDetail'
import WalletList from '../../components/wallets/WalletList'
import WalletFormModal from '../../components/wallets/WalletFormModal'
import { Add } from '@mui/icons-material'

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  const theme = useTheme()

  const wallets = useWallets()

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <WalletFormModal modalOpen={modalOpen} onModalClose={handleModalClose} />
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
      <Fab
        size='large'
        color='primary'
        onClick={() => setModalOpen(true)}
        sx={{ position: 'absolute', bottom: theme.spacing(4), right: theme.spacing(4) }}
      >
        <Add />
      </Fab>
    </>
  )
}

export default WalletsPage
