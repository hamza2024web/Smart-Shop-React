import './App.css'
import Login from "./pages/Login.jsx";
import {Navigate, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace}/>}/>
        </Routes>
    )
}

export default App
