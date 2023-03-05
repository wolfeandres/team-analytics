import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { FileUpload, Storage } from '@mui/icons-material';
import FileInput from "../FileInput";
import { useState } from "react";

const styles = {
    bg_container: {
        backgroundImage: 'url(/BIKE.jpeg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    },

    buttons: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },

    button: {
        width: '150px'
    }
};

interface Props {
    passFiles: (arg: any) => void
}

const UploadPage: React.FC<Props> = ({passFiles}) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{my:1, marginLeft:1}}>
                        Upload Partner Workout
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={styles.bg_container}>
                <div style={styles.buttons}>
                    <Box mb={1}>
                        <Button variant='contained' style={styles.button} endIcon={<FileUpload/>} component='label'>
                            Browse
                            <FileInput passFiles={passFiles}/>
                        </Button>
                    </Box>
                    <Box mt={1}>
                        <Button variant='contained' style={styles.button} endIcon={<Storage/>}>Database</Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default UploadPage