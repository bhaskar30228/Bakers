import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './AuthForm.css'; // We'll create this CSS file next
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios"
const AuthForm = ({onClose}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [email,setEmail]=useState("")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [errors,setErrors]=useState("")
 

  const handleSubmit = async(e) => {
    e.preventDefault()
    let endPoint=isLogin?"login":"signUp"
    const data=isLogin?{ email, password }: { username, email, password }

     await axios.post(`https://bakers-ujm5.onrender.com/auth/${endPoint}`, data)
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        onClose()
    }).catch(err=>{
        setErrors(err.response?.data?.error)
        console.log(err);
    })
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  
  };

  return (
    <div className="auth-container">
      <div className={`auth-form-container ${isLogin ? 'login' : 'register'}`}>
        <div className="form-header">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <RxCrossCircled onClick={onClose} />
          <p>
            {isLogin ? 'New to our bakery?' : 'Already have an account?'}
            <button type="button" onClick={toggleForm} className="toggle-btn">
              {isLogin ? 'Create an account' : 'Sign in instead'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e)=>setUsername(e.target.value)}
              required
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>


          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
              minLength={isLogin ? 6 : 8}
            />
          </div>

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          )}

          {!isLogin && (
            <div className="terms-agreement">
              <label>
                <input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? (
              <>
                <FaSignInAlt /> Sign In
              </>
            ) : (
              <>
                <FaUserPlus /> Register
              </>
            )}
          </button>

          {isLogin && (
            <div className="social-login">
              <p>Or sign in with:</p>
              <div className="social-icons">
                <button type="button" className="social-btn google">
                  Google
                </button>
                <button type="button" className="social-btn facebook">
                  Facebook
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;