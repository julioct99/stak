import { Add } from '@mui/icons-material'
import { Fab, Grid, useTheme } from '@mui/material'
import { useState } from 'react'
import CategoryList from '../../components/categories/CategoryList'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import Modal from '../../components/Modal'
import SubcategoryDetail from '../../components/subcategories/SubcategoryDetail'
import SubcategoryForm from '../../components/subcategories/SubcategoryForm'
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
  const [modalOpen, setModalOpen] = useState(false)

  const theme = useTheme()
  const categories = useCategories()

  const handleCategorySelect = (category: TransactionCategory) => {
    setSelectedCategory(category)
    setSelectedSubcategory(undefined)
  }

  const handleSubcategorySelect = (subcategory: TransactionSubcategory) => {
    setSelectedSubcategory(subcategory)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <SubcategoryForm onSubmit={handleModalClose} />
      </Modal>
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
      <Fab
        size='large'
        color='primary'
        onClick={() => setModalOpen(true)}
        sx={{ position: 'absolute', bottom: theme.spacing(4), right: theme.spacing(4) }}
      >
        <Add />
      </Fab>
    </>
  )
}

export default SubcategoriesPage
