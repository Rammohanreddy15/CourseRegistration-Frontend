import { useState } from 'react';
import axios from 'axios';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token,setToken]=useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { "username": username, "password": password };
        try {
            const response = await axios.post('http://localhost:3000/admin/signin', newUser);
            if (response.data.token) {
                setToken({"token":response.data.token});
            } else {
                setToken({"token":"no user found"});          
            }      
        } catch (error) {
            console.error('Error:', error);
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
            <p>{token}</p>
        </div>
    );
}

export default Signin;