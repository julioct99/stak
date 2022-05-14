import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Button,
  TextField,
  useTheme,
} from '@mui/material'
import { useState, useRef } from 'react'
import { useSubcategories } from '../../shared/api/queries'
import { SubcategoryService } from '../../shared/api/services/subcategories'
import { TransactionSubcategoryPost } from '../../shared/types/transactionSubcategory'
import CategorySelector from '../CategorySelector'

interface SubcategoryFormProps {
  editMode?: boolean
  onSubmit: () => void
}

const SubcategoryForm: React.FunctionComponent<SubcategoryFormProps> = ({
  onSubmit,
  editMode,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>()

  const subcategories = useSubcategories(selectedCategoryId)

  const theme = useTheme()

  const nameInputRef = useRef<HTMLInputElement>()

  const handleSubmit = () => {
    if (!selectedCategoryId || !nameInputRef.current) return

    const subcategory: TransactionSubcategoryPost = {
      category: selectedCategoryId,
      name: nameInputRef.current.value,
    }

    SubcategoryService.create(subcategory).then(() => subcategories.refetch())
    onSubmit()
  }

  const inputStyle = { display: 'block', marginBottom: theme.spacing(2) }

  const formTitle = `${editMode ? 'Edit' : 'New'} Subcategory`
  const actionName = editMode ? 'Save' : 'Add'

  return (
    <Card sx={{ width: '750px' }}>
      <CardContent>
        <form>
          <Container>
            <Typography variant='h3'>{formTitle}</Typography>
            <Box marginBottom={2} marginTop={2}>
              <CategorySelector onCategorySelect={setSelectedCategoryId} />
              <TextField
                type='text'
                fullWidth
                label='Title'
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

export default SubcategoryForm
