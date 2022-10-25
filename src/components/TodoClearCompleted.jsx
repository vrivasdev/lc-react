import React from 'react';
import PropTypes from 'prop-types';

TodoClearCompleted.protoTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

function TodoClearCompleted(props) {
  return (
    <div>
      <button className="button" onClick={props.clearCompleted}>
        Clear completed
      </button>
    </div>
  );
}

export default TodoClearCompleted;
