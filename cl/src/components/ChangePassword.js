-- import React, { useState } from "react";
-- import axios from "axios";

-- const ChangePassword = () => {
--   const [email, setEmail] = useState("");
--   const [newPassword, setNewPassword] = useState("");
--   const [message, setMessage] = useState("");

--   const handleSubmit = async (e) => {
--     e.preventDefault();

--     // Validate input
--     if (!email || !newPassword) {
--       setMessage("Email and new password are required");
--       return;
--     }

--     try {
--       const response = await axios.post("http://localhost:5000/change-password", {
--         email,
--         newPassword,
--       });
--       setMessage(response.data); // "Password changed successfully"
--     } catch (error) {
--       console.error(error);
--       setMessage(error.response?.data || "Error changing password");
--     }
--   };

--   return (
--     <form onSubmit={handleSubmit} style={styles.form}>
--       <h2>Change Password</h2>
--       <input
--         type="email"
--         placeholder="Email"
--         value={email}
--         onChange={(e) => setEmail(e.target.value)}
--         style={styles.input}
--       />
--       <input
--         type="password"
--         placeholder="New Password"
--         value={newPassword}
--         onChange={(e) => setNewPassword(e.target.value)}
--         style={styles.input}
--       />
--       <button type="submit" style={styles.button}>Change Password</button>
--       {message && <p style={styles.message}>{message}</p>}
--     </form>
--   );
-- };

-- const styles = {
--   form: {
--     display: "flex",
--     flexDirection: "column",
--     alignItems: "center",
--     marginTop: "20px",
--   },
--   input: {
--     margin: "10px 0",
--     padding: "10px",
--     width: "300px",
--     fontSize: "16px",
--   },
--   button: {
--     padding: "10px 20px",
--     fontSize: "16px",
--     backgroundColor: "#333",
--     color: "#fff",
--     border: "none",
--     cursor: "pointer",
--   },
--   message: {
--     marginTop: "10px",
--     color: "red",
--   },
-- };

-- export default ChangePassword;