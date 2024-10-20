import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ setUserDetails, setMessage }) {
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
                navigate('/userdetails');
            } else {
                const signinResponse = await axios.post('http://localhost:3000/admin/signin', newUser);
                if (signinResponse.data.token) {
                    localStorage.setItem('token', signinResponse.data.token);
                    setMessage('Signin successful! Token stored.');
                    setUserDetails(signinResponse.data.userDetails);
                    navigate('/userdetails');
                } else {
                    setMessage('Signin failed.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred.');
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
            {/* <button onClick={navigate('/addcourse')}>add course</button> */}
        </div>
    );
}

export default Signup;
