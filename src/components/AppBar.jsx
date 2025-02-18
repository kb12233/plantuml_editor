import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/material';
import Sidebar from './sidebar';
import logoDark from '../assets/images/logo_dark.png';
import UMLPopup from './Sample';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [category, setCategory] = React.useState('');
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const greencolor = '#B6D9D7';
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#121212', maxHeight: '10vh', width: '100vw' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: isMobile ? 1 : 3 }}>
          {/* Left Side: Menu Icon + Model Select */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {!isMobile && (
              <FormControl sx={{ minWidth: 150 }} size="small">
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  displayEmpty
                  renderValue={category !== "" ? undefined : () => "Select Model"}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#121212', color: greencolor } } }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#303134' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: greencolor },
                    '.MuiSvgIcon-root': { color: greencolor, fontSize: 20 },
                    color: 'white',
                    fontFamily: 'JetBrains Mono',
                    fontSize: 16,
                  }}
                >
                  <MenuItem value="ChatGPT 4o" sx={{ fontFamily: 'JetBrains Mono' }}>ChatGPT 4o</MenuItem>
                  <MenuItem value="Gemini" sx={{ fontFamily: 'JetBrains Mono' }}>Gemini</MenuItem>
                  <MenuItem value="Deepseek" sx={{ fontFamily: 'JetBrains Mono' }}>Deepseek</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>

          {/* Centered Logo */}
          {!isMobile && (
            <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <img src={logoDark} alt="Logo" style={{ height: 50 }} />
            </Box>
          )}

          {/* Right Side: User Icon */}
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <AccountCircle fontSize='large' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ '.MuiPaper-root': { bgcolor: '#303134', color: greencolor } }}
          >
            <MenuItem onClick={handleClose} sx={{ fontFamily: 'JetBrains Mono' }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontFamily: 'JetBrains Mono' }}>
              My account
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Component */}
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
}