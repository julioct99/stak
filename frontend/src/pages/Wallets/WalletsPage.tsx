import { Grid, Typography } from '@mui/material';
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent';
import { useWallets } from '../../shared/api/queries';
import WalletDetail from './WalletDetail';
import WalletList from './WalletList';

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const wallets = useWallets();

  return (
    <>
      <Typography variant='h2'>Wallets</Typography>
      {wallets.isLoading ? <p>Loading...</p> : null}
      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={3}>
          <GridItemContent>
            <WalletList wallets={wallets.data} />
          </GridItemContent>
        </Grid>
        <Grid item xs={9}>
          <GridItemContent>
            <WalletDetail wallet={wallets.data?.[0]} />
          </GridItemContent>
        </Grid>
      </Grid>
    </>
  );
};

export default WalletsPage;
