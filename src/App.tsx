import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

const data = [
  {
    month: 'January',
    Joy: 4000,
    Alex: 2400,
  },
  {
    month: 'Febuary',
    Joy: 3000,
    Alex: 1398,
  },
  {
    month: 'March',
    Joy: 2000,
    Alex: 9800,
  },
  {
    month: 'April',
    Joy: 2780,
    Alex: 3908,
  },
  {
    month: 'May',
    Joy: 1890,
    Alex: 4800,
  },
  {
    month: 'June',
    Joy: 2390,
    Alex: 3800,
  },
  {
    month: 'July',
    Joy: 3490,
    Alex: 4300,
  }
];

const renderLine = (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
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
)

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div style={{float:"left"}}>
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
      </div>
      <div style={{overflow:"auto"}}>
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
      </div>
    </div>
  );
}

export default App;
