import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ReferenceLine, Pie, PieChart, Cell, Label } from 'recharts';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Toolbar } from '@mui/material';
import { FileUpload, LegendToggleSharp } from '@mui/icons-material';
import MyLineChart from './Charts/MyLineChart';
import FileInput from './FileInput';

const data = [
  {time: '10:00:00', Joy: 120, Alex: 110},
  {time: '10:10:00', Joy: 135, Alex: 125},
  {time: '10:20:00', Joy: 150, Alex: 140},
  {time: '10:30:00', Joy: 165, Alex: 155},
  {time: '10:40:00', Joy: 175, Alex: 170},
  {time: '10:50:00', Joy: 155, Alex: 145},
  {time: '11:00:00', Joy: 130, Alex: 120},
  {time: '11:00:00', Joy: 120, Alex: 110},
  {time: '11:01:00', Joy: 125, Alex: 120},
  {time: '11:02:00', Joy: 130, Alex: 115},
  {time: '11:03:00', Joy: 135, Alex: 110},
  {time: '11:04:00', Joy: 140, Alex: 120},
  {time: '11:05:00', Joy: 145, Alex: 130},
  {time: '11:06:00', Joy: 150, Alex: 125},
  {time: '11:07:00', Joy: 155, Alex: 130},
  {time: '11:08:00', Joy: 160, Alex: 125},
  {time: '11:09:00', Joy: 165, Alex: 120},
  {time: '10:10:00', Joy: 170, Alex: 130},
  {time: '10:11:00', Joy: 175, Alex: 135},
  {time: '10:12:00', Joy: 180, Alex: 125},
  {time: '10:13:00', Joy: 185, Alex: 120},
  {time: '10:14:00', Joy: 190, Alex: 125},
  {time: '10:15:00', Joy: 195, Alex: 135},
  {time: '10:16:00', Joy: 200, Alex: 140},
  {time: '10:17:00', Joy: 205, Alex: 145},
  {time: '10:18:00', Joy: 210, Alex: 150},
  {time: '10:19:00', Joy: 215, Alex: 155},
  {time: '10:20:00', Joy: 220, Alex: 160},
  {time: '10:21:00', Joy: 225, Alex: 175}
];

const renderLine = (
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
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="time" stroke="black"/>
    <YAxis stroke="black"/>
    <Tooltip />
    <Legend />
    <ReferenceLine y={225} label="Max" stroke="red" />
    <Line type="monotone" dataKey="Joy" stroke="#2196f3" activeDot={{r:8}} />
    <Line type="monotone" dataKey="Alex" stroke="#000000" />
  </LineChart>
);

const piedata = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

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

const renderPie = (
  <PieChart width={400} height={400}>
  <Pie
  data={piedata}
  cx="50%"
  cy="50%"
  labelLine={false}
  label={renderCustomizedLabel}
  outerRadius={150}
  fill="#8884d8"
  dataKey="value"
 >
  {data.map((entry, index) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
  </Pie>
  </PieChart>
);

const renderBar = (
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
    <XAxis dataKey="time" />
    <Tooltip />
    <Legend />
    <Bar dataKey="Joy" fill="#2196f3" />
    <Bar dataKey="Alex" fill="#82ca9d" />
  </BarChart>
);



function App() {
  const [JSONData, setJSONData] = useState<any>();

  const getData = (myData: any): void => {
    setJSONData(myData);
  }

  return (
    <div>
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: "space-between"}}>
          <Typography variant="h4" component="div" sx={{my:1, marginLeft:1}}>
            Online Dashboard
          </Typography>
          <div />
          <Button variant="contained">Individual Data</Button>
          <Button variant="contained">Filters</Button>
          <IconButton aria-label="upload" color="default" component="label">
            <FileInput getData={getData}/>
            <FileUpload />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{fontSize:'40px', marginLeft:20,  marginTop:20}}>
        {JSONData != undefined ? "Individual Data" : "Combined Data"}
      </div>
      <div className="main-chart">
        {JSONData != undefined ? <MyLineChart data={JSONData['workouts']['1']['heart_rate']['data']} xAxis={'timestamp'} dkOne={'value'} dkTwo={""} /> : renderLine}
      </div>
      <div className="small-chart">
        {renderBar}
        {renderPie}
        {renderBar}
      </div>
    </div>
  );
}

export default App;
