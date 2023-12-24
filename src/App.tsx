import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // <-- Import the correct component
import 'react-toastify/dist/ReactToastify.css'; // <-- Import the stylesheet for styling

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import 'primeicons/primeicons.css';

import 'primereact/resources/themes/tailwind-light/theme.css';
import React from 'react';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer /> {/* <-- Place the ToastContainer here */}
          
          <Routes>
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route element={<DefaultLayout />}>
              <Route index element={<ECommerce />} />
              {routes.map((routes, index) => {
                const { path, component: Component } = routes;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
