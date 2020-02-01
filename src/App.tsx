import React ,{Component}from 'react';



//存在状态
 class App extends Component<{},{}>{
  render() {
    return (
        <div className="a">
          <h1>react typescript todo list</h1>
          <form>
            <input type="text" placeholder="添加一个任务"/>
            <button type="submit">add task</button>
          </form>
        </div>
    );
  }
}



export default App;