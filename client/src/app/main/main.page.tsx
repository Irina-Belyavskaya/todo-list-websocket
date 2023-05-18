import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TodoType } from "types/Todo";
import ResponsiveAppBar from "./app-bar.component";
import InputBar from "./input-bar.component";
import Todo from "./todo.component";
import ErrorAlert from "components/error-alert.component";
import { WebsocketContext } from "contexts/WebsocketContext";
import { MethodTypes } from "./enums/methods";
import { CreateTodoDto } from "types/create-todo-dto.type";
import { UpdateTodoDto } from "types/update-status-dto.type";
import Cookies from "js-cookie";

function MainPage() {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const location = useLocation();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    })
    socket.on('onMessage', (response) => {
      if (response.error) {
        setShowError(true);
        setErrorMessage(response.message);
      } else {
        setShowError(false);
        setTodos(response.data.sort((firstEl: TodoType, secondEl: TodoType) => firstEl.id - secondEl.id));
      }
    })
    updateTodoList();
    return () => {
      console.log('Disconnect!');
      socket.off('connect');
      socket.off('onMessage');
    }
  },[])

  const updateTodoList = () => {
    socket.emit('todos', {
      jwt_token: 'Bearer ' + Cookies.get('jwt_token'),
      method: MethodTypes.GET,
      parameter: undefined,
      newTodo: undefined,
      newStatus: undefined
    })
  }

  const addNewTodo = async (newTodo : CreateTodoDto) => {
    await socket.emit('todos', {
      jwt_token: 'Bearer ' + Cookies.get('jwt_token'),
      method: MethodTypes.POST,
      parameter: undefined,
      newTodo: newTodo,
      newStatus: undefined
    });
  }

  const deleteTodo = (id : number) => {
    socket.emit('todos', {
      jwt_token: 'Bearer ' + Cookies.get('jwt_token'),
      method: MethodTypes.DELETE,
      parameter: id,
      newTodo: undefined,
      newStatus: undefined
    });
  }

  const updateStatus = (id : number, newStatus : UpdateTodoDto) => {
    socket.emit('todos', {
      jwt_token: 'Bearer ' + Cookies.get('jwt_token'),
      method: MethodTypes.UPDATE,
      parameter: id,
      newTodo: undefined,
      newStatus: newStatus
    });
  }
  
  return (
    <Grid container>
      <Grid container item>
        <ResponsiveAppBar/>
      </Grid>
      <Grid container item>
        <Typography 
          variant="h2"
          sx={{
            marginLeft: 'auto', 
            marginRight: 'auto',
            marginTop: '50px'
          }}
        >
          Create TODO List
        </Typography>
        {
          location.state
          ?
            <Typography>{location.state}</Typography>
          :
            <></>
        }
      </Grid>
      <Grid container item>
        <InputBar updateTodoList={updateTodoList} addNewTodo={addNewTodo}/>
      </Grid>
      <Grid container item sx={{marginTop: '100px'}}>
        { todos.map(todo => 
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text} 
            isDone={todo.isDone} 
            updateTodoList={updateTodoList}
            deleteTodo={deleteTodo}
            updateStatus={updateStatus}
          />
      )}
      </Grid>
      <Grid
        container
        item
        sx={{ marginTop: '30px', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {showError && <ErrorAlert title="Error" text={errorMessage} />}
      </Grid>
    </Grid>
  );
}

export default MainPage;
