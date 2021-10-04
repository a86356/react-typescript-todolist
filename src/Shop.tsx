import React, { useState } from "react";

interface List {
  id: string;
  name: string;
}

function Shop() {
  const [count, setCount] = useState(1);
  const [person, setPerson] = useState<List>({ id: "0", name: "" });

  const addCount = () => {
    let d = count;
    setCount(++d);
  };

  const changeval = (event: any) => {
    setPerson({ ...person, name: event.target.value });
  };

  return (
    <div className="App">
      {/*我是一家店 ,店铺编号：{params.id}*/}
      当前的count:{count}
      <button onClick={addCount}>add count</button>
      <div>
        <div className="name">
          <div>
            <input
              onChange={(e) => {
                changeval(e);
              }}
              type="text"
              value={person.name}
            />
          </div>
        </div>
      </div>
      <div>当前的人名:{person.name}</div>
    </div>
  );
}

export default Shop;
