import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ForgotPassword() {
  var [email, setEmail] = useState("");
  var [msg, setMsg] = useState("");
  var [error, setError] = useState("");
  var [loading, setLoading] = useState(false);
  var [sent, setSent] = useState(false);

  // send the reset link to email
  var handleSubmit = async () => {
    setMsg("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      var res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setMsg(res.data.msg);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Forgot Password</h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          Enter your email to get a reset link
        </p>

        {/* show success message after email is sent */}
        {sent ? (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">✓ {msg}</p>
            <p className="text-gray-400 text-sm mb-4">
              Please check your inbox. The link will expire in 15 minutes.
            </p>
            <Link to="/login" className="text-blue-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
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

            {/* show error if any */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;