import { useEffect, useState } from 'react';
import Layout from './components/layout/Layout/Layout';
import { TransactionCategory } from './shared/types/transactionCategory';
import { TransactionSubcategory } from './shared/types/transactionSubcategory';
import { Wallet } from './shared/types/wallet';

const baseUrl = 'http://localhost:8000/api';

const walletsUrl = `${baseUrl}/wallets`;
const categoriesUrl = `${baseUrl}/categories`;
const subcategoriesUrl = `${categoriesUrl}/1/subcategories`;

function App() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TransactionSubcategory[]>([]);

  useEffect(() => {
    fetch(walletsUrl)
      .then((data) => data.json())
      .then(setWallets);

    fetch(categoriesUrl)
      .then((data) => data.json())
      .then(setCategories);

    fetch(subcategoriesUrl)
      .then((data) => data.json())
      .then(setSubcategories);
  }, []);

  return (
    <Layout>
      <>
        <h1>Wallets</h1>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id}>
              <pre>{JSON.stringify(wallet, null, 2)}</pre>
            </li>
          ))}
        </ul>

        <h1>Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <pre>{JSON.stringify(category, null, 2)}</pre>
            </li>
          ))}
        </ul>

        <h1>Subcategories</h1>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <pre>{JSON.stringify(subcategory, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </>
    </Layout>
  );
}

export default App;
