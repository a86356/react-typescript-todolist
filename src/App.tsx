import React ,{Component}from 'react';


//存在状态
export default class App extends Component<{},IState>{

  constructor(props:{}){
      super(props);
      this.state={
          currentTask:"",
          tasks:[]
      }
  }
  renderTask():JSX.Element[]{
      return this.state.tasks.map((task:ITask,index:number)=>{
          return (
              <div key={task.id}>
                  <span>  {task.value} ({task.completed?'完成':"未完成"})</span>
                    <button onClick={()=>this.deleteTask(task.id)}>删除</button>
                    <button onClick={()=>this.toggleTask(index)}>切换完成状态</button>
              </div>
          )
      })
  }

  toggleTask(index:number):void{
      let task:ITask[] = this.state.tasks.splice(index,1);
      task[0].completed = !task[0].completed;
      const tasks:ITask[]= [...this.state.tasks,...task];

      this.setState({tasks})
  }
  deleteTask(id:number):void{
      const tasks:Array<ITask> = this.state.tasks.filter((task:ITask)=>id!=task.id)
      this.setState({
          tasks
      })
  }
  render():JSX.Element {
    return (
        <div className="a">
          <h1>React Typescript Todo List</h1>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input value={this.state.currentTask} type="text" placeholder="添加一个任务" onChange={(e)=>this.setState({currentTask:e.target.value})}/>
            <button type="submit">add task</button>
          </form>
            <div>
                { this.renderTask()}
            </div>
        </div>
    );
  }

  handleSubmit(e:any):void{
       e.preventDefault();
       let {tasks} = this.state;
       this.setState({
          currentTask:"",
          tasks:[
              ...this.state.tasks,
              {
                  id:this.getTime(),
                  value:this.state.currentTask,
                  completed:false
              }
          ]
      })
  }

  getTime():number{

      return  new Date().getTime();
  }

}

interface IState {
    currentTask: string,
    tasks:Array<ITask>
}


interface ITask {
    id:number,
    value:string,
    completed:boolean
}