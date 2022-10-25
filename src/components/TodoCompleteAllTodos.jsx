import React from 'react';
import PropTypes from 'prop-types';

TodoCompleteAllTodos.protoTypes = {
  completeAllTodos: PropTypes.func.isRequired,
};

function TodoCompleteAllTodos(props) {
  return (
    <div>
      <div className="button" onClick={props.completeAllTodos}>
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;
