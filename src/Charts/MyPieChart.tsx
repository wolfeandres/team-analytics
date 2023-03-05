import { Label, LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ReferenceLine, Pie, PieChart, Cell } from 'recharts';

const COLORS: string[] = ['#2196f3', '#000000', '#4caf50', '#808080'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type ChartProps = {
    data: any[];
    dkOne: string;
}

const MyPieChart = ( props: ChartProps ) => {
  const { data, dkOne } = props;
  return(
    <PieChart width={400} height={400}>
      <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={150}
      fill="#8884d8"
      dataKey={dkOne}
    >
      {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      </Pie>
      <Tooltip/>
    </PieChart>
  );
}

export default MyPieChart;