import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Earth_b from '../../public/Earth_b'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './TaskInput.css'

const TaskInput = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            alert('Task cannot be empty');
            return;
        }
        addTask(task);
        alert('Task added successfully!');
        setTask('');
    };

    return (
        <div className='main_landing_cont'>
            <div className='logo-div'>
                <img src="../../../src/assets/mtm-logo.png" alt="" />
            </div>
            <div className='landing_container'>
                <div className="left-content">
                    <p>Plan your itineraries efficiently with <br />
                        <span className='mtm'>My Trip Mate</span><br />
                        <span className='it-plan'>Itinerary Planner,</span><br />
                        so you never forget anything while you travel the World.
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
                        <button className="task-add-btn" type="submit">Add Task +</button>
                        <br />
                        <Link className="list_btn" to="/list">Show list</Link>
                    </form>
                </div>
                <div className="right-content">
                    <Canvas className="canvas-background">
                        <ambientLight intensity={1} />
                        <pointLight position={[5, 5, 4]} intensity={200} color="#FFFFFF" />
                        <Suspense fallback={null}>
                            <Earth_b scale={[0.0045, 0.0045, 0.0045]} />
                            <OrbitControls
                                autoRotate={true}
                                enablePan={false}
                                enableZoom={false}
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={Math.PI / 2}
                            />
                        </Suspense>
                    </Canvas>
                    <p className='model_instruction'>Drag the mouse across the Earth <br /> to interact with it</p>
                </div>
            </div>
        </div >
    );
};

export default TaskInput;
