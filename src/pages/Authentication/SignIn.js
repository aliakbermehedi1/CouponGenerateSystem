import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo/mainLogo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

const SignIn = () => {
  const navigate = useNavigate();
  const [skewClass, setSkewClass] = useState('-skew-y-12');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setSkewClass('skew-x-6'), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://arabian-hunter-backend.vercel.app/api/userInfo/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success && data.token) {
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('UserName', data.UserName);
        localStorage.setItem('BranchName', data.BranchName);
        localStorage.setItem('RollName', data.RollName);
        localStorage.setItem('LoginID', data.LoginID);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Login Failed!');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Login error!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="rounded-2xl bg-white shadow-default flex items-center justify-center">
        <div className="hidden xl:block xl:w-1/2">
          <div className="py-17.5 pr-16 pl-28 text-center">
            <img src={Logo} alt="Logo" className={`w-full h-56 ${skewClass} animated-logo`} />
          </div>
        </div>

        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black">Welcome to Arabian Hunter</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black">Login ID</label>
              <input
                type="text"
                placeholder="Enter login ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full rounded-lg border py-4 pl-6 pr-10 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border py-4 pl-6 pr-10 outline-none"
              />
            </div>

            <div className="mb-5">
              <div className="w-full cursor-pointer rounded-lg border bg-primary p-4 text-white">
                <input type="submit" value="Log In" disabled={loading} />
                {loading && <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="8" />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
