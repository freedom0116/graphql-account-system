import './App.css';
import { Header } from './components/header/Header';
import { Switch, Route } from 'react-router-dom';
import { Home } from './page/Home';
import { Login } from './page/Login';
import { Register } from './page/Register';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ Register } />
      </Switch>

    </div>
  );
}

export default App;
