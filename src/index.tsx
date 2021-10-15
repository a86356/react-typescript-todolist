import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
//import { store } from "./store";
import {store} from "@/rematch";
import './assets/style/reset.less'
import './assets/style/base.less'
import './assets/style/iconfont.less'
import './assets/style/antd.less'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
