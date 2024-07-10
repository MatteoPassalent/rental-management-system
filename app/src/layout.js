
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';


const Layout = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/test')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  
    return (
      <Box sx= {{         
        height: '100vh',
        width: '100vw', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      }}>
        <p>{data ? data.message: 'Loading...'}</p>
      </Box>
    )
}

export default Layout;