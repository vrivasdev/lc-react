import React from 'react';
import PropTypes from 'prop-types';

TodoFilters.protoTypes = {
  todosFiltered: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

function TodoFilters(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.todosFiltered('all');
          props.setFilter('all');
        }}
        className={`button filter-button ${
          props.filter === 'all' ? 'filter-button-active' : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          props.todosFiltered('active');
          props.setFilter('active');
        }}
        className={`button filter-button ${
          props.filter === 'active' ? 'filter-button-active' : ''
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          props.todosFiltered('completed');
          props.setFilter('completed');
        }}
        className={`button filter-button ${
          props.filter === 'completed' ? 'filter-button-active' : ''
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
