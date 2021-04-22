import './App.css';
import { Header } from './components/header/Header';
import { Switch, Route } from 'react-router-dom';
import { Home } from './page/Home';
import { Login } from './page/Login';
import { Register } from './page/Register';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    !localStorage.getItem('accessToken') ? setIsLogin(false) : setIsLogin(true);
  })
  
  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin} />
      <Switch>
        <Route exact path="/">
          <Home
            setIsLogin={setIsLogin} />
        </Route>
        <Route path="/login">
          <Login
            setIsLogin={setIsLogin} />
        </Route>
        <Route path="/signup" component={ Register }>
          <Register
            setIsLogin={setIsLogin} />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
