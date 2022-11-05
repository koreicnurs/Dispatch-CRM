import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#596CB4',
            main: '#314694',
            dark: '#192B6D',
            contrastText: '#fff',
        }
    },
    typography: {
        "fontFamily": `"Lato", sans-serif`,
        "fontSize": 16,
        "fontWeightRegular": 400,
        "fontWeightBold": 700,
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            }
        }
    },
});

export default theme;