import React from 'react';
import {
    Dialog, DialogTitle,
    TextField, Button, Avatar, Box, Select, MenuItem, FormControl, InputLabel, Grid, Paper, DialogActions, IconButton, Autocomplete
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { IoMdPhotos } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { ContextCategories } from "../../../../context/CategoryProvider";
import { ContextCharacters } from "../../../../context/CharacterProvider";
import { ContextActors } from "../../../../context/ActorProvider";
import { ContextAuthors } from "../../../../context/AuthorProvider";
import { ContextPlans } from '../../../../context/PlanProvider';
import { getObjectById } from '../../../../utils/FunctionContants';
function ModalMovie({ open, handleClose, movie, errors, setMovie, handleSelect, handleChoose, handleSubmit }) {
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const actors = useContext(ContextActors);
    const authors = useContext(ContextAuthors);
    const plans = useContext(ContextPlans);
    const handleDelete = (item, type) => {
        handleSelect(item, type);
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}>
            <DialogTitle>{movie.id ? "Edit Movie" : "Add Movie"}</DialogTitle>
            <Grid container spacing={2} className='px-3' alignItems="stretch">
                {/* Ô đầu tiên - 50% chiều rộng */}
                <Grid item xs={12} md={6} style={{ display: 'flex' }}>
                    <Paper style={{ padding: 16 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name "
                            type="text"
                            fullWidth
                            name='name'
                            value={movie.name}
                            onChange={handleInput}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={2}
                            name='description'
                            value={movie.description}
                            onChange={handleInput}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                        <TextField
                            margin="dense"
                            label="Duration"
                            type="text"
                            fullWidth
                            multiline
                            name='duration'
                            value={movie.duration}
                            onChange={handleInput}
                            error={!!errors.duration}
                            helperText={errors.duration}
                        />
                        <Autocomplete
                            className='mt-2'
                            options={authors} // Danh sách các tác giả
                            getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm kiếm hoặc chọn tác giả"
                                    error={!!errors.authorID}
                                    helperText={errors.authorID}
                                />
                            )}
                            value={
                                authors.find((author) => author.id === movie.authorID) || null // Hiển thị giá trị đã chọn
                            }
                            onChange={(event, newValue) => {
                                // Cập nhật giá trị khi người dùng chọn
                                handleInput({
                                    target: { name: "authorID", value: newValue ? newValue.id : "" },
                                });
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                            noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
                            fullWidth
                        />
                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="my-select-label">Plan ID</InputLabel>
                            <Select
                                labelId="my-select-label"
                                label="Chọn giá trị"
                                name='planID'
                                value={movie.planID}
                                onChange={handleInput}
                                error={!!errors.planID}
                                helperText={errors.planID}
                            >
                                {plans
                                    ?.slice() // Tạo bản sao để tránh thay đổi mảng gốc
                                    .sort((a, b) => a.level - b.level) // Sắp xếp tăng dần theo lever
                                    .map((row, index) => (
                                        <MenuItem key={index} value={row.id}>
                                            {row.title}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        {getObjectById(movie?.planID, plans)?.level > 2 && <TextField
                            margin="dense"
                            label="RentalPrice"
                            type="number"
                            fullWidth
                            multiline
                            name="rentalPrice"
                            onChange={handleInput}
                        />}

                    </Paper>
                </Grid>
                {/* Ô thứ hai - 50% chiều rộng */}
                <Grid item xs={12} md={6} className='flex'>
                    <Paper style={{ padding: 16 }} className='flex-1'>
                        <div >
                            <div onClick={() => handleChoose("categories")} className='flex  items-center '>
                                <h3>Category</h3>
                                < BiSolidCategoryAlt className='ms-2' />
                            </div>
                            {movie.listCate.map((row) => (
                                <button onClick={() => handleDelete(row, "categories")} className="p-2 ms-5 mt-2 bg-cyan-400" style={{ position: 'relative' }}>{getObjectById(row, categories)?.name}
                                    <MdDelete className='absolute top-0 left-0 text-red-500 -translate-x-2 -translate-y-2 bg-white rounded-full ' />
                                </button>
                            )
                            )}
                        </div>
                        <div className='mt-3'>
                            <div onClick={() => handleChoose("actors")} className='flex  items-center '>
                                <h3>Actor</h3>
                                < FaUserSecret className='ms-2' />
                            </div>
                            {movie.listActor.map((row) => (
                                <div onClick={() => handleDelete(row, "actors")} style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                                    <img className="p-2 bg-cyan-400" style={{ position: 'relative', marginLeft: '10px' }} src={getObjectById(row, actors)?.imgUrl} alt="" class="w-12 h-12 rounded-full" />
                                    <MdDelete className='ms-2 absolute top-0 left-0 text-red-500 -translate-x-1 -translate-y-1 bg-white rounded-full ' />
                                </div>
                            ))}
                        </div>
                        <div className='mt-2'>
                            <div onClick={() => handleChoose("characters")} className='flex  items-center mt-3'>
                                <h3>Character</h3>
                                < FaUserNurse className='ms-2' />
                            </div>
                            {movie.listCharacter.map((row) => (
                                <div onClick={() => handleDelete(row, "characters")} style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                                    <img className="p-2 bg-cyan-400" style={{ position: 'relative', marginLeft: '10px' }} src={getObjectById(row, characters)?.imgUrl} alt="" class="w-12 h-12 rounded-full" />
                                    <MdDelete className='ms-2 absolute top-0 left-0 text-red-500 -translate-x-1 -translate-y-1 bg-white rounded-full ' />
                                </div>
                            ))}
                        </div>
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={handleImageChange}

                            />
                            <IconButton color="primary" component="span">
                                <IoMdPhotos />
                            </IconButton>
                        </label>
                        <Avatar
                            src={movie?.imgUrl}
                            alt="Actor Image"
                            sx={{ width: 150, height: 150, margin: '10px auto' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Yes</Button>
            </DialogActions>
        </Dialog>

    );
}

export default ModalMovie;