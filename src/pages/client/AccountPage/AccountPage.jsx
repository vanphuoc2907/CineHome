import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {
    AiOutlineUser,
    AiOutlineLogout,
    AiOutlineGift,
    AiOutlineUpload,
} from 'react-icons/ai';
import { MdMovie } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { ContextAuth } from '../../../context/AuthProvider';
import { LoginProvider } from '../../../context/LoginProvider';

const AccountPage = () => {
    const { accountLogin, setAccountLogin } = useContext(ContextAuth);
    const [previewImg, setPreviewImg] = useState(null);
    const [imgUpload, setImgUpload] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setPreviewImg(accountLogin?.imgUrl);
    }, [accountLogin]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPreviewImg(reader.result);
        reader.readAsDataURL(file);
        setImgUpload(file);
    };

    const handleMenuClick = (key) => {
        switch (key) {
            case '1':
                navigate('/accountpage');
                break;
            case '2':
                navigate('/accountpage/rentpage');
                break;
            case '3':
                navigate('/accountpage/sub');
                break;
            case '4':
                navigate('/accountpage/offers');
                break;
            case '5':
                setAccountLogin(false);
                navigate('/accountpage/logout');
                break;
            default:
                break;
        }
    };

    const menuItems = [
        { key: '1', icon: <AiOutlineUser size={20} />, label: 'Account' },
        { key: '2', icon: <MdMovie size={20} />, label: 'Movie Library Management' },
        { key: '3', icon: <FiSettings size={20} />, label: 'Subscription Plan Management' },
        { key: '4', icon: <AiOutlineGift size={20} />, label: 'Your Offers' },
        { key: '5', icon: <AiOutlineLogout size={20} />, label: 'Logout' },
    ];

    return (
        <LoginProvider value={{ imgUpload }}>
            <Box sx={{ backgroundColor: '#fff', padding: 4, paddingTop : 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Box textAlign="center">
                            <Avatar
                                src={previewImg}
                                sx={{ width: 80, height: 80, margin: '0 auto 10px auto' }}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<AiOutlineUpload />}
                                sx={{ mb: 2 }}
                            >
                                Choose Avatar
                                <input hidden type="file" onChange={handleFileChange} />
                            </Button>
                            <Typography variant="body2" gutterBottom>
                                ID: {accountLogin?.email}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <List>
                            {menuItems.map((item) => (
                                <ListItem
                                    button
                                    key={item.key}
                                    onClick={() => handleMenuClick(item.key)}
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography sx={{ color: 'black' }}>
                                                {item.label}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                        <Outlet context={{ imgUpload }} />
                    </Grid>
                </Grid>
            </Box>
        </LoginProvider>
    );
};

export default AccountPage;
