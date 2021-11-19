import { useEffect, useState } from 'react';
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
      .then((data) => setWallets(data));

    fetch(categoriesUrl)
      .then((data) => data.json())
      .then((data) => setCategories(data));

    fetch(subcategoriesUrl)
      .then((data) => data.json())
      .then((data) => setSubcategories(data));
  }, []);

  return (
    <div>
      <h1>Wallets</h1>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>{JSON.stringify(wallet)}</li>
        ))}
      </ul>

      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{JSON.stringify(category)}</li>
        ))}
      </ul>

      <h1>Subcategories</h1>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>{JSON.stringify(subcategory)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
