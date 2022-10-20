import '../reset.css';
import '../App.css';
import { useState } from 'react';

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

  const [todoInput, setTodoInput] = useState('Something');
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setTodoInput('');
    setIdForTodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? `line-through` : ``
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                    onBlur={(event) => updateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEdit(event, todo.id);
                      }
                    }}
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
