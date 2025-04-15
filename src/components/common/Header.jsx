import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          MUI
        </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header

