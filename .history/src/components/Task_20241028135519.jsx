import React from 'react';

function Task({ task, index, toggleTask, deleteTask }) {
  return (
    <div className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => toggleTask(index)}
        disabled={task.isCompleted} // Disable if task is completed
      />
      <span className="task-text">{task.text}</span>
      <button className="remove-button" onClick={() => deleteTask(index)}>Remove</button>
    </div>
  );
}

export default Task;
