import React from "react";
import {
  Switch,
  Route,
  Router
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from './Home';
import Detail from './Detail';

function App() {
  const history = createBrowserHistory();
  return (
   
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </Router>
    
    // <Header/>
    
  );
}

export default App;
