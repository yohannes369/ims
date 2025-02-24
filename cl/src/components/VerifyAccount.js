-- import React, { useEffect } from "react";
-- import axios from "axios";
-- import { useParams } from "react-router-dom";

-- const VerifyAccount = () => {
--   const { token } = useParams();

--   useEffect(() => {
--     const verifyUser = async () => {
--       try {
--         const response = await axios.get(`http://localhost:5000/verify/${token}`);
--         alert(response.data); // "Account verified successfully"
--       } catch (error) {
--         console.error(error);
--         alert("Error verifying account");
--       }
--     };

--     verifyUser();
--   }, [token]);

--   return <div>Verifying your account...</div>;
-- };

-- export default VerifyAccount;