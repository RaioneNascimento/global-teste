import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
