import { Route, Switch } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import NoFound from './pages/NoFound/NoFound';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Layout} />
        <Route component={NoFound} />
      </Switch>
    </div>
  );
}

export default App;
