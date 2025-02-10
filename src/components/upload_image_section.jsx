import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import "@fontsource/jetbrains-mono";

export default function UploadImageSection({ onPlantUMLGenerated }) {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const greencolor = '#B6D9D7';
  const black = '#0d1117';

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setScale(1);

      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', file);

      try {
        setIsProcessing(true); // Indicate that processing has started

        // Send the image to the backend
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.plantUML) {
          // Pass the generated PlantUML syntax to the parent component
          onPlantUMLGenerated(data.plantUML);
        } else {
          console.error('Failed to generate PlantUML:', data.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsProcessing(false); // Stop processing indicator
      }
    }
  };

  const handleZoom = (event) => {
    event.preventDefault();
    setScale((prevScale) => {
      const newScale = event.deltaY < 0 ? prevScale + 0.1 : prevScale - 0.1;
      return Math.min(Math.max(newScale, 1), 3);
    });
  };

  return (
    <Container
      maxWidth="sx"
      sx={{
        bgcolor: black,
        borderRadius: '1vh',
        height: '50vh',
        flex: 1,
        marginTop: -1,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {image ? (
        <Box
          sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
          onWheel={handleZoom}
        >
          <img
            src={image}
            alt="Uploaded"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${scale})`,
              transition: 'transform 0.2s ease-in-out',
            }}
          />

          {/* Upload Button at the Bottom-Right */}
          <Button
            component="label"
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              bgcolor: 'rgba(77, 75, 75, 0.99)',
              color: 'white',
              borderRadius: '50%',
              width: 60,
              height: 60,
              minWidth: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': { bgcolor: 'rgba(134, 131, 131, 0.99)' },
            }}
          >
            <AddIcon sx={{ fontSize: 28, color: greencolor }} />
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Button>

          {isProcessing && (
            <Typography
              sx={{
                position: 'absolute',
                bottom: 70,
                right: 16,
                color: greencolor,
                fontSize: '14px',
              }}
            >
              Processing...
            </Typography>
          )}
        </Box>
      ) : (
        // Centered Upload Button + Label Before Image Upload
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            component="label"
            variant="contained"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: greencolor,
              borderRadius: '50%',
              width: 60,
              height: 60,
              minWidth: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Button>

          {/* Text Label Below the Button */}
          <Typography
            sx={{
              color: greencolor,
              marginTop: 1.5,
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
              fontFamily: 'JetBrains Mono',
            }}
          >
            Upload a Class Diagram
          </Typography>
        </Box>
      )}
    </Container>
  );
}
