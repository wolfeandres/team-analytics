import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { ArrowBack, FileUpload, Storage } from '@mui/icons-material';
import FileInput from "../FileInput";
import { useState } from "react";
import DatabasePage from './DatabasePage'
import DatabaseHandler from "../Handlers/DatabaseHandler";

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
    },

    container: {
        position: 'relative' as const
    },

    backArrow: {
        position: 'absolute' as const,
        top: -45,
    }
};

interface Props {
    passFiles: (arg: any) => void
}

var data: any[]

const UploadPage: React.FC<Props> = ({passFiles}) => {
    const [dbPage, setdbPage] = useState<Boolean>(false)

    DatabaseHandler.getDatabaseEntries()
    .then((result: any[]) => {
        data = result
        console.log(data.slice(1))
    })
    .catch((e: any) => {
        console.log(e);
    })

    var renderUpload = (
        <div style={styles.buttons}>
            <Box mb={1}>
                <Button variant='contained' style={styles.button} endIcon={<FileUpload/>} component='label'>
                    Browse
                    <FileInput passFiles={passFiles}/>
                </Button>
            </Box>
            <Box mt={1}>
                <Button variant='contained' style={styles.button} endIcon={<Storage/>} onClick={() => {setdbPage(true)}}>Database</Button>
            </Box>
        </div>
    )

    if (dbPage) {
        renderUpload = (
            <div style={styles.buttons}>
                <Button style={styles.backArrow} onClick={() => {setdbPage(false)}}variant='contained' startIcon={<ArrowBack/>}>Back</Button>
                <DatabasePage passFiles={passFiles} data={data.slice(1)}/>
            </div>
        )
    }

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
                {renderUpload}
            </div>
        </div>
    )
}

export default UploadPage