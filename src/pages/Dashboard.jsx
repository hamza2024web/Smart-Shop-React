import {useAuth} from "../context/AuthContext.jsx";

const Dashboard = () => {
    const { user, logout} = useAuth();
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.username} ({user?.role})</p>
            <button onClick={logout} className="btn-primary">Sign Out</button>
        </div>
    );
};
export default Dashboard;