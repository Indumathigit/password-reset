import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
    alert("Email sent");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default ForgotPassword;