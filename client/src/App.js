import React from 'react';
import Login from './components/Login';
import useLS from './hooks/useLS';
import Dashboard from './components/Dashboard';
import {ContactProvider} from './contexts/ContactContext';
import {ConversationProvider} from './contexts/ConversationContext';

function App() {
  const [id, setId] = useLS('id');

  const dashboardComponent = (
    <ContactProvider>
      <ConversationProvider>
        <Dashboard id={id} />
      </ConversationProvider>
    </ContactProvider>
  )

  return (
    <div className="App">
        {id ? dashboardComponent : <Login setId={setId}/>}
    </div>
  );
}

export default App;
