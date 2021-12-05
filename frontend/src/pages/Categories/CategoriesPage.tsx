import { Grid } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useCategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import CategoryDetail from '../../components/categories/CategoryDetail'
import CategoryList from '../../components/categories/CategoryList'

interface CategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<CategoriesPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | undefined
  >()

  const categories = useCategories()

  const handleCategorySelect = (category: TransactionCategory) => {
    setSelectedCategory(category)
  }

  return (
    <>
      {categories.isLoading ? <p>Loading...</p> : null}
      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={3}>
          <GridItemContent>
            <CategoryList
              categories={categories.data}
              onSelectCategory={handleCategorySelect}
            />
          </GridItemContent>
        </Grid>
        {selectedCategory && (
          <Grid item xs={9}>
            <GridItemContent>
              <CategoryDetail category={selectedCategory} />
            </GridItemContent>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default CategoriesPage
