import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FormatListBulletedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TODO LIST
          </Typography>
          <Box 
            sx={{ 
              marginLeft: 'auto'
            }}
          >
            <NavLink to="/app/auth/log-out" style={{ color: 'white' }}>
              <LogoutIcon />
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar;