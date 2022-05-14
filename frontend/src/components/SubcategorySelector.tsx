import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategories, useSubcategories } from '../shared/api/queries'

interface SubcategorySelectorProps {
  onSubcategorySelect: (subcategoryId: number) => void
}

const SubcategorySelector: React.FunctionComponent<SubcategorySelectorProps> = ({
  onSubcategorySelect,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>()

  const categories = useCategories()
  const subcategories = useSubcategories(selectedCategoryId)
  const theme = useTheme()

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const handleCategorySelect = (e: SelectChangeEvent) => {
    setSelectedCategoryId(+e.target.value)
  }

  const handleSubcategorySelect = (e: SelectChangeEvent) => {
    onSubcategorySelect(+e.target.value)
  }

  const categorySelector = (
    <>
      <InputLabel id='category'>Category</InputLabel>
      <Select
        label='Category'
        labelId='category'
        sx={inputStyle}
        onChange={handleCategorySelect}
      >
        {categories.data?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )

  const subcategorySelector = (
    <>
      <InputLabel id='subcategory'>Subcategory</InputLabel>
      <Select
        label='Subcategory'
        labelId='subcategory'
        sx={inputStyle}
        onChange={handleSubcategorySelect}
      >
        {subcategories.data?.map((subcategory) => (
          <MenuItem key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )

  const noCategoriesMessage = (
    <p>
      Yo have no categories. Create one in the{' '}
      <Link to='/categories'>categories page</Link>.
    </p>
  )

  const noSubcategoriesMessage = (
    <p>
      Yo have no subcategories. Create one in the{' '}
      <Link to='/subcategories'>subcategories page</Link>.
    </p>
  )

  const shouldShowCategorySelector = categories.data && categories.data.length > 0
  const shouldShowSubcategorySelector =
    subcategories.data && subcategories.data.length > 0 && shouldShowCategorySelector

  return (
    <>
      <FormControl fullWidth>
        {shouldShowCategorySelector ? categorySelector : noCategoriesMessage}
      </FormControl>
      {!!selectedCategoryId && (
        <FormControl fullWidth>
          {shouldShowSubcategorySelector ? subcategorySelector : noSubcategoriesMessage}
        </FormControl>
      )}
    </>
  )
}

export default SubcategorySelector
