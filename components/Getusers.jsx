import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GetUsers({ setUserDetails, setMessage }) {
    const [userDetails, setUserDetailsLocal] = useState([]); 
    const navigate = useNavigate();

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
                setMessage('Error fetching courses.');
            }
        };

        fetchData();
    }, [setUserDetails]);

 
    const handleAddCourse = () => {
        navigate('/addcourse');
    };

    return (
        <div>
            <h1>User Courses</h1>
            <ul>
                {Array.isArray(userDetails) && userDetails.map((course, index) => (
                    <li key={index}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p>Price: {course.price}</p>
                        <img src={course.imagelink} alt={course.title} />
                    </li>
                ))}
            </ul>
            <button onClick={handleAddCourse}>Add New Course</button>
        </div>
    );
}

export default GetUsers;
