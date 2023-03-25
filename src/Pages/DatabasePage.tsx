import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import DatabaseHandler from "../Handlers/DatabaseHandler";

const renderRow = (props: ListChildComponentProps & { passFiles: (arg: any) => void}) => {
    const { data, index, style, passFiles } = props

    const handleClick = async () => {
        let files = []
        files.push(data[index])

        var partner: any
        console.log(data[index])

        try {
            if (data[index].workout.partners.length == 0 || data[index].workout.partners[0].name === '' || data[index].workout.partners[0].name === null) {
                partner = data[index]
            } else {
                partner = await DatabaseHandler.getPartnerJSON(data[index])
            }
        } catch (e) {
            partner = data[index]
        }

        files.push(partner)
        passFiles(files)
    }

    var name: string | undefined | null;

    try {
        if (data[index].name == '' || data[index].name == null) {
            name = "No name " + index 
        } else {
            name = data[index].name
        }
    } catch (e) {
        name = "#"
    }

    var partnerName: string | undefined | null;

    try {
        if (data[index].workout.partners.length == 0 || data[index].workout.partners[0].name == '' || data[index].workout.partners[0].name == null) {
            partnerName = ' | No name'
        } else {
            partnerName = " | " + data[index].workout.partners[0].name
        }
    } catch (e) {
        partnerName = ' | #'
    }
    
    return (
        <ListItem style={style} key={data[index]._id} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={name + partnerName} secondary={(new Date(data[index].workout.start_timestamp * 1000)).toLocaleDateString()}/>
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