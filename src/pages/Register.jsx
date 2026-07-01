import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setError("");
    setBusy(true);
    try {
      await register(name, email, password);
      navigate("/"); // success → go home
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-sub">Join Veloure</p>

        {error && <div className="auth-error">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={busy}>
          {busy ? "Creating..." : "Sign Up"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
