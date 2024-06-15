import React, { useState } from 'react';
import './TaskList.css';

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
        updateTask(taskId, { description: newTaskDescription });
        setEditingTaskId(null);
        setNewTaskDescription('');
    };

    const toggleCompletion = (taskId, completed) => {
        updateTask(taskId, { ...tasks.find(task => task.id === taskId), completed: !completed });
    };

    return (
        <div className="tasks-list-container">
            <div className='list-title'>
                <h2>Itinerary tasks</h2>
            </div>
            <div className="tasks-table-container">
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th className='sr-col'>#</th>
                            <th className='description-column'>Description</th>
                            <th className='action-col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td className='sr-col'>{index + 1}.</td>
                                <td className='description-column'>
                                    {editingTaskId === task.id ? (
                                        <form onSubmit={(e) => handleUpdate(e, task.id)}>
                                            <input
                                                type="text"
                                                className='edit-input'
                                                value={newTaskDescription}
                                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                            />
                                            <button className="save-btn" type="submit">Save</button>
                                            <button className="cancel-btn" type="button" onClick={() => setEditingTaskId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <span className={`scrollable-text ${task.completed ? 'strike-through' : ''}`}>
                                            {task.description}
                                        </span>
                                    )}
                                </td>

                                <td className='action-col'>
                                    {editingTaskId !== task.id && (
                                        <>
                                            <button className="edit-btn" onClick={() => startEditing(task)}>Edit</button>
                                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                                            <label className="done-mark" htmlFor="checkbox">Mark as done: </label>
                                            <input
                                                type="checkbox"
                                                className='check-mark'
                                                checked={task.completed}
                                                onChange={() => toggleCompletion(task.id, task.completed)}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default TasksList;
