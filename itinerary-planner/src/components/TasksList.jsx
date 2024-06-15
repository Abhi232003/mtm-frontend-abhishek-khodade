// src/components/TasksList.jsx
import React, { useState } from 'react';

const TasksList = ({ tasks, updateTask, deleteTask }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setNewTaskDescription(task.description);
    };

    const handleUpdate = (e, taskId) => {
        e.preventDefault();
        if (!newTaskDescription.trim()) {
            alert('Task cannot be empty');
            return;
        }
        updateTask(taskId, newTaskDescription);
        setEditingTaskId(null);
    };

    const toggleCompletion = (taskId, completed) => {
        updateTask(taskId, { ...tasks.find(task => task.id === taskId), completed: !completed });
    };

    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={task.id}>
                    <span className="task-number">{index + 1}.</span>
                    {editingTaskId === task.id ? (
                        <form onSubmit={(e) => handleUpdate(e, task.id)}>
                            <input
                                type="text"
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingTaskId(null)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</span>
                            <button onClick={() => startEditing(task)}>Edit</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id, task.completed)}
                            />
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TasksList;
