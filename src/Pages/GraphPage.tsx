import { AppBar, Toolbar, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, FormControlLabel, DialogActions, Checkbox } from "@mui/material"
import MyBarChart from "../Charts/MyBarChart"
import MyLineChart from "../Charts/MyLineChart"
import MyPieChart from "../Charts/MyPieChart"
import FileInput from "../FileInput"
import { useEffect, useState } from "react"
import { ArrowBack } from "@mui/icons-material"
import MyComposedChart from "../Charts/MyComposedChart"
import getElevation from "../Handlers/ElevationHandler"
import { isTemplateMiddleOrTemplateTail } from "typescript"

// Merges data from both JSONS to be read by recharts
const mergeData = (json1: any[], json2: any[]) => {
    let merged: {[key: number]: {value1?: number, value2?:number}} = {};

    json1.forEach(item => {
        merged[item.timestamp] = { value1: Math.trunc(item.value * 100) / 100 }
    })

    json2.forEach(item => {
        if (merged[item.timestamp]) {
            merged[item.timestamp].value2 = Math.trunc(item.value * 100) / 100
        } else {
            merged[item.timestamp] = { value2: Math.trunc(item.value * 100) / 100}
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
    return data.map((item) => {
        return {
            value: Math.trunc(item.value * 100) / 100,
            timestamp: (new Date(item.timestamp * 1000)).toLocaleTimeString()
        }
    })
}
interface Props {
    jsons: any[]
    updateFiles: (arg: any) => void
}

const GraphPage: React.FC<Props> = ({jsons, updateFiles}) => {
    const [individual, setIndividual] = useState<boolean>(false)
    const [filtersDialog, setFiltersDialog] = useState<boolean>(false)
    const [chosenData, setChosenData] = useState<string>('heart_rate')
    const [data, setData] = useState<any>(null)

    // Cycle through data in this order to display as default
    const dataOptions = ['heart_rate', 'distance', 'steps', 'calories', 'speed']

    let tempData: any[]
    for (let i = 1; i < dataOptions.length; i++) {
        try {
            tempData = mergeData(jsons[0]['workout'][chosenData]['data'], jsons[1]['workout'][chosenData]['data'])
            break
        } catch(e) {
            setChosenData(dataOptions[i])
        }
    }

    // Get elevation data
    interface LatLng {
        lat: number;
        lng: number;
    }

    var locations: LatLng[] = [];

    try {
        for (let i = 0; i < jsons[0]['workout']['location']['data'].length; i++) {
            const [lat, lng] = jsons[0]['workout']['location']['data'][i].value.split('/').map(Number)
            locations.push({lat: lat, lng: lng});
        }
    } catch (e) {
        locations = []
    }

    const fetchElevationData = async () => {
        const elevationData: any = await getElevation(locations, tempData.length);

        let temperData = tempData
        for (let i = 0; i < temperData.length; i++) {
            temperData[i].elevation = elevationData.results[i].elevation;
        }
        setData(temperData);
        console.log(temperData)
    }

    useEffect(() => {
        fetchElevationData();
    }, [])

    const updateData = (chosenData: string) => {
        setChosenData(chosenData)
        fetchElevationData();
    }

    const events0 = (jsons[0]['events'])
    const events1 = (jsons[1]['events'])

    const timestamp0: number = jsons[0]['workout']['start_timestamp']
    const date0: Date = new Date(timestamp0 * 1000)

    const timestamp1: number = jsons[1]['workout']['start_timestamp']
    const date1: Date = new Date(timestamp0 * 1000)

    const header = (
        <div style={{ display: 'flex'}}>
            <div style={{ width:'50%', float:'left'}}>
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
            <div style={{ width:'50%', float:'right'}}>
                <div style={{fontSize: '20px', marginLeft:20, marginTop:10}}>
                    {jsons[1]['name']}
                </div>
                <div style={{fontSize: '15px', marginLeft:20, marginTop:0}}>
                    Device ID - {jsons[1]['device_id']}
                </div>
                <div style={{fontSize: '15px', marginLeft:20, marginTop:0}}>
                    Start Time - {date1.toLocaleTimeString()} - {date1.toLocaleDateString()}
                </div>
            </div>
        </div>
    )

    var renderGraphs = (
        <div>
            <div className="main-chart">
                {/* <MyLineChart data={data} json1={jsons[0]} json2={jsons[1]} type={chosenData} />  */}
                <MyComposedChart data={data} json1={jsons[0]} json2={jsons[1]} type={chosenData} />
            </div>
            <div className="small-chart">
                <MyPieChart data={events0} dkOne='value' />
                {/* <MyLineChart data={distance} json1={jsons[0]} json2={jsons[1]} size='small' type='distance' /> */}
                <MyPieChart data={events1} dkOne='value' />
            </div>
        </div>
    )

    if (individual) {
        renderGraphs = (
            <div style={{ display:'flex' }}>
                <div style={{ width:'50%', float:'left' }}>
                    <div className='medium-chart'>
                        <MyLineChart data={convertData(jsons[0]['workout'][chosenData]['data'])} json1={jsons[0]} type={chosenData} size='small'/> 
                    </div>
                    <div className="small-chart">
                        <MyPieChart data={events0} dkOne='value' />
                    </div>
                </div>
                <div className='vertical-bar'></div>
                <div style={{ width:'50%', float:'right' }}>
                    <div className='medium-chart'>
                        <MyLineChart data={convertData(jsons[1]['workout'][chosenData]['data'])} type={chosenData} json1={jsons[1]} size='small'/> 
                    </div>
                    <div className="small-chart">
                        <MyPieChart data={events1} dkOne='value' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ paddingBottom:16 }}>
            <AppBar position="static" >
                <Toolbar sx={{ justifyContent: "space-between"}}>
                <Typography variant="h4" component="div" sx={{my:1, marginLeft:1, marginRight:-90}}>
                    Online Dashboard
                </Typography>
                <div />
                <Button variant="contained" onClick={() => setIndividual(!individual)}>{individual ? "Combine Data" : "Separate Data"}</Button>
                <Button variant="contained" onClick={() => setFiltersDialog(true)}>Options</Button>
                <Dialog open={filtersDialog} onClose={() => setFiltersDialog(false)}>
                    <DialogTitle>Select Metric</DialogTitle>
                    <DialogContent>
                        <Button variant='text' onClick={() => updateData('heart_rate')}>Heart Rate</Button>
                        <Button variant='text' onClick={() => updateData('distance')}>Distance</Button>
                        <Button variant='text' onClick={() => updateData('steps')}>Steps</Button>
                        <Button variant='text' onClick={() => updateData('calories')}>Calories</Button>
                        <Button variant='text' onClick={() => updateData('speed')}>Speed</Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setFiltersDialog(false)}>Exit</Button>
                    </DialogActions>
                </Dialog>
                </Toolbar>
            </AppBar>
            <div style={{fontSize:'40px', marginLeft:20,  marginTop:20}}>
                {individual ? "Individual Data" : "Combined Data"}
            </div>
            {header}
            {renderGraphs}
            <Button startIcon={<ArrowBack/>} sx={{ marginLeft:5 }} variant="contained" onClick={() => updateFiles([])}>Back</Button>
    </div>
    )
}

export default GraphPage;