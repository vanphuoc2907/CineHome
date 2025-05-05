import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useAccount } from '../../../context/LoginProvider';
import { ROLES } from '../../../utils/Constants';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updateDocument } from '../../../services/firebaseService';
import { ContextAuth } from '../../../context/AuthProvider';
function EditProfile() {
    const { imgUpload } = useAccount() || {};
    const { accountLogin, saveLocal } = useContext(ContextAuth);
    const [editprofile, setEditProfile] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        setEditProfile(accountLogin);
    }, [accountLogin]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editprofile, [name]: value });
    };
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleUpdate = async () => {
        const newAccount = await updateDocument("Accounts", { ...editprofile, imgUrl: imgUpload });
        saveLocal("accountLogin", newAccount);
        

    };
    return (
        <Grid item>
            <Box sx={{ backgroundColor: '#fff', padding: 4, borderRadius: 2, margin: "auto" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Account Information
                </Typography>
                <form >
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        margin="normal"
                        onChange={handleInput}
                        value={editprofile?.name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={accountLogin?.username || ""}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <span style={{ color: 'green' }}>✓</span>,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="id"
                                value={accountLogin?.email || ""}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <span style={{ color: 'green' }}>✓</span>,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={editprofile?.gender || ""}
                            onChange={handleInput}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        margin="normal"
                        value={editprofile?.phone || ""}
                        onChange={handleInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    {accountLogin?.password ? (
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            name="password"
                            margin="normal"
                            onChange={handleInput}
                            value={editprofile?.password || ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ) : (
                        <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>
                            Sign in with Google
                        </Typography>
                    )}

                    <Box sx={{ mt: 3 }}>
                        <Button onClick={handleUpdate} variant="contained" color="primary">
                            Update
                        </Button>
                    </Box>
                </form>
            </Box>
        </Grid>
    );
}

export default EditProfile;