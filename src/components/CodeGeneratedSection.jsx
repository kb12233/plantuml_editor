import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function CodeGeneratedSection() {
  return (
    <Container
      maxWidth="sx"
      sx={{
        bgcolor: '#303134',
        borderRadius: '1%',
        height: '100%',
        display: 'flex',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        marginTop: -1,
        // marginRight: 2,
        padding: '1%',
        marginRight: '2%',
      }}
    >
      <Box sx={{ height: '100%' }} />
    </Container>
  );
}