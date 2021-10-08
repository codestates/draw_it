import './styles/App.css';
import  Main  from './pages/Main';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './pages/Home';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
