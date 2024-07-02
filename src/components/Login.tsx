import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { login } from '../services/auth';
import useAuth from '../hooks/useAuth';

function Login() {
  const { initializeUser } = useAuth();
  const cookies = new Cookies();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const data = await login(username, password);
    cookies.set('ft-at', data.credentials.access, {
      path: '/',
      sameSite: 'strict',
    });
    cookies.set('ft-rt', data.credentials.refresh, {
      path: '/',
      sameSite: 'strict',
    });
    initializeUser(data.credentials.access);
    toast.success('Logged in successfully!');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={async () => submitHandler()}>
        Login
      </button>
    </div>
  );
}

export default Login;
