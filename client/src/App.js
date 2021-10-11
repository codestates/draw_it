import './styles/App.css';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Loading from './pages/Loading';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/Signin">
          <Signin />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route exact path="/loding">
          <Loading />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
