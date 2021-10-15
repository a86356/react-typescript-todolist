import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./views/home/Index";
import StudyEntry from "@/views/study/entry/Index";
import Books from "@/views/books/Index";
import BookMissionSetting from "@/views/bookmissionsetting/Index";
import ChooseBooks from "@/views/choosebooks/Index";
import Detaillisten from "@/views/detaillisten/Index";
import Setting from '@/views/setting/Index'
import BatchListen from '@/views/batchlisten/Index'
import BooksWords from "@/views/bookwords/Index";
import StudyProgress from "@/views/studyprogress/Index";

function App(): JSX.Element {
  return (
    <div className="App">
      <Home/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={StudyProgress} />
          <Route path="/studyprogress" exact component={StudyProgress} />
          <Route path="/bookwords" exact component={BooksWords} />
          <Route path="/batchlisten" exact component={BatchListen} />
          <Route path="/detail/listen" exact component={Detaillisten} />
          <Route path="/setting" exact component={Setting} />
          <Route path="/book/missionsetting" exact component={BookMissionSetting} />
          <Route path="/choosebook" exact component={ChooseBooks} />
          <Route path="/books" exact component={Books} />
          <Route path="/study/entry" exact component={StudyEntry} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
