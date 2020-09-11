import React from 'react';
import Login from './components/Login';
import useLS from './hooks/useLS';

function App() {
  const [id, setId] = useLS('id');
  return (
    <div className="App">
      {id}
      <Login setId={setId}/>
    </div>
  );
}

export default App;
