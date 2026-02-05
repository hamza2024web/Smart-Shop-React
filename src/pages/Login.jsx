import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {AlertCircle , LogIn, User, Lock } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
    const  [username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if(result.success) navigate('/');
        else setError(result.message);
    };

    return (
        <div className="login-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass login-card">
                <div className="login-header">
                    <div className="logo-icon"><LogIn size={32} className="text-primary" /></div>
                    <h1>SmartShop</h1>
                    <p className="text-muted">B2B Management Portal</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-alert"><AlertCircle size={18} /><span>{error}</span></div>}
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-with-icon">
                            <User size={18} className="icon" />
                            <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="icon" />
                            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </motion.div>
            <style>{`
        .login-container { height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; }
        .login-card { width: 400px; padding: 2.5rem; }
        .login-header { text-align: center; margin-bottom: 2rem; }
        .input-with-icon { position: relative; }
        .input-with-icon .icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .input-with-icon input { padding-left: 3rem; }
        .error-alert { background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; display: flex; gap: 0.5rem; align-items: center; }
        .w-full { width: 100%; }
      `}</style>
        </div>
    );
};
export default Login;