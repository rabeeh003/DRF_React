import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Home() {
  const navigate = useNavigate();
  const authToken = JSON.parse(localStorage.getItem('authToken'));

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    } else {
      const decoded = jwtDecode(authToken['access']);
      console.log(decoded);
    }
  }, [authToken, navigate]);

  return (
    <div className='flex justify-center align-middle'>
      <Link to="/" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="data:image/png;base64,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" alt="" />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </Link>

    </div>
  );
}

export default Home;