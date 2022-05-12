import { useState } from 'react';
import './App.css';
// import TodoList from './components/TodoList';

function App() {
  const [ todos, setTodos ] = useState([]);
  console.log("🚀 ~ file: App.js ~ line 7 ~ App ~ todos", todos)
  // const [ checkedTodo, setCheckedTodo ] = useState([])

  const getTodo = () => {
    const todoInput = document.querySelector('#todoInput').value;
    // add tođo into todos 
    setTodos([...todos, {id: todos.length, value: todoInput, isChecked: false}]);

    document.querySelector('#todoInput').value = '';
  }

  const removeTodo = (id) => {
    setTodos([
      ...todos.slice(0, id),
      ...todos.slice(id + 1)
    ]);
  }

  // const tickTodo = (event, id) => {
  //   const targetedTodo = todos[id];
  //   // If checked checkbox
  //   if(event.target.checked) {
  //     setCheckedTodo([...checkedTodo, { id, value: targetedTodo }]);
  //     return;
  //   }

  //   // If unchecked checkbox
  //   const newCheckedTodo = checkedTodo.filter(todo => todo.id !== id);
  //   setCheckedTodo(newCheckedTodo);
  // }

  const tickTodo = (event, id) => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isChecked = !todo.isChecked
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

      { todos.length > 0 
        ? 
        <ul id="todoList" className='todoList'>
          { todos.map((todo, ids) => (
            <li key={ids} className='todoItem'>
              <input
                type="checkbox"
                onClick={ (event) => tickTodo(event, todo.id) }
              >

              </input>
              <p contentEditable={true} >{todo.value}</p>
              <button key={ids} data-todo={ids} onClick={() => removeTodo(ids)}>X</button>
            </li>
          ))}
        </ul> 
        : <p>Nothing</p>
      }

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
