import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from 'react-icons/fa';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password, isLoggedIn: false }));


    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    navigate("/login");
  }

  return (
    <div className="form-container">
      <h2><FaLock /> SIGN-UP</h2>
      <form onSubmit={handleSignup}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
