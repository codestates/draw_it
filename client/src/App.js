import './styles/App.css';
import  Main  from './pages/Main';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
