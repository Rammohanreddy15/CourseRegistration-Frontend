import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imagelink, setImagelink] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = { title, description, price, imagelink };

        try {
            const response = await axios.post('http://localhost:3000/admin/courses', newCourse, {
                headers: { authorization: `Bearer ${token}` }
            });
            console.log('Course added successfully:', response.data);

            // Clear the form fields
            setTitle('');
            setDescription('');
            setPrice('');
            setImagelink('');

            // Navigate back to the user courses page
            navigate('/userdetails');
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    return (
        <div>
            <h1>Add New Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image Link:</label>
                    <input
                        type="text"
                        value={imagelink}
                        onChange={(e) => setImagelink(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
}

export default AddCourse;
