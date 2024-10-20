import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Getusers({ setUserDetails, setMessage }) {
    const [userDetails, setUserDetailsLocal] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/courses', {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserDetails(response.data.courses);
                setUserDetailsLocal(response.data.courses);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, [setUserDetails]);
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {Array.isArray(userDetails) && userDetails.map((user, index) => (
                    <li key={index}>
                        <h2>{user.title}</h2>
                        <p>{user.description}</p>
                        <p>Price: {user.price}</p>
                        <img src={user.imagelink} alt={user.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Getusers;
