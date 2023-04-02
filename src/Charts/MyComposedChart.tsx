import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';

type ChartProps = {
    data: any[];
    json1: any;
    json2?: any;
    type?: string;
}

const MyLineChart = ( props: ChartProps ) => {
    const { data, json1, json2 = null, type = 'heart_rate'} = props;

    return (
        <LineChart
        width={875}
        height={525}
        data={data}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='timestamp' stroke="black">
            <Label value="Time" offset={-10} position="insideBottomLeft" />
        </XAxis>
        <YAxis domain={['dataMin - 5', 'dataMax + 5']}>
            <Label value={type === 'heart_rate' ? 'Heart Rate (bpm)' : 'Distance (m)'} offset={20} position= 'insideBottomLeft' angle={-90}/>
        </YAxis>
        <Tooltip />
        <Legend />
        <ReferenceLine y={type === 'heart_rate' ? json1['workout']['heart_rate']['max_heart_rate'] : null} label="Max" stroke="#8884d8" ifOverflow='extendDomain' />
        <Line name={json1['name'] == null ? "" : json1['name']} type="monotone" dataKey='value' stroke="#8884d8" activeDot={{r:8}} />
    </LineChart>
    )
}

