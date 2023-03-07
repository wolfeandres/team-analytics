import React, { useState } from 'react';
import './App.css';
import UploadPage from './Pages/UploadPage';
import GraphPage from './Pages/GraphPage';

function App() {
  const [files, setFiles] = useState<any>([]);

  const passFiles = (jsons: any): void => {
    setFiles(jsons);
  }

  return (
    <div>
      {files.length === 0 ? <UploadPage passFiles={passFiles}/> : <GraphPage jsons={files}/>}
    </div>
  );
}

export default App;
