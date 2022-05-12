import { useState } from 'react';
import './App.css';
import RenderIf from './components/RenderIf';
// import TodoList from './components/TodoList';

function App() {
  const [ todos, setTodos ] = useState([]);
  const [isUpdateTodo, setIsUpdateTodo] = useState(false);
  let newValue;
  console.log("🚀 ~ file: App.js ~ line 10 ~ App ~ newValue", newValue)
  console.log("🚀 ~ file: App.js ~ line 7 ~ App ~ todos", todos);
  // const [ checkedTodo, setCheckedTodo ] = useState([])

  const getTodo = () => {
    const todoInput = document.querySelector('#todoInput').value;
    // add tođo into todos 
    setTodos([...todos, {id: todos.length, value: todoInput, isChecked: false}]);

    document.querySelector('#todoInput').value = '';
  }

  const removeTodo = (id) => {
    console.log("🚀 ~ file: App.js ~ line 20 ~ removeTodo ~ id", id)
    const newTodos = todos.filter(todo => !(todo.id === id));
    console.log("🚀 ~ file: App.js ~ line 22 ~ removeTodo ~ newTodos", newTodos)
    setTodos(newTodos);
  }


  const tickTodo = (event, id) => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isChecked = !todo.isChecked
      }
      return todo;
    })
    setTodos(newTodos);
  }

  const updateTodo = (newValue, id) => {
    const isAccept = window.confirm("Do you want to update todo?");
    if(!isAccept) return;
    
    console.log("🚀 ~ file: App.js ~ line 42 ~ updateTodo ~ isAccept", isAccept)
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.value = newValue
      }
      return todo;
    })

    setTodos(newTodos);
  }

  return (
    <div className="App" >
      <h1>TODO</h1>
      <p>What needs to be done?</p>
      <input type="text" id='todoInput'></input>
      <button id="todoBtn" onClick={getTodo}>Add</button>

      <RenderIf isTrue={todos.length > 0} isFalse="Nothing">
        <ul id="todoList" className='todoList'>
          { todos.map((todo, ids) => (
            <li key={ids} className='todoItem'>
              <input
                type="checkbox"
                onClick={ (event) => tickTodo(event, todo.id) }
              >

              </input>
              <p  
                contentEditable={true}
                onInput={(event) => {
                  newValue = event.target.textContent;
                  console.log("🚀 ~ file: App.js ~ line 76 ~ App ~ newValue", newValue)
                  setIsUpdateTodo(true)
                }}
              >{todo.value}</p>
              <RenderIf isTrue={isUpdateTodo} isFalse=''>
                <button onClick={() => updateTodo(newValue, todo.id)}>Save</button>
              </RenderIf>
              <button key={ids} data-todo={ids} onClick={() => removeTodo(todo.id)}>X</button>
            </li>
          ))}
        </ul> 
      </RenderIf>


      <h1>Done list</h1>
        <ul className='todoList'>
          { todos.filter(todo => todo.isChecked).map((todo, ids) => (
            <li key={ids} className='todoItem'>
              {todo.value}
            </li>
          ))}
        </ul> 
      
    </div>
  );
}

export default App;
