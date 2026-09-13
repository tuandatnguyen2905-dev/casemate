import { useState } from 'react';
// Session management uses built-in fetch - no helper needed

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: username, 
          userData: { username, loginTime: Date.now() }
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        console.log('Session created:', data.ephemeralKey);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div>
      {isLoggedIn ? (
        <div>Welcome! You're logged in.</div>
      ) : (
        <button onClick={() => handleLogin('user123', 'password')}>
          Login
        </button>
      )}
    </div>
  );
}

export default LoginForm;
