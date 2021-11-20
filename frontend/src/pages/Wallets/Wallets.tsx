import { useWallets } from '../../shared/api/queries';

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const wallets = useWallets();

  return (
    <>
      <h1>Wallets</h1>
      {wallets.isLoading ? <p>Loading...</p> : null}
      <ul>
        {wallets.data?.map((wallet) => (
          <li key={wallet.id}>
            <pre>{JSON.stringify(wallet, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WalletsPage;
