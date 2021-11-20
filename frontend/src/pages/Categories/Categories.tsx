import { useEffect, useState } from 'react';
import { getCategoryListUrl, getSubcategoryListUrl } from '../../shared/api/urls';
import { TransactionCategory } from '../../shared/types/transactionCategory';
import { TransactionSubcategory } from '../../shared/types/transactionSubcategory';

interface CategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<CategoriesPageProps> = () => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TransactionSubcategory[]>([]);

  useEffect(() => {
    fetch(getCategoryListUrl())
      .then((data) => data.json())
      .then(setCategories);

    fetch(getSubcategoryListUrl(1))
      .then((data) => data.json())
      .then(setSubcategories);
  }, []);

  return (
    <>
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
  );
};

export default CategoriesPage;
