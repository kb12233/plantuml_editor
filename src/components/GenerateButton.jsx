import { Button } from '@mui/material';
import Container from '@mui/material/Container';

export default function GenerateCode({ onClick }) {
  return (
    <Container
      maxWidth="sx"
      sx={{
        height: '8vh',
        flex: 1,
        marginLeft: -0.5,
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
          maxWidth: "11000px",
        }}
        onClick={onClick} // ✅ Trigger the function when clicked
      >
        GENERATE
      </Button>
    </Container>
  );
}
