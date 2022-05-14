import { Grid } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useWallets } from '../../shared/api/queries'
import { Wallet } from '../../shared/types/wallet'
import WalletDetail from '../../components/wallets/WalletDetail/WalletDetail'
import WalletList from '../../components/wallets/WalletList'
import Modal from '../../components/Modal'
import WalletForm from '../../components/wallets/WalletForm'
import PageFabs from '../../components/PageFabs'

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  const wallets = useWallets()

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet)
  }

  const handleWalletDeselect = () => {
    setSelectedWallet(undefined)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <WalletForm onSubmit={handleModalClose} />
      </Modal>
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
              <WalletDetail
                wallet={selectedWallet}
                onWalletDeselect={handleWalletDeselect}
              />
            </GridItemContent>
          </Grid>
        )}
      </Grid>
      <PageFabs onMainFabClick={() => setModalOpen(true)} mainFabTitle='Add Wallet' />
    </>
  )
}

export default WalletsPage
