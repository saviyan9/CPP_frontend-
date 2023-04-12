import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import Logo from '../Logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';


import { setStationery, searchAllProducts } from '../redux/actions/actions';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function DrawerAppBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value)
  }

  const searchProducts = () => {
    dispatch(searchAllProducts(search))
  }

  const navigateToHome = () => {
    navigate('/')
  }
  const navigateToUsersignup = () => {
    navigate('/signup')
  }
  const navigateToUserLogin = () => {
    navigate('/login')
  }

  const navigateToDbSignup = () => {
    navigate('/deliveryboysignup')
  }

  const navigateToDashboard = () => {
    navigate('/orders')
  }
  // const navigateToDbLogin

  const applyFilter = () => {
    dispatch(setStationery())
  }


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'flex-start' }}>
      <img
        onClick={navigateToHome}
        style={{ height: '79px' }}
        src={Logo}
      />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <ListItemText >Home</ListItemText>
            <ListItemText onClick={navigateToDbSignup} >Sign up as delivery boy</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>


    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ display: 'flex', backgroundColor: '#000000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, display: 'flex' }}
          >
            <img
              onClick={navigateToHome}
              style={{height:'60px'}}
              className="header_logo"
              src={Logo}
            />
          </Typography>
          
          <Search sx={{ marginLeft: 5, display: 'flex' }}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
          </Search>
          <Button onClick={searchProducts} sx={{ ':hover': { bgcolor: 'black', color: 'white' }, bgcolor: '#155b8a', margin: '10px' }} variant="contained"><SearchIcon /></Button>

          {
            localStorage.getItem('user') ?
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button onClick={navigateToHome} sx={{ color: '#fff' }}>Home</Button>
                <Button onClick={navigateToDashboard} sx={{ color: '#fff' }}>My Orders</Button>
               
            </Box>
            :
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button onClick={navigateToHome} sx={{ color: '#fff' }}>Home</Button>
                <Button onClick={navigateToUsersignup} sx={{ color: '#fff' }}>Sign up</Button>
                <Button onClick={navigateToUserLogin} sx={{ color: '#fff' }}>Login</Button>
                <Button onClick={navigateToDbSignup} sx={{ color: '#fff' }}>Delivery boy</Button>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;