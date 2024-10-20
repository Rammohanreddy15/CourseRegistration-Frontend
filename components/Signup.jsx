import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username, password };
        
        try {
            const response = await axios.post('http://localhost:3000/admin/signup', newUser);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Signup successful! Token stored.');
            } else {
                setMessage('Signup failed.');
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            setMessage('Error signing up.');
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
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;
