import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import api from "./api/apis";

const Book = () => {
  const [count, setCount] = useState(1);
  function add() {
    console.log("compute");
  }

  const history = useHistory();
  const goShow = () => {
    history.push({ pathname: "/show" });
  };

  const goShop = () => {
    history.push({ pathname: "/shop/1", state: { msg: "shoppppp" } });
  };

  const goPhone = () => {
    history.push({ pathname: "/phone", state: { message: "hello phone~" } });
  };

  return (
    <div className="App">
      我是一本书
      <button
        onClick={() => {
          goShow();
        }}
      >
        到show去
      </button>
      <button
        onClick={() => {
          goShop();
        }}
      >
        到shop去
      </button>
      <button
        onClick={() => {
          goPhone();
        }}
      >
        到phone去
      </button>
    </div>
  );
};

export default Book;
