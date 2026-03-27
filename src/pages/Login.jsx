import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api';
import { useApp } from '../context/AppContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await apiLogin(username, password);
        login({
          token: data.token,
          username,
          email: email || `${username}@example.com`,
        });
        navigate('/');
      } else {
        login({
          token: 'simulated-token',
          username,
          email,
        });
        navigate('/');
      }
    } catch (err) {
      setError(isLogin ? 'Invalid credentials' : 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-12 px-8">
      <div className="bg-white p-12 w-full max-w-[400px]">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl italic mb-2 text-gray-900">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Welcome back' : 'Join Atelier'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-600 p-3 mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              className="py-3 bg-transparent border-b border-beige-200 text-gray-900 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-beige-50 border-none py-4 text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-8 pt-8 border-t border-beige-200">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="bg-transparent border-none text-gray-900 font-semibold cursor-pointer ml-1 text-sm hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 bg-beige-100 text-center">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-medium">Demo Credentials</p>
            <code className="text-sm text-gray-900">User: mor_2314 | Pass: 83r5^_</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;