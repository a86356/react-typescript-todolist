import React from "react";
console.log(123)
import "./assets/common.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import NewList from "./views/newlist/Index";
import Detail from "./views/detail/Index";
import Login from "./views/login/Index";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/newslist" exact component={NewList} />
          <Route path="/detail" exact component={Detail} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
