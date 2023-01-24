import './App.scss';

import ReactModal from 'react-modal';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import PresaleV1 from './pages/PresaleV1';
import PresaleV2 from './pages/PresaleV2';
import { useContext } from 'react';
import { UserContext, UserContextProvider } from './contexts/UserContext';
import PresaleLogin from './pages/PresaleLogin';

const isSalePage = process.env.REACT_APP_PAGE === 'sale';

ReactModal.setAppElement('#root');

const AppRoutes = () => {
  const { isPresaleWhitelisted } = useContext(UserContext);
  return (
    <Routes>
      {isSalePage ? (
        <>
          <Route
            path="/"
            element={isPresaleWhitelisted ? <PresaleV1 /> : <PresaleLogin />}
          />
          <Route
            path="/hometest"
            element={isPresaleWhitelisted ? <PresaleV1 test /> : <PresaleLogin test />}
          />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/hometest" element={<Home test />} />
          <Route
            path="/private"
            element={isPresaleWhitelisted ? <PresaleV1 /> : <PresaleLogin />}
          />
          <Route
            path="/private-v2"
            element={isPresaleWhitelisted ? <PresaleV2 /> : <PresaleLogin />}
          />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <AppRoutes />
        </UserContextProvider>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
};

export default App;
