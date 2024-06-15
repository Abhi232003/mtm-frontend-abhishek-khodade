// src/components/TaskInput.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskInput = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            alert('Task cannot be empty');
            return;
        }
        addTask(task);
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit">Add Task</button>
            <Link className="list_btn" to="/list">Show list</Link>
        </form>
    );
};

export default TaskInput;
