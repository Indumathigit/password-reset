import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

var API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function ResetPassword() {
  var { token } = useParams();
  var navigate = useNavigate();

  var [password, setPassword] = useState("");
  var [confirm, setConfirm] = useState("");
  var [error, setError] = useState("");
  var [msg, setMsg] = useState("");
  var [loading, setLoading] = useState(false);
  var [tokenValid, setTokenValid] = useState(null);
  var [done, setDone] = useState(false);

  // check if token is valid when page loads
  useEffect(() => {
    var checkToken = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/verify/${token}`);
        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);
        var errMsg = err.response?.data?.msg || "This link is invalid or has expired.";
        // show alert as required by task
        alert("⚠️ " + errMsg + " Please request a new link.");
        setError(errMsg);
      }
    };
    checkToken();
  }, [token]);

  // handle reset password form submit
  var handleReset = async () => {
    setError("");

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      var res = await axios.post(`${API_URL}/api/auth/reset/${token}`, { password });
      setMsg(res.data.msg);
      setDone(true);
      // redirect to login after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      var errMsg = err.response?.data?.msg || "Something went wrong.";
      setError(errMsg);
      // alert user if token expired during session
      if (err.response?.status === 400) {
        alert("⚠️ " + errMsg);
      }
    }

    setLoading(false);
  };

  // show loading while verifying token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-gray-500">Checking reset link...</p>
      </div>
    );
  }

  // show error page if token is expired or invalid
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <p className="text-red-500 font-medium mb-2">Link Expired or Invalid</p>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mb-5">Enter your new password below</p>

        {/* show success message after password is reset */}
        {done ? (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-2">✓ {msg}</p>
            <p className="text-gray-400 text-sm">Redirecting to login in 3 seconds...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* show error if any */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default ResetPassword;