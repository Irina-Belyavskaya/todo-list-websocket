import { Button, Grid, OutlinedInput } from '@mui/material'
import { useState } from 'react';
import { useAlert } from 'react-alert-with-buttons';
import { CreateTodoDto } from 'types/create-todo-dto.type';

interface IProps {
  updateTodoList: () => void;
  addNewTodo: (newTodo: CreateTodoDto) => void;
}

const InputBar = ({ updateTodoList, addNewTodo }: IProps) => {
  const [inputText, setInputText] = useState<string>('')
  const alert = useAlert()

  const addButtonHandle = () => {
    if (inputText === '') {
      alert.open({ message: "Enter the text" })
      return
    }
    const newTodo: CreateTodoDto = {
      text: inputText,
      isDone: false
    }
    addNewTodo(newTodo);
    setInputText('');
  }

  return (
    <Grid container sx={{ paddingTop: '50px' }}>
      <OutlinedInput
        sx={{
          marginLeft: 'auto',
          marginRight: '20px',
          width: '74%'
        }}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <Button
        sx={{
          padding: '0 45px',
          marginRight: 'auto'
        }}
        variant="contained"
        onClick={addButtonHandle}
      >
        Add todo
      </Button>
    </Grid>
  )
}

export default InputBar;