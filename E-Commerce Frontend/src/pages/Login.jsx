import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Ionicons Loader
const IonIcon = ({ name, className = '' }) => {
  useEffect(() => {
    const scriptId = 'ionicons-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
      document.body.appendChild(script);

      const noModuleScript = document.createElement('script');
      noModuleScript.noModule = true;
      noModuleScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
      document.body.appendChild(noModuleScript);
    }
  }, []);
  return <ion-icon name={name} class={className}></ion-icon>;
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Login states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showMessage = (text, type) => {
    setFormMessage({ text, type });
    setTimeout(() => setFormMessage({ text: '', type: '' }), 5000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      showMessage('Please fill in all fields.', 'error');
      return;
      
    }
     const userData = {
    name: "Harneet", // Replace with actual name from backend if available
    email: loginUsername
  };

  // ✅ Save user info in localStorage
 localStorage.setItem('user', JSON.stringify({ name: loginUsername }));
 window.dispatchEvent(new Event("storage")); 

  // ✅ Optionally show success message
  showMessage("Login successful!", "success");

  // ✅ Redirect to home/dashboard (where Navbar is visible)
  navigate("/");

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: loginUsername, password: loginPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage('Login successful!', 'success');
        if (rememberMe) localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        showMessage(data.message || 'Login failed.', 'error');
      }
    } catch (err) {
      showMessage('Server error during login.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupEmail || !signupUsername || !signupPhone || !signupPassword || !confirmPassword) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      showMessage('Invalid email format.', 'error');
      return;
    }
    if (signupPassword !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: signupUsername,
          email: signupEmail,
          password: signupPassword,
          phone: signupPhone,
        }),
      });

      const text = await res.text();
      if (res.ok) {
        showMessage('Signup successful! Please log in.', 'success');
        setIsLoginMode(true);
        setSignupEmail('');
        setSignupUsername('');
        setSignupPhone('');
        setSignupPassword('');
        setConfirmPassword('');
      } else {
        showMessage(text, 'error');
      }
    } catch (err) {
      showMessage('Server error during signup.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl px-10 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-indigo-700">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>

        {formMessage.text && (
          <div className={`mb-4 p-3 rounded text-center ${formMessage.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
            {formMessage.text}
          </div>
        )}

        <form onSubmit={isLoginMode ? handleLoginSubmit : handleSignupSubmit} className="space-y-5">
          {!isLoginMode && (
            <>
              <div>
                <label className="text-sm text-gray-700 block mb-1">Full Name</label>
                <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 block mb-1">Email</label>
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="text-sm text-gray-700 block mb-1">Phone</label>
                <input type="tel" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </>
          )}

          {isLoginMode && (
            <div>
              <label className="text-sm text-gray-700 block mb-1">Email</label>
              <input type="email" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <input
              type={isLoginMode ? (showLoginPassword ? 'text' : 'password') : showSignupPassword ? 'text' : 'password'}
              value={isLoginMode ? loginPassword : signupPassword}
              onChange={(e) => isLoginMode ? setLoginPassword(e.target.value) : setSignupPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="button" className="absolute right-3 top-[36px] text-gray-500" onClick={() => isLoginMode ? setShowLoginPassword(!showLoginPassword) : setShowSignupPassword(!showSignupPassword)}>
              <IonIcon name={isLoginMode ? (showLoginPassword ? 'eye-off' : 'eye') : (showSignupPassword ? 'eye-off' : 'eye')} />
            </button>
          </div>

          {/* Confirm Password */}
          {!isLoginMode && (
            <div className="relative">
              <label className="text-sm text-gray-700 block mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="button" className="absolute right-3 top-[36px] text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <IonIcon name={showConfirmPassword ? 'eye-off' : 'eye'} />
              </button>
            </div>
          )}

          {isLoginMode && (
            <div className="flex items-center text-sm">
              <input id="remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">Remember me</label>
            </div>
          )}

          <button type="submit" disabled={loading} className={`w-full py-2 rounded text-white font-medium transition ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
            {loading ? 'Please wait...' : isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="text-indigo-600 hover:underline" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
