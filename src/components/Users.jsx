import React, { useState } from 'react'
import { useGetValues } from '../hooks/useGetValues';
import { api } from '../api';
import useFetch from '../hooks/useFetch';

const initialState = {
    fname: "",
    lname: "",
    age: "",
    gender: ""
};

const Users = () => {
    const { data, error, loading } = useFetch("users");
    const { handleChange, formData, setFormData } = useGetValues(initialState);
    const [editingItem, setEditingItem] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.views = Number(formData.views)

        if (editingItem) {
            api.put(`users/${editingItem.id}`, formData);
            setEditingItem(null)
        } else {
            api.post("users", formData);
        }

        setFormData(initialState);
    };

    const handleUpdate = (user) => {
        setEditingItem(user)
        setFormData(user)
        api.delete(`/users/${id}`)
    }

    const handleDelete = (id) => {
        api.delete(`/users/${id}`)
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mb-6">
                <input
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    type="text"
                    className="border px-3 py-1 rounded"
                    placeholder="First name"
                />
                <input
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    type="text"
                    className="border px-3 py-1 rounded"
                    placeholder="Last name"
                />
                <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                    className="border px-3 py-1 rounded w-24"
                    placeholder="Age"
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border px-3 py-1 rounded"
                >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-1 rounded"
                >
                    {editingItem ? "Save" : "Submit"}
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {data?.map((user) => (
                    <div key={user.id} className="border p-3 rounded">
                        <div className="font-semibold">{user.fname} {user.lname}</div>
                        <div className="text-sm">Age: {user.age}</div>
                        <div className="text-sm">Gender: {user.gender}</div>
                        <div className="flex justify-between mt-2 text-sm">
                            <button
                                onClick={() => handleUpdate(user)}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Users;