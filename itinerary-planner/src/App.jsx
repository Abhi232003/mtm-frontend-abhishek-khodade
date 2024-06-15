// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TasksList from './components/TasksList';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("tasks");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (description) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), description, completed: false },
    ]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Itinerary Planner</h1>
      <TaskInput addTask={addTask} />
      <TasksList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}
