import { Add, AddShoppingCart } from '@mui/icons-material'
import { Fab, useTheme } from '@mui/material'

interface PageFabsProps {
  onMainFabClick: () => void
  mainFabTitle: string
}

const PageFabs: React.FunctionComponent<PageFabsProps> = ({
  onMainFabClick,
  mainFabTitle,
}) => {
  const theme = useTheme()

  return (
    <>
      <Fab
        size='large'
        color='secondary'
        title='Add Transaction'
        sx={{ position: 'absolute', bottom: theme.spacing(16), right: theme.spacing(4) }}
      >
        <AddShoppingCart />
      </Fab>
      <Fab
        size='large'
        color='primary'
        onClick={onMainFabClick}
        title={mainFabTitle}
        sx={{ position: 'absolute', bottom: theme.spacing(4), right: theme.spacing(4) }}
      >
        <Add />
      </Fab>
    </>
  )
}

export default PageFabs
