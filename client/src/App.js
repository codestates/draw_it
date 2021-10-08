import './styles/App.css';
import  Main  from './pages/Main';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import { BrowserRouter, Route, Switch } from "react-router-dom"

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
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
