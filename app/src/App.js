import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/test')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data ? data.message +" frontend2" : 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;
