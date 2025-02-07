import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css"
import { API_URL } from "../../API";
const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(API_URL+
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      localStorage.setItem("authToken", data.token);
      navigate('/');
      
    } catch (error) {

      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (

    <div className="Inclusive-register-page">

      <div className="register-big-wrapper">


        <div className="register-banner-section ">

          <img src="https://mern-blog-website-1-snts.onrender.com/register.png" alt="banner" width="490px" />
        </div>

        <div className="section-wrapper">

          <div className="top-suggest_login">
            <span> Have an account? </span>
            <span style={{ fontWeight: 600, color: '#000', cursor: 'pointer'}} onClick={()=>navigate("/login")}>Sign In</span>
          </div>

          <div className="top-register-explain">
            <h2>Welcome to MERN Blog </h2>

            <p>
              It's easy and free to post your thinking on any topic and connect with thounsands of readers.

            </p>


          </div>


          <form onSubmit={registerHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Username</label>

            </div>
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>


            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong character"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button type="submit" >
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default RegisterScreen;
