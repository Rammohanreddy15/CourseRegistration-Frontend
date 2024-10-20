import { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };
        
        try {
            const response = await axios.post('http://localhost:3000/admin/signup', user);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Signup successful! Token stored.');
            } else {
                const signinResponse = await axios.post('http://localhost:3000/admin/signin', user);
                if (signinResponse.data.token) {
                    localStorage.setItem('token', signinResponse.data.token);
                    setMessage('Signin successful! Token stored.');
                    setUserDetails(signinResponse.data.userDetails);
                } else {
                    setMessage('Signin failed.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred.');
        }
    };

    const getUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`http://localhost:3000/admin/userdetails`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        } else {
            setMessage('No token found, please sign in.');
        }
    };

    return (
        <div>
            <h1>Signup/Signin</h1>
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
            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {userDetails.username}</p>
                    <p>Password: {userDetails.password}</p>
                </div>
            )}
            <button onClick={getUserDetails}>Get User Details</button>
        </div>
    );
}

export default App;
