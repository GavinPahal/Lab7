import React, { useState } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { text: 'Task 1', isCompleted: false },
    { text: 'Task 2', isCompleted: false },
    { text: 'Task 3', isCompleted: false },
  ]);
  const [filter, setFilter] = useState('all'); // Filter state

  const addTask = (task) => setTasks([...tasks, { text: task, isCompleted: false }]);

  const toggleTask = (index) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) => (i === index ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Filter tasks based on selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true; // All tasks
  });

  const pendingTasksCount = tasks.filter(task => !task.isCompleted).length;

  return (
    <div className="app">
      <h1>Day Planner</h1>
      <TaskForm addTask={addTask} />

      {/* Filter buttons with Completed in the middle */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      {/* Task count for All and Pending views */}
      {(filter === 'all' || filter === 'pending') && (
        <h2>You have {pendingTasksCount} tasks remaining</h2>
      )}

      {/* Task list display based on filter */}
      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
