import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
function Signup() {
  const [profileImageURL, setProfileImageURL] = useState(null)
  const [errorData, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    first_name: '',
    last_name: '',
    profile: null,
  })

  const navigate = useNavigate()
  const authToken = JSON.parse(localStorage.getItem('authToken'))

  useEffect(() => {
    if (authToken) {
      navigate('/')
    }
  }, [authToken, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, profile: file })
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImageURL(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('username', formData.username);
    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('email', formData.email);
    form.append('password', formData.password);

    axios.post('http://127.0.0.1:8000/api/account/register/', form)
      .then((response) => {
        console.log(response.data);
        const form2 = new FormData();
        form2.append('dob', formData.dob);
        form2.append('phone', formData.phone);
        form2.append('profile', formData.profile);
        form2.append('user', response.data.id);
        console.log(form2);
        axios.post('http://127.0.0.1:8000/api/account/register2/', form2).then(() => {
          navigate('/');
        }).catch((error) => {
          console.log(error)
          setError(error.response.data.message || 'An error occurred')
          console.log(errorData);
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.username) {
          setError(error.response.data.username[0] || 'An error occurred')
        } else if (error.response.data.email) {
          setError(error.response.data.email[0] || 'An error occurred')
        }
        console.log(errorData);
      });
  };

  return (
    <div className="flex  justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded ">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <div className="mb-4 ">
          {profileImageURL && (
            <div className='flex justify-center'>
              <img src={profileImageURL} className='w-6/12' alt="Profile Preview" />
            </div>
          )}
          <label className="block text-sm font-semibold mb-1">Profile</label>
          <input
            type="file"
            accept="image/*"
            name="profile"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help"
            required
          />
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Username</label>
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
        {errorData && (
          <p className="mt-2 text-sm text-center pb-3 text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span> {errorData}
          </p>
        )}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;