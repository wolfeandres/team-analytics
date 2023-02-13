import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
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
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Joy" stroke="#8884d8" activeDot={{r:8}} />
    <Line type="monotone" dataKey="Alex" stroke="#82ca9d" />
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
    <Bar dataKey="Joy" fill="#8884d8" />
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
      <div className="Charts">
        {renderLine}
        {renderBar}
      </div>
    </div>
  );
}

export default App;
