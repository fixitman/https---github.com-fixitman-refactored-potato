import { red } from '@mui/material/colors';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({    
    typography:{
        fontFamily: "Rubik"
    },
    
});

function ThemeProvider({ children }) {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider