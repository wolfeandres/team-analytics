import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ReferenceLine } from 'recharts';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const data = [
  { month: 'January', Joy: 4000, Alex: 2400,},
  { month: 'Febuary', Joy: 3000, Alex: 1398,},
  { month: 'March', Joy: 2000, Alex: 9800,},
  { month: 'April', Joy: 2780, Alex: 3908,},
  { month: 'May', Joy: 1890, Alex: 4800,},
  { month: 'June', Joy: 2390, Alex: 3800,},
  { month: 'July', Joy: 3490, Alex: 4300,}
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
    <XAxis dataKey="month" stroke="black"/>
    <YAxis stroke="black"/>
    <Tooltip />
    <Legend />
    <ReferenceLine y={9800} label="Max" stroke="red" />
    <Line type="monotone" dataKey="Joy" stroke="#2196f3" activeDot={{r:8}} />
    <Line type="monotone" dataKey="Alex" stroke="#000000" />
  </LineChart>
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
    <XAxis dataKey="month" />
    <Tooltip />
    <Legend />
    <Bar dataKey="Joy" fill="#2196f3" />
    <Bar dataKey="Alex" fill="#82ca9d" />
  </BarChart>
);

function App() {
  return (
    <div>
      <AppBar position="static">
        <Typography variant="h4" component="div" sx={{my:1, mx:1}}>
          Online Dashboard
        </Typography>
      </AppBar>
      <div className="main-chart">
        {renderLine}
      </div>
      <div className="small-chart">
        {renderBar}
        {renderBar}
        {renderBar}
      </div>
    </div>
  );
}

export default App;
