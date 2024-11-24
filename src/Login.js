import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import auth from your firebase.js

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const usenavigate = useNavigate();

    // Clear session storage on component load
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            // Proceed with Firebase authentication
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Successful login
                    const user = userCredential.user;
                    toast.success('Login Successful');
                    
                    // Save necessary user information to sessionStorage
                    sessionStorage.setItem('username', user.email); // or any other user information
                    sessionStorage.setItem('userrole', 'user'); // You can replace with user role if available
                    sessionStorage.setItem('jwttoken', user.refreshToken); // Store Firebase refresh token if needed
                    
                    // Navigate to the home page
                    usenavigate('/');
                })
                .catch((error) => {
                    toast.error('Login failed: ' + error.message);
                });
        }
    };

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    };

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ marginTop: '100px' }}>
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header text-center">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>Don't have an account? <Link to="/register" className="btn btn-link text-black">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
