import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    first_name: '',
    last_name: '',
  });

  const navigate = useNavigate();
  const authToken = JSON.parse(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('username', formData.username);
    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('password', formData.password);
    form.append('dob', formData.dob);

    axios.post('http://127.0.0.1:8000/api/account/register/', form)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex  justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded ">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">First name</label>
          <input
            type="text"
            id="name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div><div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Last name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;