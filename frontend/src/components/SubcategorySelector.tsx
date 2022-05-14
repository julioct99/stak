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

import { useSubcategories } from '../shared/api/queries'
import CategorySelector from './CategorySelector'

interface SubcategorySelectorProps {
  onSubcategorySelect: (subcategoryId: number) => void
}

const SubcategorySelector: React.FunctionComponent<SubcategorySelectorProps> = ({
  onSubcategorySelect,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>()

  const subcategories = useSubcategories(selectedCategoryId)

  const theme = useTheme()

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const handleSubcategorySelect = (e: SelectChangeEvent) => {
    onSubcategorySelect(+e.target.value)
  }

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

  const noSubcategoriesMessage = (
    <p>
      Yo have no subcategories. Create one in the{' '}
      <Link to='/subcategories'>subcategories page</Link>.
    </p>
  )

  const shouldShowSubcategorySelector =
    subcategories.data && subcategories.data.length > 0

  return (
    <>
      <CategorySelector onCategorySelect={setSelectedCategoryId} />
      {!!selectedCategoryId && (
        <FormControl fullWidth>
          {shouldShowSubcategorySelector ? subcategorySelector : noSubcategoriesMessage}
        </FormControl>
      )}
    </>
  )
}

export default SubcategorySelector
