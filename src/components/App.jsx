import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useEffect, useMemo, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const nameInputEl = useRef(null);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

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

  // const todosFiltered = () => {};
  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos.filter((todo) => !todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
    // setName(JSON.parse(localStorage.getItem('name')) ?? '');
  }, []);

  function remainingCalculation() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function handleNameInput(event) {
    setName(event.target.value);
    //localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              className="todo-input"
              placeholder="What is your name"
              value={name}
              onChange={(event) => handleNameInput(event)}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
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
