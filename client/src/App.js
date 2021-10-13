import './styles/App.css';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Drawit from './pages/Drawit';
import Loading from './components/Loading';
import Quiz from './pages/Quiz';
import { UserProvider } from './pages/Context';

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
    <UserProvider>
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
            <Drawit />
          </Route>
          <Route exact path="/postQuiz/:postId">
            <Quiz />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
