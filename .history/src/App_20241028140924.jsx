import React, { useState } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { text: 'Task 1', isCompleted: false },
    { text: 'Task 2', isCompleted: true },
    { text: 'Task 3', isCompleted: false },
  ]);
  const [filter, setFilter] = useState(null); // Set to null initially

  const addTask = (task) => setTasks([...tasks, { text: task, isCompleted: false }]);

  const toggleTask = (index) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) => (i === index ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Filtered tasks based on selection
  const filteredTasks = tasks.filter(task => filter === 'completed' ? task.isCompleted : true);

  return (
    <div className="app">
      <h1>Day Planner</h1>
      <TaskForm addTask={addTask} />

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter(null)}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      {/* Display task list only when 'Completed' is selected */}
      {filter === 'completed' && (
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <Task
                key={index}
                index={index}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <p>No completed tasks to display.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
