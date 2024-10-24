
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignUp({ setUserDetails, setMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username, password };

        try {
            const response = await axios.post('http://localhost:3000/admin/signup', newUser);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Signup successful! Token stored.');
                setUserDetails(response.data.userDetails);
                navigate('/userdetails'); 
            } else {
                setMessage('Signup failed. User might already exist.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred during signup. Please try again.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
    );
}

export default SignUp;
