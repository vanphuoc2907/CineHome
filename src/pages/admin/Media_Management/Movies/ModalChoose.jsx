import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment } from '@mui/material';
import { CiSearch } from "react-icons/ci";
function ModalChoose({ openChoose, dataChoose, setOpenChoose, chooseType, selectedItems,handleSelect }) {
    const handleClose = () => {
        setOpenChoose(false);
    }
 console.log(dataChoose);
 
    const isSelected = (item) => selectedItems.includes(item);
    const [searchTerm, setSearchTerm] = useState('');
    const filtered = dataChoose?.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        || item.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Dialog open={openChoose} onClose={handleClose}>
            <div className='flex items-center px-2'>
                <DialogTitle>Choose {chooseType}</DialogTitle>
                <TextField
                    variant="outlined"
                    placeholder="Enter Category..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CiSearch style={{ color: '#999' }} />
                            </InputAdornment>
                        ),
                    }}

                />
            </div>
            <DialogContent>
                <Stack direction="row" spacing={1}>

                    <div className="flex flex-wrap gap-2">
                        {chooseType === "categories" &&
                            filtered?.map((item) => (
                                <Button
                                    onClick={() => handleSelect(item.id)}
                                    key={item.id}
                                    variant="outlined"
                                    color="primary"
                                    style={{
                                        color: isSelected(item.id) ? 'white' : "black", // Màu chữ (xanh lá)
                                        borderColor: 'black', // Màu viền (xanh lá)
                                        backgroundColor: isSelected(item.id) ? '#333' : "", // Màu nền (nhẹ hơn, nếu cần)
                                        width: `${item.name.length * 10}px`,
                                        minWidth: '100px',
                                    }}
                                >
                                    {item.name}
                                </Button>

                            ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {chooseType !== "categories" &&
                            filtered.map(item => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center"
                                    onClick={() => handleSelect(item.id)}
                                >
                                    <img
                                        src={item.imgUrl}
                                        alt="actor"
                                        className="w-12 h-12 rounded-full object-cover"
                                        style={{
                                            border: isSelected(item.id) ? '3px solid #007bff' : '0px solid #007bff', // Viền màu xanh
                                            borderRadius: '10px',         // Bo góc
                                            backgroundColor: '#fff',     // Nền trắng (tuỳ chọn)
                                        }}
                                    />
                                    <p style={{
                                        color: isSelected(item.id) ? 'red' : 'black'
                                    }

                                    } className="text-sm mt-1 text-center">{item.name}</p> {/* Hiển thị tên dưới ảnh */}
                                </div>
                            ))}
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChoose;