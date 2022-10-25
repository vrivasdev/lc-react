import PropTypes from 'prop-types';
import TodoFilters from './TodoFilters';
import React, { useState } from 'react';
import useToggle from '../hooks/useToggle';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAllTodos from './TodoCompleteAllTodos';

TodoList.protoTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  todosFiltered: PropTypes.func.isRequired,
};

function TodoList(props) {
  const [isFeaturesOneVisible, setIsFeaturesOneVisible] = useToggle(true);
  const [isFeaturesTwoVisible, setIsFeaturesTwoVisible] = useToggle(true);
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
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
                  onBlur={(event) => props.updateTodo(event, todo.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      props.updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.cancelEdit(event, todo.id);
                    }
                  }}
                />
              )}
            </div>
            <button
              onClick={() => props.deleteTodo(todo.id)}
              className="x-button"
            >
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
      <div className="toggles-container">
        <button onClick={() => setIsFeaturesOneVisible()} className="button">
          Features One Toggle
        </button>
        <button onClick={() => setIsFeaturesTwoVisible()} className="button">
          Features Two Toggle
        </button>
      </div>
      {isFeaturesOneVisible && (
        <div className="check-all-container">
          <TodoCompleteAllTodos completeAllTodos={props.completeAllTodos} />
          <TodoItemsRemaining remaining={props.remaining} />
        </div>
      )}
      {isFeaturesTwoVisible && (
        <div className="other-buttons-container">
          <TodoFilters
            todosFiltered={props.todosFiltered}
            filter={filter}
            setFilter={setFilter}
          />
          <TodoClearCompleted clearCompleted={props.clearCompleted} />
        </div>
      )}
    </>
  );
}

export default TodoList;
