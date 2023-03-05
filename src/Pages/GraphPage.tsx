import { FileUpload } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MyBarChart from "../Charts/MyBarChart"
import MyLineChart from "../Charts/MyLineChart"
import MyPieChart from "../Charts/MyPieChart"
import FileInput from "../FileInput"

const data = [
    {time: '10:00:00', Joy: 120, Alex: 110},
    {time: '10:10:00', Joy: 135, Alex: 125},
    {time: '10:20:00', Joy: 150, Alex: 140},
    {time: '10:30:00', Joy: 165, Alex: 155},
    {time: '10:40:00', Joy: 175, Alex: 170},
    {time: '10:50:00', Joy: 155, Alex: 145},
    {time: '11:00:00', Joy: 130, Alex: 120},
    {time: '11:00:00', Joy: 120, Alex: 110},
    {time: '11:01:00', Joy: 125, Alex: 120},
    {time: '11:02:00', Joy: 130, Alex: 115},
    {time: '11:03:00', Joy: 135, Alex: 110},
    {time: '11:04:00', Joy: 140, Alex: 120},
    {time: '11:05:00', Joy: 145, Alex: 130},
    {time: '11:06:00', Joy: 150, Alex: 125},
    {time: '11:07:00', Joy: 155, Alex: 130},
    {time: '11:08:00', Joy: 160, Alex: 125},
    {time: '11:09:00', Joy: 165, Alex: 120},
    {time: '10:10:00', Joy: 170, Alex: 130},
    {time: '10:11:00', Joy: 175, Alex: 135},
    {time: '10:12:00', Joy: 180, Alex: 125},
    {time: '10:13:00', Joy: 185, Alex: 120},
    {time: '10:14:00', Joy: 190, Alex: 125},
    {time: '10:15:00', Joy: 195, Alex: 135},
    {time: '10:16:00', Joy: 200, Alex: 140},
    {time: '10:17:00', Joy: 205, Alex: 145},
    {time: '10:18:00', Joy: 210, Alex: 150},
    {time: '10:19:00', Joy: 215, Alex: 155},
    {time: '10:20:00', Joy: 220, Alex: 160},
    {time: '10:21:00', Joy: 225, Alex: 175}
  ];

const piedata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const mergeData = (json1: any[], json2: any[]) => {
    let merged: {[key: number]: {value1?: number, value2?:number}} = {};

    json1.forEach(item => {
        merged[item.timestamp] = { value1: item.value }
    })

    json2.forEach(item => {
        if (merged[item.timestamp]) {
            merged[item.timestamp].value2 = item.value
        } else {
            merged[item.timestamp] = { value2: item.value}
        }
    })

    let result: any[] = []
    for (const timestamp in merged) {
        let date = new Date(parseInt(timestamp) * 1000)
        result.push({ timestamp: date.toLocaleTimeString(), ...merged[timestamp] })
    }

    return result
}

interface Props {
    jsons: any[]
}

const GraphPage: React.FC<Props> = ({jsons}) => {
    const heart_rate = mergeData(jsons[0]['workout']['heart_rate']['data'], jsons[1]['workout']['heart_rate']['data'])

    return (
        <div>
            <AppBar position="static" >
                <Toolbar sx={{ justifyContent: "space-between"}}>
                <Typography variant="h4" component="div" sx={{my:1, marginLeft:1}}>
                    Online Dashboard
                </Typography>
                <div />
                <Button variant="contained">Individual Data</Button>
                <Button variant="contained">Filters</Button>
                </Toolbar>
            </AppBar>
            <div style={{fontSize:'40px', marginLeft:20,  marginTop:20}}>
                Combined Data
            </div>
            <div className="main-chart">
                <MyLineChart data={heart_rate} json1={jsons[0]} json2={jsons[1]} /> 
            </div>
            <div className="small-chart">
                <MyBarChart data={data} xAxis='time' yAxis='' dkOne='Joy' dkTwo='Alex' />
                <MyPieChart data={piedata} dkOne='value' />
                <MyBarChart data={data} xAxis='time' yAxis='' dkOne='Joy' dkTwo='Alex' />
            </div>
    </div>
    )
}

export default GraphPage;