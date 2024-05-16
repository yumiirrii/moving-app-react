import React, { useState, useEffect } from 'react'
import { TodoList } from './components/TodoList'
import { AddTodo } from './components/AddTodo'
import { deleteById, getAll, save } from './firebase/dbManager'

interface Todo {
  id: string;
  task: string;
  dueDate: string;
  doneDate: string;
  isDone: boolean;
}

export const TodoView: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data: Todo[] = await getAll('todos');
    setTodos((data.filter(item => !item.isDone)).sort((a: Todo, b: Todo) => a.dueDate.localeCompare(b.dueDate)));
    setDones((data.filter(item => item.isDone)).sort((a: Todo, b: Todo) => a.dueDate.localeCompare(b.doneDate)));
  };

  const saveItem = async (todo: Todo) => {
    await save('todos', todo);
    // setTodos([...todos, newTodo]);
    fetchData();
  }

  const moveItem = async (index: number) => {
    const todo: Todo = todos[index];
    todo.isDone = true;
    todo.doneDate = new Date().toISOString().slice(0, 10);
    await saveItem(todo);
  }

  const editItem = (index: number) => {
    setEditingTodo(todos[index]);
  }

  const deleteItem = async (id: string) => {
    // setTodos(todos.filter((_, i) => i !== index));
    await deleteById('todos', id);
    fetchData();
  }

  return (
    <div>
      <AddTodo
        saveTodo={saveItem}
        editingTodo={editingTodo}
      />
      <TodoList
        todos={todos}
        dones={dones}
        moveTodo={moveItem}
        editTodo={editItem}
        deleteTodo={deleteItem}
      />
    </div>
  )
}
