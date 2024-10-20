import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ setUserDetails, setMessage }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { "username": username, "password": password };
        
        try {
            const response = await axios.post('http://localhost:3000/admin/signup', newUser);
            if (response.data) {
                localStorage.setItem('token', response.data);
                setMessage('Signup successful! Token stored.');
                navigate('/signin');
            } else {
                setMessage(response.data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred.');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;
