import React, { useState } from 'react';
import Logo from '../../images/logo/mainLogo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook


  const [loginId, setLoginId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
 
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/userInfo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });
  
      const data = await response.json();
  
      if (data.success && data.token) {
        // Save the token to local storage
        localStorage.setItem('jwtToken', data.token);
  
        // Save additional user information to local storage
        localStorage.setItem('UserName', data.UserName);
        localStorage.setItem('BranchName', data.BranchName);
        localStorage.setItem('RollName', data.RollName);
        localStorage.setItem('LoginID', data.LoginID);
  
        // Handle successful login, e.g., redirect to dashboard or set user context
        console.log('Logged in successfully:', data);
        navigate('/');
        toast.success('Login successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Navigate to another page or update the user state as needed
        // For example, if you're using React Router, you can navigate like this:
        // history.push('/dashboard'); // Make sure to import useHistory from 'react-router-dom'
      } else {
        toast.error('Login Failed!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setError(data.message || 'Failed to login');

      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login');
    }
  };
  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="rounded-2xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex items-center justify-center">
        {/* ... (rest of your JSX code) */}

        <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-32 text-center">
              <div className="w-full h-full">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-full h-70 -skew-y-1"
                />
              </div>
            </div>
          </div>
        
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Welcome to Arabian Hunter
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">Login ID</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter login ID"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <span className="absolute right-4 top-4">
                  {/* ... (Your eye or lock icon) */}
                </span>
              </div>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-5">
              <input
                type="submit"
                value="Log In"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
