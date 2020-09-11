import React from 'react';
import Login from './components/Login';
import useLS from './hooks/useLS';
import Dashboard from './components/Dashboard';

function App() {
  const [id, setId] = useLS('id');
  return (
    <div className="App">
      {id ? <Dashboard id={id} /> : <Login setId={setId}/>}
    </div>
  );
}

export default App;
