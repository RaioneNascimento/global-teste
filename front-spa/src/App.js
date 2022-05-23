import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/app.scss';
import { useState } from 'react';

import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('x-access-token'));

  console.log(accessToken);
  return (
    <Router>
      <Sidebar />
      <Switch>
        {!accessToken 
          ?
          <Route path="/">
            <Login setAccessToken={setAccessToken} />
          </Route>

          : 
          <>
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/users' exact component={Users} />  
          </>
      }
      </Switch>
    </Router>
  );
}

export default App;
