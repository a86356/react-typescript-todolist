import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRouter } from "./hooks/useRouter";

interface RouteParam {
  message: string;
}
const set = new Set();

function Phone() {
  const [count, setCount] = useState(1);
  const [number, setNumber] = useState(1);

  const state1: any = useRouter().location.state;
  const add = useMemo(() => {
    console.log("compute");
    return count;
  }, [count]);

  const callback = useCallback(() => {
    console.log(count);
  }, [count]);
  set.add(callback);

  // useParams,query state  自定义hook
  const history = useHistory();
  const location = useLocation<RouteParam>();
  const state = location.state;

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="App">
      <h3>{state1.message}</h3>
      <h4>{count}</h4>
      <h4>{number}</h4>
      <h4>{add}</h4>
      <h4>{set.size}</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+1--counter</button>
        <button onClick={() => setNumber(number + 1)}>+1--number</button>
      </div>

      <button
        onClick={() => {
          goBack();
        }}
      >
        返回
      </button>
    </div>
  );
}

export default Phone;
