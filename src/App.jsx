import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);
    const url1 = "http://localhost:3000/admin/courses";

    const getData = async () => {
        try {
            const response = await axios.get(url1, {
                headers: {
                    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbW1vaGFucmVkZHkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzI5NDA0ODg3fQ.omC95pNjrkkOkglXCiy3wYW8tt_4xR8AFmstWu_93cs"
                }
            });
            console.log(response);
            setData(response.data.courses);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Course List</h1>
            <ul>
            {data.map((course, index) => (
                <li key={index}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <p>Price: {course.price}</p>
                    <img src={course.imagelink} alt={course.title} />
                </li>
            ))}
        </ul>
        </div>
    );
}

export default App;
