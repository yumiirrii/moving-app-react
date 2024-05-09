import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Todo {
  id: string;
  task: string;
  dueDate: string;
  isDone: boolean;
}

interface AddTodoProps {
  saveTodo(todo: Todo): void;
  editingTodo?: Todo;
}

const Button = styled.button`
  border-color: #000066;
  background-color: #000066;
  color: white;

  &:hover {
    background-color: white;
    color: #000066;
  }
`

export const AddTodo: React.FC<AddTodoProps> = ({saveTodo, editingTodo}) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if(editingTodo) {
      setTask(editingTodo.task);
      setDueDate(editingTodo.dueDate);
      setIsEditing(true);
    } else {
      setTask('');
      setDueDate('');
      setIsEditing(false);
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo) {
      saveTodo({
        id: editingTodo.id,
        task,
        dueDate,
        isDone: false
      })
    } else {
      saveTodo({
        id: '',
        task,
        dueDate,
        isDone: false
      });
    }
    setTask('');
    setDueDate('');
    setIsEditing(false);
  }

  return (
    <div className='input-area'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">{isEditing ? 'edit' : 'add'}</Button>
        </div>
      </form>
    </div>
  )
}
