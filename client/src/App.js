import React from 'react';
import Login from './components/Login';
import useLS from './hooks/useLS';
import Dashboard from './components/Dashboard';
import {ContactProvider} from './contexts/ContactContext';

function App() {
  const [id, setId] = useLS('id');

  const dashboardComponent = (
    <ContactProvider>
        <Dashboard id={id} />
    </ContactProvider>
  )

  return (
    <div className="App">
      <ContactProvider>
        {id ? dashboardComponent : <Login setId={setId}/>}
      </ContactProvider>
    </div>
  );
}

export default App;
