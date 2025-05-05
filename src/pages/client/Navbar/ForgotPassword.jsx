import { Box, Button, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import { ContextAccounts } from '../../../context/AccountProvider';
import emailjs from 'emailjs-com';
import { boxStyle, CONFIRM_CODE, YOUR_SERVICE_ID, YOUR_USER_ID } from '../../../utils/Constants';
import { updateDocument } from '../../../services/firebaseService';
import { useNotification } from '../../../context/NotificationProvider';
const inner = { password: "", confirmpassword: "" }
function ForgotPassword({ setForGot, handleCloseLogin }) {
    const [account, setAccount] = useState(inner);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const showNotification = useNotification();
    const accounts = useContext(ContextAccounts);
    const [confirmCode, setConfirmCode] = useState(null);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isPass, setIsPass] = useState(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setAccount({ ...account, [name]: value });
    };
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const validation = () => {
        const newError = {};
        newError.password = account.password ? "" : "please enter password ";
        newError.confirmpassword = account.confirmpassword ? "" : "please enter confirmpassword ";
        newError.confirmpassword = account.password === account.confirmpassword ? "" : "passwords do not match";
        setError(newError);
        return Object.values(newError).every(e => e == "");
    }
    // Tạo mã xác nhận ngẫu nhiên gồm 4 chữ số
    const generateConfirmCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Mã xác nhận 4 số
    };
    const handleForgot = async () => {
        const account = accounts.find(a => a.email === email);
        if (!account) {
            setError("Email is not registered.");
            return;
        }
        const code = generateConfirmCode();
        setConfirmCode(code);
        const templateParams = {
            username: account.username,
            confirm_code: code,  // Gửi mã xác nhận qua email
            to_email: email,  // Địa chỉ email nhận
        };


        await emailjs.send(YOUR_SERVICE_ID, CONFIRM_CODE, templateParams, YOUR_USER_ID);
        setIsCodeSent(true);
    }
    const checkCode = () => {
        if (code != confirmCode) {
            showNotification("Code does not match", "error");
            return;
        }
        setIsPass(true);
    }
    const updateAccount = async () => {
        if (!validation()) {
            return;
        }
        const accountfid = accounts.find(a => a.email === email);
        const newAccount = { ...accountfid, password: account.password };
        await updateDocument("Accounts", newAccount);
        showNotification("Ban da doi mat khau thanh cong", "success");
         setForGot(false);
    }
    return (
        <> 
            {isPass ? (
                <Box sx={boxStyle}>
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
                    <Button onClick={updateAccount} fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
                        Đổi Mật Khẩu
                    </Button>

                </Box>
            ) : !isCodeSent ? (
                <Box sx={boxStyle}>
                    <p className="text-center">Nhập email của bạn để nhận mã xác nhận đặt lại mật khẩu.</p>
                    <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        placeholder="e.g. example@mail.com or your username"
                        margin="normal"
                        required
                        name="useroremail"
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUser />
                                </InputAdornment>
                            ),
                        }}
                        error={!!error}
                        helperText={error}
                    />
                    <Typography variant="body2" textAlign="center">
                        Already have an account?{" "}
                        <Typography
                            onClick={() => setForGot(false)}
                            component="span"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                        >
                            Login
                        </Typography>
                    </Typography>
                    <Button onClick={handleForgot} fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
                        Gửi mã xác nhận
                    </Button>
                </Box>
            ) : (
                <Box sx={boxStyle}>
                    <p className="text-center">Nhập mã xác nhận bạn đã nhận được.</p>
                    <TextField
                        fullWidth
                        label="Code"
                        type="text"
                        margin="normal"
                        required
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUser />
                                </InputAdornment>
                            ),
                        }}
                        error={!!error}
                        helperText={error}
                    />
                    <Typography variant="body2" textAlign="center">
                        <Typography
                            onClick={() => setForGot(false)}
                            component="span"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                        >
                            Quay lại
                        </Typography>
                    </Typography>
                    <Button onClick={checkCode} fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
                        Gửi
                    </Button>
                </Box>
            )}
           
        </>
    );
}

export default ForgotPassword;