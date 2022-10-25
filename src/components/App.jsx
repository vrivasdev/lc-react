import '../reset.css';
import '../App.css';
import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);

    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  }

  function completeTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
        }

        return todo;
      })
    );
  }

  function markAsEditing(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = !todo.isEditing;
        }

        return todo;
      })
    );
  }

  function updateTodo(event, id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = false;

          if (event.target.value.trim().length === 0) {
            return todo;
          }

          todo.title = event.target.value;
        }

        return todo;
      })
    );
  }

  function cancelEdit(event, id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = false;
        }

        return todo;
      })
    );
  }

  function remaining() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => !todo.isComplete));
  }

  function completeAllTodos() {
    setTodos(
      todos.map((todo) => {
        todo.isComplete = true;
        return todo;
      })
    );
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos.filter((todo) => !todo.isComplete);
    }
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
