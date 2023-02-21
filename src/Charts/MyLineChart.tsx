import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

type ChartProps = {
    data: any[];
    xAxis: string;
    dkOne: string;
    dkTwo: string;
}

const MyLineChart = ( props: ChartProps ) => {
    const { data, xAxis, dkOne, dkTwo } = props;
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dkOne} stroke="#8884d8" activeDot={{r:8}} />
            <Line type="monotone" dataKey={dkTwo} stroke="#82ca9d" />
        </LineChart>
    );
}

export default MyLineChart;