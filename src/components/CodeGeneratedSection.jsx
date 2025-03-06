import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MDEditor from "@uiw/react-md-editor";

export default function CodeGeneratedSection({ generatedCode }) {
  return (
    <Container
      maxWidth="sx"
      sx={{
        bgcolor: '#303134',
        borderRadius: '1%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        padding: '1%',
        marginRight: '2%',
        marginTop: -1,
      }}
    >
    
      {generatedCode ? (
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          <MDEditor value={generatedCode} preview="preview"
           style={{
            minHeight: "100%", 
            height: "100%", 
            width: "100%",
            backgroundColor: "#303134", 
          }}  />
        </Box>
      ) : (
        <p style={{ color: "white", fontFamily: 'JetBrains Mono',}}>Click "Generate" to see the code...</p>
      )}
    </Container>
  );
}
