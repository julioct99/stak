import { Grid, useTheme } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useCategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import CategoryDetail from '../../components/categories/CategoryDetail'
import CategoryList from '../../components/categories/CategoryList'
import Modal from '../../components/Modal'
import CategoryForm from '../../components/categories/CategoryForm'
import PageFabs from '../../components/PageFabs'

interface CategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<CategoriesPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)

  const categories = useCategories()

  const handleCategorySelect = (category: TransactionCategory) => {
    setSelectedCategory(category)
  }

  const handleCategoryDeselect = () => {
    setSelectedCategory(undefined)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <CategoryForm onSubmit={handleModalClose} />
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
          <Grid item xs={9}>
            <GridItemContent>
              <CategoryDetail
                category={selectedCategory}
                onCategoryDeselect={handleCategoryDeselect}
              />
            </GridItemContent>
          </Grid>
        )}
      </Grid>
      <PageFabs onMainFabClick={() => setModalOpen(true)} mainFabTitle='Add Category' />
    </>
  )
}

export default CategoriesPage
