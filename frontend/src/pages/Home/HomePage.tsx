import { Typography, useTheme } from '@mui/material';

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const theme = useTheme();

  return (
    <Typography variant='h2'>
      Welcome to <strong style={{ color: theme.palette.primary.main }}>STAK</strong>
    </Typography>
  );
};

export default HomePage;
