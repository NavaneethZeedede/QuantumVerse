import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LabPage from './pages/LabPage'

function App() {
    return (
        <Router>
            <div className="w-full h-screen">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/lab" element={<LabPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
