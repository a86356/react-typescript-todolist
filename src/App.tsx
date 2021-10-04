import React from "react";

import "./assets/common.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Book from "./Book";
import Show from "./Show";
import Shop from "./Shop";
import Phone from "./Phone";
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
          <Route path="/book" exact component={Book} />
          <Route path="/show" exact component={Show} />
          <Route path="/shop/:id" exact component={Shop} />
          <Route path="/phone" exact component={Phone} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
