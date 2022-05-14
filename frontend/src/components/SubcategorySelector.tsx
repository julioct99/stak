import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
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

  return (
    <>
      <FormControl fullWidth>
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
      </FormControl>
      {!!selectedCategoryId && (
        <FormControl fullWidth>
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
        </FormControl>
      )}
    </>
  )
}

export default SubcategorySelector
