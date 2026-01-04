import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const data = await loginUser(email, password);

    setLoading(false);

    //  backend rejected login
    if (data?.error) {
      setError(data.error);
      return;
    }

    // login ONLY if token exists
    if (data?.token) {
      login({
        token: data.token,
        user: data.user || { email }, // safe fallback
      });

      navigate("/", { replace: true }); //  go to HOME
    } else {
      setError("Invalid login response");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-600 mb-3 text-sm">{error}</p>
      )}

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-600 font-medium">
          Register here
        </Link>
      </p>
    </div>
  );
}
