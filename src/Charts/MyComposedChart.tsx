import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Area, ResponsiveContainer } from 'recharts';

type ChartProps = {
    data: any[];
    json1: any;
    json2?: any;
    type?: string;
}

interface Labels {
    [key: string]: string;
}

const labels: Labels = {
    'heart_rate': 'Heart Rate (bpm)',
    'distance': 'Distance (m)',
    'steps': "Steps",
    'calories': "Calories (kcal)",
    'speed': 'Speed (km/h)'
}

const MyComposedChart = ( props: ChartProps ) => {
    const { data, json1, json2 = null, type = 'heart_rate'} = props;

    const label = labels[type]
    console.log(data)

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart
                width={875}
                height={525}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='timestamp' stroke="black">
                    <Label value="Time" offset={-10} position="insideBottomLeft" />
                </XAxis>
                <YAxis yAxisId={0} allowDecimals={false} domain={type === 'heart_rate' ? ['dataMin - 5', json1['workout']['heart_rate']['target_heart_rate'] + 5]: ['dataMin - 5', 'dataMax + 5']}>
                    <Label value={label} offset={20} position= 'insideBottomLeft' angle={-90}/>
                </YAxis>
                <YAxis hide yAxisId={1} dataKey='elevation' />
                <Tooltip />
                <Legend />
                <ReferenceLine y={type === 'heart_rate' ? json1['workout']['heart_rate']['target_heart_rate'] : null} label={type === 'heart_rate' ? "Max" : ''} stroke="#8884d8" ifOverflow='extendDomain' />
                <ReferenceLine y={type === 'heart_rate' ? json2['workout']['heart_rate']['target_heart_rate'] : null} label={type === 'heart_rate' ? "Max" : ''} stroke="#82ca9d" ifOverflow='extendDomain' />
                <Line name='Elevation' yAxisId={1} dataKey='elevation' />
                <Line name={json1['name']} type="monotone" dataKey='value1' stroke="#8884d8" activeDot={{r:8}} yAxisId={0} />
                <Line name={json2['name']} type="monotone" dataKey='value2' stroke="#82ca9d" yAxisId={0} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default MyComposedChart;