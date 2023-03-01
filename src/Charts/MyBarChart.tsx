import { Label, LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ReferenceLine, Pie, PieChart, Cell } from 'recharts';


type ChartProps = {
    data: any[];
    xAxis: string;
    yAxis: string;
    dkOne: string;
    dkTwo: string;
}

const MyBarChart = (props: ChartProps) => {
    const { data, xAxis, yAxis, dkOne, dkTwo } = props;

    return(
        <BarChart
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
    <Tooltip />
    <Legend />
    <Bar dataKey={dkOne} fill="#2196f3" />
    <Bar dataKey={dkTwo} fill="#82ca9d" />
  </BarChart>
);
}

export default MyBarChart;