import { useState } from 'react';
import Signup from '../components/Signup';
import Getusers from '../components/Getusers';

function App() {
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    return (
        <div>
            <Signup setUserDetails={setUserDetails} setMessage={setMessage} />
            {message && <p>{message}</p>}
            <Getusers userDetails={userDetails} setUserDetails={setUserDetails} setMessage={setMessage} />
        </div>
    );
}

export default App;
