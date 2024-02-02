import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NumberPuzzle from './NumberPuzzle';
import TowersOfHanoi from './TowersOfHanoi';
import Navbar from './Navbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/number-puzzle" element={<NumberPuzzle />} />
                        <Route path="/towers-of-hanoi" element={<TowersOfHanoi />} />
                    </Routes>
                </div>
            </Router>
        </DndProvider>
    );
}

export default App;
