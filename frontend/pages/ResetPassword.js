import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/verify/${token}`)
      .catch(() => alert("Invalid or expired link"));
  }, []);

  const submit = async () => {
    await axios.post(`http://localhost:5000/api/auth/reset/${token}`, { password });
    alert("Password updated");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Reset</button>
    </div>
  );
}

export default ResetPassword;