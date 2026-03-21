import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
  var [loading, setLoading] = useState(false);
  var navigate = useNavigate();

  // handle register button click
  var handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/auth/register`, { email, password });
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Register</h2>
        <p className="text-center text-gray-500 text-sm mb-5">Create a new account</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* show error if any */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
        >
          {loading ? "Please wait..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;