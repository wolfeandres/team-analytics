import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';

type ChartProps = {
    data: any[];
    xAxis: string;
    yAxis: string;
    dkOne: string;
    dkTwo: string;
}

const MyLineChart = ( props: ChartProps ) => {
    const { data, xAxis, yAxis, dkOne, dkTwo } = props;
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
            <XAxis dataKey={xAxis} stroke="black" >
                <Label value="Time" offset={-10} position="insideBottomLeft" />
            </XAxis>
            <YAxis stroke="black">
                <Label value= 'Heart Rate' offset={20} position= 'insideBottomLeft' angle={-90}/>
            </YAxis>
            <Tooltip />
            <Legend />
            <ReferenceLine y={110} label="Max" stroke="red" />
            <Line type="monotone" dataKey={dkOne} stroke="#8884d8" activeDot={{r:8}} />
            <Line type="monotone" dataKey={dkTwo} stroke="#82ca9d" />
        </LineChart>
    );
}

export default MyLineChart;