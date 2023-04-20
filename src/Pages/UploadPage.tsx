import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { ArrowBack, FileUpload, Storage } from '@mui/icons-material';
import FileInput from "../FileInput";
import { useState } from "react";
import DatabasePage from './DatabasePage'
import DatabaseHandler from "../Handlers/DatabaseHandler";
import * as XLSX from 'xlsx';
import flatten from 'flat';

function exportToExcel(data: any[], filePath: string) {
    const flattenedData = data.map((item) => flatten(item, { delimiter: '_' }));
    const keys = Object.keys(flattenedData[0] as any);
    const worksheet = XLSX.utils.json_to_sheet(flattenedData, { header: keys });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Console Logs');
    XLSX.writeFile(workbook, filePath);
  }

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
        result.sort((a, b) => {
            // Sort database entries by timestamp
            var timestampA: number
            var timestampB: number 

            // If the timestamp format is wrong set to 0
            try {
                if (typeof a['workout']['start_timestamp'] === 'number') {
                    timestampA = a['workout']['start_timestamp'];
                } else {
                    timestampA = 0
                }
            } catch (e) {
                timestampA = 0
            }

            try {
                if (typeof b['workout']['start_timestamp'] === 'number') {
                    timestampB = b['workout']['start_timestamp'];
                } else {
                    timestampB = 0
                }
            } catch (e) {
                timestampB = 0
            }
        
            return timestampB - timestampA;  
        })

        data = result
        console.log(data)
        // exportToExcel(data, "console-log-res.xlsx");
        // console.log(data.slice(1))
    })
    .catch((e: any) => {
        console.log(e);
    })

    var renderUpload = (
        <div style={styles.buttons}>
            <Box mb={1}>
                <Button variant='contained' style={styles.button} endIcon={<FileUpload/>} component='label'>
                    Upload
                    <FileInput passFiles={passFiles}/>
                </Button>
            </Box>
            <Box mt={1}>
                <Button variant='contained' style={styles.button} endIcon={<Storage/>} onClick={() => {setdbPage(true)}}>Database</Button>
            </Box>
        </div>
    )

    if (dbPage) {
        if (data) {
            renderUpload = (
                <div style={styles.buttons}>
                    <Button style={styles.backArrow} onClick={() => {setdbPage(false)}} variant='contained' startIcon={<ArrowBack/>}>Back</Button>
                    <DatabasePage passFiles={passFiles} data={data}/>
                </div>
            )
        } else {
            setdbPage(false)
        }
    }

    return (
        <div>
            <AppBar>
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