import { useState } from 'react';
import './App.css';
import RenderIf from './components/RenderIf';
import { Button } from '@nextui-org/react';
import { 
  Switch, 
  useTheme, 
  Grid, 
  Card, 
  Text, 
  Input, 
  Row,
  Checkbox
 } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode';

function App() {
  const darkMode = useDarkMode(false);
  const { type, isDark } = useTheme();
  const [ todos, setTodos ] = useState([]);
  console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ todos", todos)
  const [isUpdateTodo, setIsUpdateTodo] = useState(false);
  let newValue;

  const getTodo = () => {
    const todoInput = document.querySelector('#todoInput').value;
    console.log("🚀 ~ file: App.js ~ line 17 ~ getTodo ~ todoInput", todoInput)
    // add tođo into todos 
    setTodos([...todos, {id: todos.length, value: todoInput, isChecked: false}]);

    // document.querySelector('#todoInput').value = '';
  }

  const removeTodo = (id) => {
    const newTodos = todos.filter(todo => !(todo.id === id));
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
      <div>
        The current theme is: {type}
        <Switch
          checked={darkMode.value}
          onChange={() => darkMode.toggle()}
        />
      </div>

      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Card>
            <Text h2  css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}>
              TODO LIST
            </Text>
            <Row align='center' justify='center' gap={2}>
              <Input
                clearable 
                bordered
                id='todoInput'
                // aria-labelledby
              />
              <Button
                color="gradient"
                ghost
                id="todoBtn" 
                onClick={getTodo}
              > 
                Add Todo
              </Button>
            </Row>
            
              <RenderIf isTrue={todos.length > 0} >
                  { todos.map((todo, ids) => (
                      <Card bordered shadow={false} css={{ mw: "100%", mt: "30px" }}>
                        <Checkbox 
                        value={todo.id} 
                        key={todo.id} 
                        color="gradient"
                        // labelColor="primary"
                        lineThrough={true}
                        onChange={(event) => tickTodo(event, todo.id)}
                      >
                        {todo.value}
                      </Checkbox>
                      </Card>
                      

                      
                      
                  ))}
              </RenderIf>
              
          </Card>
        </Grid>
        
        <Grid xs={12} sm={6}>
          <Card color="primary" css={{ h: "$20" }}>
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              Done list
            </Text>
          </Card> 
        </Grid>
        
      </Grid.Container>




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
