import { Button } from '@mui/material';
import Container from '@mui/material/Container';

export default function GenerateCode() {
  return (
    <Container
      maxWidth="sx"
      sx={{
        height: '10vh',
        flex: 1,
        marginLeft: -1,
        width: '50vh',
        }}
    >

      <Button
      variant="contained"
      sx={{
        bgcolor: '#b8dbd9',
        color: 'black',
        fontFamily: 'JetBrains Mono',
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '15%',
        paddingRight: '15%',
        height: "75%",
        minHeight: "75%",
        width: "100%",
        maxWidth: "500px",
      }}
      >GENERATE</Button>
    </Container>
  );
}