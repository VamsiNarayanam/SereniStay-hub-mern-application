import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("user"));

    if (stored?.email === email && stored?.password === password) {
      stored.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(stored));
      setEmail("");
      setPassword("");
      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="form-container">
      <h2>➡️ LOGIN</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
