import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';

type ChartProps = {
    data: any[];
    json1: any;
    json2: any;
}

const MyLineChart = ( props: ChartProps ) => {
    const { data, json1, json2 } = props;

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
                <Label value= 'Heart Rate' offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <Tooltip />
            <Legend />
            <ReferenceLine y={json1['workout']['heart_rate']['max_heart_rate']} label="Max" stroke="#2196f3" ifOverflow='extendDomain' />
            <ReferenceLine y={json2['workout']['heart_rate']['max_heart_rate']} label="Max" stroke="#000000" ifOverflow='extendDomain' />
            <Line name={json1['name']}type="monotone" dataKey='value1' stroke="#2196f3" activeDot={{r:8}} />
            <Line name={json2['name']} type="monotone" dataKey='value2' stroke="#000000" />
        </LineChart>
    );
}

export default MyLineChart;