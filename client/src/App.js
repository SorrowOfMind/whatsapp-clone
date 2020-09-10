import React, {useState} from 'react';
import Login from './components/Login';

function App() {
  const [id, setId] = useState(null);
  return (
    <div className="App">
      <Login setId={setId}/>
    </div>
  );
}

export default App;
