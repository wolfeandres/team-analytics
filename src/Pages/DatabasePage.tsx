import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { FixedSizeList, ListChildComponentProps } from 'react-window'

interface ListItemProps {
    id: number;
    name: string;
}
    
const items: ListItemProps[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
    { id: 9, name: 'Item 9' },
    { id: 10, name: 'Item 10' },
    { id: 11, name: 'Item 11' },
    { id: 12, name: 'Item 12' },
];

const renderRow = (props: ListChildComponentProps) => {
    const { data, index, style } = props
    return (
        <ListItem style={style} key={data[index].id} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={data[index].name} />
            </ListItemButton>
        </ListItem>
    )
} 

interface Props {
    passFiles: (arg: any) => void
}

const DatabasePage: React.FC<Props> = ({passFiles}) => {
    return (
        <Box sx={{width:'100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <FixedSizeList
                height={400}
                width={360}
                itemSize={50}
                itemCount={items.length}
                itemData={items}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    )
}

export default DatabasePage;