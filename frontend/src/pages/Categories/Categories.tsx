import { useCategories, useSubcategories } from '../../shared/api/queries';

interface CategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<CategoriesPageProps> = () => {
  const categories = useCategories();
  const subcategories = useSubcategories(1);

  return (
    <>
      <h1>Categories</h1>
      {categories.isLoading ? <p>Loading...</p> : null}
      <ul>
        {categories.data?.map((category) => (
          <li key={category.id}>
            <pre>{JSON.stringify(category, null, 2)}</pre>
          </li>
        ))}
      </ul>

      <h1>Subcategories</h1>
      {subcategories.isLoading ? <p>Loading...</p> : null}
      <ul>
        {subcategories.data?.map((subcategory) => (
          <li key={subcategory.id}>
            <pre>{JSON.stringify(subcategory, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesPage;
