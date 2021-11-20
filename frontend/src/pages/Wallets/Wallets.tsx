import { useEffect, useState } from 'react';
import { getWalletListUrl } from '../../shared/api/urls';
import { Wallet } from '../../shared/types/wallet';

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    fetch(getWalletListUrl())
      .then((data) => data.json())
      .then(setWallets);
  }, []);

  return (
    <>
      <h1>Wallets</h1>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            <pre>{JSON.stringify(wallet, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WalletsPage;
