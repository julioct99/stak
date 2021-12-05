import { Grid } from '@mui/material'
import { useState } from 'react'
import CategoryList from '../../components/categories/CategoryList'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import SubcategoryDetail from '../../components/subcategories/SubcategoryDetail'
import SubcategoryList from '../../components/subcategories/SubcategoryList'
import { useCategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import { TransactionSubcategory } from '../../shared/types/transactionSubcategory'

interface SubcategoriesPageProps {}

const SubcategoriesPage: React.FunctionComponent<SubcategoriesPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | undefined
  >()
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    TransactionSubcategory | undefined
  >()

  const categories = useCategories()

  const handleCategorySelect = (category: TransactionCategory) => {
    setSelectedCategory(category)
    setSelectedSubcategory(undefined)
  }

  const handleSubcategorySelect = (subcategory: TransactionSubcategory) => {
    setSelectedSubcategory(subcategory)
  }

  return (
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
        <Grid item xs={3}>
          <GridItemContent>
            <SubcategoryList
              category={selectedCategory}
              onSelectSubcategory={handleSubcategorySelect}
            />
          </GridItemContent>
        </Grid>
      )}
      {selectedSubcategory && (
        <Grid item xs={6}>
          <GridItemContent>
            <SubcategoryDetail subcategory={selectedSubcategory} />
          </GridItemContent>
        </Grid>
      )}
    </Grid>
  )
}

export default SubcategoriesPage
