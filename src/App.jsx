import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Signup from '../components/Signup';
import Getusers from '../components/Getusers';
import AddCourse from '../components/AddCourse';

function App() {
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState([]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Signup setUserDetails={setUserDetails} setMessage={setMessage} />} />
                    <Route path="/addcourse" element={<AddCourse />} />
                    <Route path="/userdetails" element={<Getusers userDetails={userDetails} setUserDetails={setUserDetails} setMessage={setMessage} />} />
                </Routes>
                {message && <p>{message}</p>}
            </div>
        </Router>
    );
}

export default App;
