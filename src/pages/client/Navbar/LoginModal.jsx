import React, { useContext, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { ContextAccounts } from "../../../context/AccountProvider";
import { ContextAuth } from "../../../context/AuthProvider";
import { useNotification } from "../../../context/NotificationProvider";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebaseConfig";
import { addDocument } from "../../../services/firebaseService";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../utils/Constants";
import ForgotPassword from "./ForgotPassword";

const inner = { useroremail: "", pass: '' }
const LoginModal = ({ openLogin, handleCloseLogin, handleOpenSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(inner);
  const [error, setError] = useState(inner);
  const accounts = useContext(ContextAccounts);
  const showNotification = useNotification();
  const [forgot,setForGot] = useState(false);
  const { accountLogin, saveLocal } = useContext(ContextAuth);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const validation = () => {
    const newError = {};
    newError.useroremail = login.useroremail ? "" : "please enter username";
    newError.pass = login.pass ? "" : "please enter password ";
    setError(newError);
    return Object.values(newError).every(e => e == "");
  }

  const handleLogin = () => {
    if (!validation()) {
      return;
    }
    const acclogin = accounts.find(e => e.password == login.pass && e.email == login.useroremail || e.username == login.useroremail);
    if (!acclogin) {
      showNotification("Incorrect username or password","error");
      handleCloseLogin();
      return;
    }
    saveLocal("accountLogin", acclogin);
    showNotification("Log in successfully","success");
    handleCloseLogin();
  }

  // Google sign-in
  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const existingCustomer = accounts.find(customer => customer.email === user.email);
        let loggedInCustomer;

        if (!existingCustomer) {
            const newCustomer = {
                username: user.displayName,
                imgUrl:  user.photoURL,
                role: ROLES.USER,
                email : user.email
            };
            const account =  await addDocument('Accounts', newCustomer);
            loggedInCustomer = account;
        } else {
            loggedInCustomer = existingCustomer;
        }
        saveLocal("accountLogin", loggedInCustomer);
        showNotification('Login successfully!',"success");
        handleCloseLogin();
        navigate("/");
    } catch (error) {
      
    }
};

  return (
    <Modal open={openLogin} onClose={handleCloseLogin}>
     {forgot ? <ForgotPassword setForGot={setForGot} /> : <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Nút đóng modal */}
        <IconButton
          onClick={handleCloseLogin}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <FaTimes size={20} />
        </IconButton>

        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>

        {/* Ô nhập Email hoặc Username */}
        <TextField
          fullWidth
          label="Email or Username"
          type="text"
          placeholder="e.g. example@mail.com or your username"
          margin="normal"
          required
          name="useroremail"
          onChange={handleInput}
          error={!!error.useroremail}
          helperText={error.useroremail}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUser />
              </InputAdornment>
            ),
          }}
        />

        {/* Ô nhập Password */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="e.g. Example2006"
          margin="normal"
          name="pass"
          required
          onChange={handleInput}
          error={!!error.pass}
          helperText={error.pass}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaLock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography onClick={() => setForGot(true)} variant="body2" color="primary" textAlign="right" mt={1}>
          Forgot password?
        </Typography>

        {/* Nút Login */}
        <Button onClick={handleLogin} fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
          Login
        </Button>

        <Typography variant="body2" textAlign="center">
          Don’t have an account?{" "}
          <Typography onClick={handleOpenSignUp} component="span" color="primary" sx={{ cursor: "pointer" }}>
            Sign up
          </Typography>
        </Typography>

        <Typography variant="body2" textAlign="center" my={1}>
          — Or —
        </Typography>

        {/* Nút đăng nhập Google với icon */}
        <Button
          fullWidth
          variant="contained"
          onClick={signInWithGoogle}
          sx={{
            background: "linear-gradient(to right, #FF5733, #FFD700, #4CAF50)",
            color: "#fff",
            "&:hover": { opacity: 0.9 },
          }}
          startIcon={<FaGoogle />}
        >
          Continue with Google
        </Button>

        <Typography variant="caption" textAlign="center" display="block" mt={2}>
          By signing up, you agree to our{" "}
          <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
            Terms of Service
          </Typography>{" "}
          and{" "}
          <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
            Privacy Policy
          </Typography>.
        </Typography>
      </Box> }
      
    </Modal>
  );
};

export default LoginModal;