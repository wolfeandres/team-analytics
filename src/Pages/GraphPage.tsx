import { AppBar, Toolbar, Typography, Button, Dialog, DialogTitle, DialogContent, FormControlLabel, DialogActions, Checkbox, FormGroup } from "@mui/material"
import MyLineChart from "../Charts/MyLineChart"
import MyPieChart from "../Charts/MyPieChart"
import { useEffect, useState } from "react"
import { ArrowBack } from "@mui/icons-material"
import MyComposedChart from "../Charts/MyComposedChart"
import getElevation from "../Handlers/ElevationHandler"

var disabled = {
    heart_rate: false,
    distance: false,
    steps: false,
    calories: false,
    speed: false,
    power: false,
    elevation: false
}

// Merges data from both JSONS to be read by recharts
const mergeData = (json1: any, json2: any) => {
    let merged: {[key: number]: {
        heartRate1?: number,
        heartRate2?: number,
        distance1?: number,
        distance2?: number,
        steps1?: number,
        steps2?: number,
        calories1?: number,
        calories2?: number,
        speed1?: number,
        speed2?: number,
    }} = {};

    // HeartRate
    try {
        json1['workout']['heart_rate']['data'].forEach((item: { timestamp: number; value: number }) => {
            merged[item.timestamp] = { heartRate1: Math.trunc(item.value * 100) / 100 }
        })
    
        json2['workout']['heart_rate']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].heartRate2 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { heartRate2: Math.trunc(item.value * 100) / 100}
            }
        })
    } catch (e) {
        disabled['heart_rate'] = true
    }

    // Distance
    try {
        json1['workout']['distance']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].distance1 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { distance1: Math.trunc(item.value * 100) / 100}
            }
        })
    
        json2['workout']['distance']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].distance2 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { distance2: Math.trunc(item.value * 100) / 100}
            }
        })
    } catch (e) {
        disabled['distance'] = true
    }

    // Steps
    try {
        json1['workout']['steps']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].steps1 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { steps1: Math.trunc(item.value * 100) / 100}
            }
        })
    
        json2['workout']['steps']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].steps2 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { steps2: Math.trunc(item.value * 100) / 100}
            }
        })
    } catch (e) {
        disabled['steps'] = true
    }

    // Calories
    try {
        json1['workout']['calories']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].calories1 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { calories1: Math.trunc(item.value * 100) / 100}
            }
        })
    
        json2['workout']['calories']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].calories2 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { calories2: Math.trunc(item.value * 100) / 100}
            }
        })
    } catch (e) {
        disabled['calories'] = true
    }

    // Speed
    try {
        json1['workout']['speed']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].speed1 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { speed1: Math.trunc(item.value * 100) / 100}
            }
        })
    
        json2['workout']['speed']['data'].forEach((item: { timestamp: number; value: number }) => {
            if (merged[item.timestamp]) {
                merged[item.timestamp].speed2 = Math.trunc(item.value * 100) / 100
            } else {
                merged[item.timestamp] = { speed2: Math.trunc(item.value * 100) / 100}
            }
        })
    } catch (e) {
        disabled['speed'] = true
    }

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

interface Options {
    heart_rate: boolean;
    distance: boolean;
    steps: boolean;
    calories: boolean;
    speed: boolean;
    power: boolean;
    elevation: boolean;
  }

const GraphPage: React.FC<Props> = ({jsons, updateFiles}) => {
    const [individual, setIndividual] = useState<boolean>(false)
    const [filtersDialog, setFiltersDialog] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [locData, setLocData] = useState<any[]>([])
    const [isLocSet, setIsLocSet] = useState<boolean>(false)
    const [options, setOptions] = useState<Options>({
        heart_rate: true,
        distance: false,
        steps: false,
        calories: false,
        speed: false,
        power: false,
        elevation: true
    })

    let tempData = mergeData(jsons[0], jsons[1])

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
        let temperData = tempData
        
        if (isLocSet) {
            for (let i = 0; i < temperData.length; i++) {
                temperData[i].elevation = locData[i];
            }
        }

        if (locations.length > 1 && isLocSet === false) {
            const elevationData: any = await getElevation(locations, tempData.length);

            let tempElevationData = []
            for (let i = 0; i < temperData.length; i++) {
                temperData[i].elevation = elevationData.results[i].elevation;
                tempElevationData.push(elevationData.results[i].elevation);
            }
            setLocData(tempElevationData)
            setIsLocSet(true)
        }

        setData(temperData);
        console.log(temperData)
    }

    useEffect(() => {
        fetchElevationData();
    }, [])

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
                <MyComposedChart data={data} json1={jsons[0]} json2={jsons[1]} options={options} />
            </div>
            <div className="small-chart">
                <MyPieChart data={events0} dkOne='value' />
                <MyPieChart data={events1} dkOne='value' />
            </div>
        </div>
    )

    if (individual) {
        renderGraphs = (
            <div style={{ display:'flex' }}>
                <div style={{ width:'50%', float:'left' }}>
                    <div className='medium-chart'>
                        {/* <MyLineChart data={convertData(jsons[0]['workout'][chosenData]['data'])} json1={jsons[0]} type={chosenData} size='small'/>  */}
                    </div>
                    <div className="small-chart">
                        <MyPieChart data={events0} dkOne='value' />
                    </div>
                </div>
                <div className='vertical-bar'></div>
                <div style={{ width:'50%', float:'right' }}>
                    <div className='medium-chart'>
                        {/* <MyLineChart data={convertData(jsons[1]['workout'][chosenData]['data'])} type={chosenData} json1={jsons[1]} size='small'/>  */}
                    </div>
                    <div className="small-chart">
                        <MyPieChart data={events1} dkOne='value' />
                    </div>
                </div>
            </div>
        )
    }

    const handleCheckbox = (option: keyof Options) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [option]: !prevOptions[option]
        }))
    }

    return (
        <div style={{ paddingBottom:16 }}>
            <AppBar>
                <Toolbar sx={{ justifyContent: "space-between"}}>
                <Typography variant="h4" component="div" sx={{my:1, marginLeft:1, marginRight:-90}}>
                    Online Dashboard
                </Typography>
                <div />
                <Button variant="contained" onClick={() => setIndividual(!individual)}>{individual ? "Combine Data" : "Separate Data"}</Button>
                <Button variant="contained" onClick={() => setFiltersDialog(true)}>Options</Button>
                <Dialog open={filtersDialog} onClose={() => setFiltersDialog(false)}>
                    <DialogTitle>Select Metrics</DialogTitle>
                    <DialogContent>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox disabled={disabled['heart_rate']} checked={options['heart_rate']} onChange={() => handleCheckbox('heart_rate')} />} label='Heart Rate'/>
                            <FormControlLabel control={<Checkbox disabled={disabled['distance']} checked={options['distance']} onChange={() => handleCheckbox('distance')} />} label='Distance'/>
                            <FormControlLabel control={<Checkbox disabled={disabled['steps']} checked={options['steps']} onChange={() => handleCheckbox('steps')}/>} label='Steps'/>
                            <FormControlLabel control={<Checkbox disabled={disabled['calories']} checked={options['calories']} onChange={() => handleCheckbox('calories')}/>} label='Calories'/>
                            <FormControlLabel control={<Checkbox disabled={disabled['speed']} checked={options['speed']} onChange={() => handleCheckbox('speed')}/>} label='Speed'/>
                            <FormControlLabel control={<Checkbox disabled={disabled['elevation']} checked={options['elevation']} onChange={() => handleCheckbox('elevation')}/>} label='Elevation'/>
                        </FormGroup>
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