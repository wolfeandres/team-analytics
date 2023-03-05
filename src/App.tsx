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
import MyBarChart from './Charts/MyBarChart';
import MyPieChart from './Charts/MyPieChart';
import UploadPage from './Pages/UploadPage';
import GraphPage from './Pages/GraphPage';

function App() {
  const [files, setFiles] = useState<any>([]);

  const passFiles = (jsons: any): void => {
    setFiles(jsons);
  }

  return (
    <div>
      {files.length == 0 ? <UploadPage passFiles={passFiles}/> : <GraphPage jsons={files}/>}
    </div>
  );
}

export default App;
