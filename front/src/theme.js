import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#596CB4',
            main: '#314694',
            dark: '#192B6D',
            red: '#D52230',
            grey: '#9FA7C3',
            whitish: '#F0F2FE',
            contrastText: '#fff'
        },
        text: {primary: '#314694'}
    },
    typography: {
        fontFamily: `"Lato", sans-serif`,
        fontSize: 16,
        fontWeightRegular: 400,
        fontWeightBold: 700,
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