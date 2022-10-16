import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        button: {
            fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(',')
        },
        textareaAutosize:{
            fontFamily: ['Roboto Mono', 'monospace'].join(',')
        }    
    },
    
})

export default theme;