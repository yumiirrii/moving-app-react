import React from 'react';
import styled from 'styled-components';

interface Todo {
  id: string;
  task: string;
  dueDate: string;
  doneDate: string;
  isDone: boolean;
}

interface TodoListProps {
  todos: Todo[];
  dones: Todo[];
  moveTodo(index: number): void;
  editTodo(index: number): void;
  deleteTodo(id: string): void;
}

const Button = styled.button`
  border-color: #000066;
  background-color: white;
  color: #000066;

  &:hover {
    background-color: #000066;
    color: white;
  }
`

export const TodoList: React.FC<TodoListProps> = ({todos, dones, moveTodo, editTodo, deleteTodo}) => {

  const isOverdue = (dueDate: string) => {
    if (dueDate < new Date().toISOString().slice(0, 10)) {
      return { color: "red" };
    }
    return { color: "black" };
  }

  return (
    <div className='items'>
      <ul className='item-list'>
        {todos.map((todo, index) => (
          <li key={index} className='item'>
            <div>
              <Button onClick={() => moveTodo(index)}>done</Button>
            </div>
            <div>
              {todo.task}
            </div>
            <div style={isOverdue(todo.dueDate)}>
              {todo.dueDate}
            </div>
            <div>
              <Button onClick={() => editTodo(index)}>edit</Button>
            </div>
            <div>
              <Button onClick={() => deleteTodo(todo.id)}>delete</Button>
            </div>
          </li>
        ))}
      </ul>
      <ul className='moved-item-list'>
        {dones.map((done, index) => (
          <li key={index} className='item'>
            <div></div>
            <div>
              {done.task}
            </div>
            <div style={{ color: "gray" }}>
              {done.doneDate}
            </div>
            <div></div>
            <div>
              <Button onClick={() => deleteTodo(done.id)}>delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
