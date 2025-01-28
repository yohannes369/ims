import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${id}`);
                const user = res.data[0];
                setEmail(user.email);
                setRole(user.role);
            } catch (err) {
                console.error('Error fetching user:', err);
                alert('Error fetching user');
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/users/${id}`, { email, password, role });
            alert(res.data.msg);
        } catch (err) {
            console.error('Error updating user:', err);
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" required />
            <button type="submit">Update User</button>
        </form>
    );
};

export default EditUser;
