import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import DatabaseHandler from "../Handlers/DatabaseHandler";

const renderRow = (props: ListChildComponentProps & { passFiles: (arg: any) => void}) => {
    const { data, index, style, passFiles } = props

    const handleClick = async () => {
        let files = []
        files.push(data[index])
        const partner = await DatabaseHandler.getPartnerJSON(data[index])
        console.log(partner)
        files.push(partner)
        passFiles(files)
    }

    var name: string | undefined | null;

    try {
        name = data[index].name
    } catch (e) {
        name = "Null"
    }

    var partnerName: string | undefined | null;
    try {
        partnerName = data[index].workout.partner.name
    } catch (e) {
        partnerName = 'Null Partner'
    }
    
    return (
        <ListItem style={style} key={data[index]._id} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={name + " | " + partnerName} secondary={(new Date(data[index].workout.start_timestamp * 1000)).toLocaleDateString()}/>
            </ListItemButton>
        </ListItem>
    )
} 

interface Props {
    passFiles: (arg: any) => void
    data: any[]
}

const DatabasePage: React.FC<Props> = ({passFiles, data}) => {
    return (
        <Box sx={{width:'100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <FixedSizeList
                height={400}
                width={360}
                itemSize={50}
                itemCount={data.length}
                itemData={data}
            >
                {({ data, index, style}) => renderRow({ data, index, style, passFiles})}
            </FixedSizeList>
        </Box>
    )
}

export default DatabasePage;