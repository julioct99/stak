import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useCategories } from '../shared/api/queries'

interface CategorySelectorProps {
  onCategorySelect: (categoryId: number) => void
}

const CategorySelector: React.FunctionComponent<CategorySelectorProps> = ({
  onCategorySelect,
}) => {
  const categories = useCategories()
  const theme = useTheme()

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const handleCategorySelect = (e: SelectChangeEvent) => {
    onCategorySelect(+e.target.value)
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

  const noCategoriesMessage = (
    <p>
      Yo have no categories. Create one in the{' '}
      <Link to='/categories'>categories page</Link>.
    </p>
  )

  const shouldShowCategorySelector = categories.data && categories.data.length > 0

  return (
    <FormControl fullWidth>
      {shouldShowCategorySelector ? categorySelector : noCategoriesMessage}
    </FormControl>
  )
}

export default CategorySelector
