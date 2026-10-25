import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    () => window.location.hash.replace('#', '') || '/'
  );

  // Listen for navigation changes.
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPage(window.location.hash.replace('#', '') || '/');
    };

    window.addEventListener('hashchange', handleNavigation);

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  // Navigate between pages without reloading the app.
  const navigate = (page) => {
    window.location.hash = page;
  };

  // Protect Dashboard and Profile.
  useEffect(() => {
    const protectedPages = ['/dashboard', '/profile'];
    const user = sessionStorage.getItem('pixoraUser');

    if (protectedPages.includes(currentPage) && !user) {
      window.location.hash = '/';
    }
  }, [currentPage]);

  // Display Dashboard.
  if (currentPage === '/dashboard') {
    if (!sessionStorage.getItem('pixoraUser')) {
      return null;
    }

    return <Dashboard />;
  }

  // Display Profile.
  if (currentPage === '/profile') {
    if (!sessionStorage.getItem('pixoraUser')) {
      return null;
    }

    return <Profile />;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password =
        'Password must contain at least 6 characters.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setServerMessage('');
    setMessageType('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error(
          'API URL is not configured. Please configure VITE_API_URL.'
        );
      }

      const response = await axios.post(`${apiUrl}/api/login`, {
        email: email.trim(),
        password,
      });

      console.log('Login API response:', response.data);

      if (response.data.success) {
        sessionStorage.setItem(
          'pixoraUser',
          JSON.stringify(response.data.user)
        );

        setErrors({});
        setMessageType('success');
        setServerMessage(
          response.data.message ||
            'Login successful! Welcome to PIXORA.'
        );

        // Navigate to Dashboard after displaying the message.
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessageType('error');
        setServerMessage(
          response.data.message || 'Login failed. Please try again.'
        );
      }
    } catch (error) {
      console.error(
        'Login error:',
        error.response?.data || error.message
      );

      setMessageType('error');

      setServerMessage(
        error.response?.data?.message ||
          error.message ||
          'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pixora-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <section className="login-container">
        <div className="brand">
          <div className="brand-icon">P</div>
          <span>PIXORA</span>
        </div>

        <div className="login-heading">
          <p className="eyebrow">YOUR NEXT LEVEL STARTS HERE</p>

          <h1>
            ENTER THE <span>GAMEVERSE</span>
          </h1>

          <p className="subtitle">
            Sign in and get back to your gaming universe.
          </p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>

            <input
              id="email"
              type="email"
              placeholder="gamer@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                setErrors((previous) => ({
                  ...previous,
                  email: '',
                }));

                setServerMessage('');
              }}
              autoComplete="email"
              disabled={loading}
            />

            {errors.email && (
              <p className="field-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    password: '',
                  }));

                  setServerMessage('');
                }}
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                className="toggle-password"
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          {serverMessage && (
            <div
              className={`server-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {serverMessage}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'CONNECTING...' : 'SIGN IN'}
            {!loading && <span aria-hidden="true"> ↗</span>}
          </button>
        </form>

        <div className="login-footer">
          <span className="status-dot"></span>
          <p>YOUR GAMEVERSE AWAITS</p>
        </div>

        <p className="demo-note">
          Demo login: gamer@example.com / 123456
        </p>
      </section>

      <footer className="page-footer">
        PIXORA <span>•</span> LEVEL UP YOUR WORLD
      </footer>
    </main>
  );
}

export default App;