import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./views/home/Index";
import Entry from "@/views/entry/Index";
import BookMissionSetting from "@/views/bookmissionsetting/Index";
import ChooseBooks from "@/views/choosebooks/Index";
import Detaillisten from "@/views/detaillisten/Index";
import Setting from '@/views/setting/Index'
import BatchListen from '@/views/batchlisten/Index'
import BooksWords from "@/views/bookwords/Index";
import StudyProgress from "@/views/studyprogress/Index";
import Ad from "@/views/ad/Index";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Home/>
        <Switch>
          <Route path="/" exact component={Entry} />
          <Route path="/ad" exact component={Ad} />
          <Route path="/studyprogress" exact component={StudyProgress} />
          <Route path="/bookwords/:id/study_type/:study_type" exact component={BooksWords} />
          <Route path="/batchlisten/:id/study_type/:type" exact component={BatchListen} />
          <Route path="/detaillisten/:id/study_type/:type" exact component={Detaillisten} />
          <Route path="/setting" exact component={Setting} />
          <Route path="/bookmissionsetting/:id" exact component={BookMissionSetting} />
          <Route path="/choosebooks" exact component={ChooseBooks} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
