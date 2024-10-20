import axios from 'axios';

function Getusers({ userDetails, setUserDetails, setMessage }) {
    const getUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`http://localhost:3000/admin/userdetails`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                console.log(response.data);
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
            <button onClick={getUserDetails}>Get User Details</button>
            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {userDetails.username}</p>
                    <p>Password: {userDetails.password}</p>
                </div>
            )}
        </div>
    );
}

export default Getusers;
