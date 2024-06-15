// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TasksList from './components/TasksList';
import './App.css';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
    <Router>
      <div>
        <h1>Itinerary Planner</h1>



        <Routes>
          <Route exact path="/" element={<TaskInput addTask={addTask} />} />

          <Route path="/list" element={<TasksList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />} />

        </Routes>
      </div >
    </Router >
  );
}
