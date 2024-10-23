
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import SignIn from '../components/Signin';
import SignUp from '../components/Signup';
import Getusers from '../components/Getusers';
function App() {
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState([]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<SignIn setUserDetails={setUserDetails} setMessage={setMessage} />} />
                    <Route path="/signup" element={<SignUp setUserDetails={setUserDetails} setMessage={setMessage} />} />
                    <Route path="/userdetails" element={<Getusers userDetails={userDetails} setUserDetails={setUserDetails} setMessage={setMessage} />} />
                </Routes>
                {message && <p>{message}</p>}
            </div>
        </Router>
    );
}

export default App;
