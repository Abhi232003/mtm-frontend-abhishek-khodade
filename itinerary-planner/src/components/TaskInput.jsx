// src/components/TaskInput.jsx
import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Earth from '../../public/Earth'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

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
        <div className='main_landing_cont'>
            <div className='landing_container'>
                <div className="left-content">
                    <p>Plan you itineraries eficiently with <br />
                        <span className='mtm'>My Trip Mate's</span><br />
                        <span className='it-plan'>Itinerary Planner,</span><br />
                        so you never forget anything while you travel the World
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task">Enter a task: </label>
                        <br />
                        <input
                            type="text"
                            className='task_input'
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Add a new task"
                        />
                        <button className="task-add-btn" type=" submit">Add Task +</button>
                        <br />
                        <Link className="list_btn" to="/list">Show list</Link>
                    </form>
                </div>
                <div className="right-content">
                    <Canvas className="canvas-background">
                        <ambientLight intensity={1} />
                        <Suspense fallback={null}>
                            <Earth scale={[1.8, 1.8, 1.8]} /> {/* Increase the size of the Earth */}
                            <OrbitControls
                                autoRotate={true}  // Enable auto-rotate
                                enablePan={false}  // Disable panning (optional)
                                enableZoom={false}  // Enable zooming (optional)
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={Math.PI / 2}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </div >
    );
};

export default TaskInput;
