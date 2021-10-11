import './styles/App.css';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from "react";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Loading from './components/Loading';

function App() {
  // const [Login, setLogin] = useState(false);
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <BrowserRouter>
    {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/Signin">
          <Signin />
        </Route>
        <Route exact path="/Signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
