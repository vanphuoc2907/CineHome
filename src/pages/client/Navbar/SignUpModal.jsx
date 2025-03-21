import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";
import { Modal, Box, Typography, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { addDocument } from "../../../services/firebaseService";
import { ROLES } from "../../../utils/Constants";
import { ContextAccounts } from "../../../context/AccountProvider";
import { ContextAuth } from "../../../context/AuthProvider";

const inner = { username: "", email: "", password: "", confirmpassword: "", role : ROLES.USER }
const SignUpModal = ({ openSignUp, handleCloseSignUp, handleOpenLogin }) => {

    const [account, setAccount] = useState(inner);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(inner);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const accounts = useContext(ContextAccounts);
    const { accountLogin, saveLocal } = useContext(ContextAuth);
    const validation = () => {
        const newError = {};
        newError.username = account.username ? "" : "please enter username";
        newError.username = accounts.find(e => e.username == account.username ) ? "username already exists" : "" ;
        newError.email = account.email ? "" : "please enter email ";
        newError.email = accounts.find(e => e.email == account.email ) ? "email already exists" : "" ;
        newError.password = account.password ? "" : "please enter password ";
        newError.confirmpassword = account.confirmpassword ? "" : "please enter confirmpassword ";
        newError.confirmpassword = account.password === account.confirmpassword ? "" : "passwords do not match";
        setError(newError);
        return Object.values(newError).every(e => e == "");
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };

    const signupAccount = async () => {
        if (!validation()) {
            return;
        }
        const { confirmpassword, ...accountNew } = account;

      const accountLogin =  await addDocument("Accounts",accountNew);
       saveLocal("accountLogin",accountLogin);
       setAccount(inner);
       handleCloseSignUp();

    }

    return (
        <Modal open={openSignUp} onClose={handleCloseSignUp}>
            <Box
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
                    onClick={handleCloseSignUp}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <FaTimes size={20} />
                </IconButton>

                <Typography variant="h5" textAlign="center" mb={2}>
                    Sign Up
                </Typography>

                {/* Ô nhập Username */}
                <TextField
                    fullWidth
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    margin="normal"
                    required
                    name="username"
                    value={account.username}
                    onChange={handleInput}
                    error={!!error.username}
                    helperText={error.username}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaUser />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Ô nhập Email */}
                <TextField
                    fullWidth
                    label="Email"
                    type="text"
                    placeholder="e.g. example@mail.com"
                    margin="normal"
                    required
                    name="email"
                    value={account.email}
                    onChange={handleInput}
                    error={!!error.email}
                    helperText={error.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaEnvelope />
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
                    required
                    name="password"
                    value={account.password}
                    onChange={handleInput}
                    error={!!error.password}
                    helperText={error.password}
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

                {/* Ô xác nhận lại mật khẩu */}
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    margin="normal"
                    required
                    name="confirmpassword"
                    value={account.confirmpassword}
                    onChange={handleInput}
                    error={!!error.confirmpassword}
                    helperText={error.confirmpassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaLock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Nút đăng ký */}
                <Button onClick={signupAccount} fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
                    Sign Up
                </Button>

                <Typography variant="body2" textAlign="center">
                    Already have an account?{" "}
                    <Typography onClick={handleOpenLogin} component="span" color="primary" sx={{ cursor: "pointer" }}>
                        Login
                    </Typography>
                </Typography>

                <Typography variant="body2" textAlign="center" my={1}>
                    — Or —
                </Typography>

                {/* Nút đăng ký với Google */}
                <Button
                    fullWidth
                    variant="contained"
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
            </Box>
        </Modal>
    );
};

export default SignUpModal;