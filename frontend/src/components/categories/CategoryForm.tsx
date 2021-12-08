import { useRef } from 'react'
import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Button,
  useTheme,
  TextField,
} from '@mui/material'
import { TransactionCategoryPost } from '../../shared/types/transactionCategory'
import { CategoryService } from '../../shared/api/services/categories'
import { useCategories } from '../../shared/api/queries'

interface CategoryFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const CategoryForm: React.FunctionComponent<CategoryFormProps> = ({
  onSubmit,
  editMode,
}) => {
  const theme = useTheme()
  const categories = useCategories()

  const nameInputRef = useRef<HTMLInputElement>()

  const handleSubmit = () => {
    if (!nameInputRef.current) return

    const category: TransactionCategoryPost = {
      name: nameInputRef.current?.value,
    }

    CategoryService.create(category).then(() => categories.refetch())
    onSubmit()
  }

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const formTitle = `${editMode ? 'Edit' : 'New'} Category`
  const actionName = editMode ? 'Save' : 'Add'

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <form>
          <Container>
            <Typography variant='h3'>{formTitle}</Typography>
            <Box marginBottom={2} marginTop={2}>
              <TextField
                type='text'
                fullWidth
                label='Name'
                sx={inputStyle}
                inputRef={nameInputRef}
              />
            </Box>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              {actionName}
            </Button>
          </Container>
        </form>
      </CardContent>
    </Card>
  )
}

export default CategoryForm
