import { FileUpload } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MyBarChart from "../Charts/MyBarChart"
import MyLineChart from "../Charts/MyLineChart"
import MyPieChart from "../Charts/MyPieChart"
import FileInput from "../FileInput"
import { useState } from "react"

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

const convertData = (data: any[]) => {
    return data.map((obj) => {
        return {
            ...obj,
            timestamp: (new Date(obj.timestamp * 1000)).toLocaleTimeString()
        }
    })
}

interface Props {
    jsons: any[]
}

const GraphPage: React.FC<Props> = ({jsons}) => {
    const [individual, setIndividual] = useState<Boolean>(false)

    const heart_rate = mergeData(jsons[0]['workout']['heart_rate']['data'], jsons[1]['workout']['heart_rate']['data'])

    const events0 = (jsons[0]['events'])
    const events1 = (jsons[1]['events'])

    const distance = mergeData(jsons[0]['workout']['distance']['data'], jsons[1]['workout']['distance']['data'])

    const timestamp0: number = jsons[0]['workout']['start_timestamp']
    const date0: Date = new Date(timestamp0 * 1000)

    const timestamp1: number = jsons[1]['workout']['start_timestamp']
    const date1: Date = new Date(timestamp0 * 1000)

    const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <div style={{fontSize: '20px', marginLeft:20, marginTop:10}}>
                    {jsons[0]['name']}
                </div>
                <div style={{fontSize: '15px', marginLeft:20, marginTop:0}}>
                    Device ID - {jsons[0]['device_id']}
                </div>
                <div style={{fontSize: '15px', marginLeft:20, marginTop:0}}>
                    Start Time - {date0.toLocaleTimeString()} - {date0.toLocaleDateString()}
                </div>
            </div>
            <div>
                <div style={{fontSize: '20px', marginRight:450, marginTop:20}}>
                    {jsons[1]['name']}
                </div>
                <div style={{fontSize: '15px', marginRight:450, marginTop:0}}>
                    Device ID - {jsons[1]['device_id']}
                </div>
                <div style={{fontSize: '15px', marginRight:450, marginTop:0}}>
                    Start Time - {date1.toLocaleTimeString()} - {date1.toLocaleDateString()}
                </div>
            </div>
        </div>
    )

    var renderGraphs = (
        <div>
            <div className="main-chart">
                <MyLineChart data={heart_rate} json1={jsons[0]} json2={jsons[1]} type='heart_rate' /> 
            </div>
            <div className="small-chart">
                <MyPieChart data={events0} dkOne='value' />
                <MyLineChart data={distance} json1={jsons[0]} json2={jsons[1]} size='small' type='distance' />
                <MyPieChart data={events1} dkOne='value' />
            </div>
        </div>
    )

    if (individual) {
        renderGraphs = (
            <div>
                <div className='container'>
                    <div className='half-container'>
                        <div className='medium-chart'>
                            <MyLineChart data={convertData(jsons[0]['workout']['heart_rate']['data'])} json1={jsons[0]} size='small'/> 
                        </div>
                        <div className="small-chart">
                            <MyPieChart data={events0} dkOne='value' />
                            <MyLineChart data={convertData(jsons[0]['workout']['distance']['data'])} json1={jsons[0]} size='tiny' type='distance'/> 
                        </div>
                    </div>
                    <div className='vertical-bar'></div>
                    <div className='half-container'>
                        <div className='medium-chart'>
                            <MyLineChart data={convertData(jsons[1]['workout']['heart_rate']['data'])} json1={jsons[1]} size='small'/> 
                        </div>
                        <div className="small-chart">
                            <MyPieChart data={events1} dkOne='value' />
                            <MyLineChart data={convertData(jsons[1]['workout']['distance']['data'])} json1={jsons[1]} size='tiny' type='distance'/> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar position="static" >
                <Toolbar sx={{ justifyContent: "space-between"}}>
                <Typography variant="h4" component="div" sx={{my:1, marginLeft:1, marginRight:-90}}>
                    Online Dashboard
                </Typography>
                <div />
                <Button variant="contained" onClick={() => setIndividual(!individual)}>{individual ? "Combine Data" : "Separate Data"}</Button>
                <Button variant="contained" disabled>Filters</Button>
                </Toolbar>
            </AppBar>
            <div style={{fontSize:'40px', marginLeft:20,  marginTop:20}}>
                {individual ? "Individual Data" : "Combined Data"}
            </div>
            {header}
            {renderGraphs}
    </div>
    )
}

export default GraphPage;
