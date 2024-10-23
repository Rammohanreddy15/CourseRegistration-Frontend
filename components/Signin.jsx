
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignIn({ setUserDetails, setMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };

        try {
            const response = await axios.post('http://localhost:3000/admin/signin', user);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Signin successful! Token stored.');
                setUserDetails(response.data.userDetails);
                navigate('/userdetails'); 
            } else {
                setMessage('Signin failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred during signin. Please try again.');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
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
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
}

export default SignIn;
