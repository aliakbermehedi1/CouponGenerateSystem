import { Route, Routes, Navigate } from 'react-router-dom';
import ECommerce from './pages/Dashboard/ECommerce';
import React, { Suspense, useEffect } from 'react';
import SignIn from './pages/Authentication/SignIn';
import DefaultLayout from './layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { isValidToken } from './utility';
import Loader from './common/Loader';
import routes from './routes';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const App: React.FC<{}> = () => {
  const navigate = useNavigate();

  const [isInitialLoad, setIsInitialLoad] = React.useState<boolean>(true);

useEffect(() => {
  const tokenIsValid = isValidToken();

  // Only perform navigation on the initial load
  if (isInitialLoad) {
    if (!tokenIsValid) {
      // Navigate to '/auth/signin' if token is invalid
      navigate('/auth/signin');
    } else {
      // Do not navigate to '/' if token is valid and not on initial load
      // Instead, you can leave it empty or navigate to another default route if needed
      // navigate('/'); // Commenting this out or removing it will prevent auto-navigation to '/'
    }

    // Set isInitialLoad to false after the initial navigation
    setIsInitialLoad(false);
  }
}, [navigate, isInitialLoad]);

  

  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    // Simulate a loading time for demonstration purposes
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Toast container for notifications */}
          <ToastContainer />

          {/* Define application routes */}
          <Routes>
            {/* Set SignIn as the initial route */}
            <Route path="/auth/signin" element={<SignIn />} />

            {/* Nested route with DefaultLayout as the layout */}
            <Route element={<DefaultLayout />}>
              <Route index element={<ECommerce />} />

              {/* Map over routes and dynamically generate nested routes */}
              {routes.map((route, index) => {
                const { path, component: Component } = route;
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
};

export default App;
