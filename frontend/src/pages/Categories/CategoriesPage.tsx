import { Fab, Grid, useTheme } from '@mui/material'
import { useState } from 'react'
import { GridItemContent } from '../../components/layout/GridItemContent/GridItemContent'
import { useCategories } from '../../shared/api/queries'
import { TransactionCategory } from '../../shared/types/transactionCategory'
import CategoryDetail from '../../components/categories/CategoryDetail'
import CategoryList from '../../components/categories/CategoryList'
import { Add } from '@mui/icons-material'
import Modal from '../../components/Modal'
import CategoryForm from '../../components/categories/CategoryForm'

interface CategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<CategoriesPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | undefined
  >()
  const [modalOpen, setModalOpen] = useState(false)

  const theme = useTheme()
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

export default CategoriesPage
