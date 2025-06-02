import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login.jsx';
import Signup from './components/Signup';
import { 
  auth, 
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from './Firebase';
import { signInWithPopup } from 'firebase/auth';


axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
    
      const idToken = await user.getIdToken();
      await axios.post('/api/verify-firebase-token', { token: idToken });
      
      alert('Login successful!');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSignup = async (email, password) => {
    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send user data to backend
      await axios.post('/api/register-user', {
        uid: user.uid,
        email: user.email,
        // Add any additional user data here
      });
      
      alert('Signup successful! You can now login.');
      setIsLogin(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('User already exists');
      } else {
        alert(`Signup failed: ${error.message}`);
      }
    }
  };

  const handleContinueWithGoogle = async (isLoginFlow) => {
    try {
      // Firebase Google authentication
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Send to backend
      const idToken = await user.getIdToken();
      await axios.post('/api/verify-firebase-token', { token: idToken });
      
      if (isLoginFlow) {
        alert('Google login successful!');
      } else {
        // Additional registration data can be sent here
        await axios.post('/api/register-user', {
          uid: user.uid,
          email: user.email,
          isGoogleSignup: true
        });
        alert('Google signup successful! Account created.');
        setIsLogin(true);
      }
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        alert('This email is already registered with a different method. Please login with your existing method.');
      } else {
        alert(`Google authentication failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {isLogin ? (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setIsLogin(false)}
          onGoogleLogin={() => handleContinueWithGoogle(true)}
        />
      ) : (
        <Signup 
          onSignup={handleSignup} 
          onSwitchToLogin={() => setIsLogin(true)}
          onGoogleSignup={() => handleContinueWithGoogle(false)}
        />
      )}
    </div>
  );
}

export default App;