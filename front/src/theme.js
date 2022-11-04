import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#314694'
        }
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