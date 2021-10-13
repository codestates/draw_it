import './styles/App.css';
import Main from './pages/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Drawit from './pages/Drawit';
import Loading from './components/Loading';
import Quiz from './pages/Quiz';
import Test from './pages/Test';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

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
          <Main setToken={setToken} />
        </Route>
        <Route exact path="/home">
          <Home token={token} setToken={setToken} />
        </Route>
        <Route exact path="/quiz">
          <Drawit token={token} />
        </Route>
        <Route exact path="/postQuiz/:postId">
          <Quiz token={token} />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
