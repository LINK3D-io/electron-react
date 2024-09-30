import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Login from '../components/Login';
import Home from '../components/Home';
import useAuth from '../hooks/useAuth';
import { UserContextProvider } from '../context/UserContext';
import { ScannerContextProvider } from '../context/scannerContext';

function Main() {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (user.isAuthenticated === null) {
      refreshUser(); // initializes user when isAuthenticated is not set
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuthenticated]);

  return user.isAuthenticated ? <Home /> : <Login />;
}

export default function App() {
  return (
    <UserContextProvider>
      <ScannerContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </ScannerContextProvider>
    </UserContextProvider>
  );
}
