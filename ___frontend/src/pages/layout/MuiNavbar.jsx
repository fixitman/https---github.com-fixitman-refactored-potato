import { Box, AppBar, Toolbar, IconButton, Typography, Button, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import LogInOut from '../../components/LogInOut';



const MuiNavbar = () => {
    const { palette } = useTheme()
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" >
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                        List App
                    </Typography>
                    <LogInOut />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MuiNavbar