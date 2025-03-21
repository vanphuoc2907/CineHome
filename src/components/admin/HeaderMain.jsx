import { Button, TextField } from '@mui/material';
import React from 'react';
import { FaSearch } from "react-icons/fa";
function HeaderMain({title, name, handleOpen, handleSearch}) {
    return (
        <div className='flex max-md:flex-col justify-evenly md:items-end gap-3'>
             <h1 className='text-2xl font-bold'>{title}</h1>
             <div className='flex gap-3'>
               <TextField onChange={(e) => handleSearch(e.target.value)} fullWidth size='small' id="outlined-basic" label="Search" variant="outlined"  />
               <Button size='small' variant="contained"><FaSearch /></Button>
             </div>
             <Button onClick={handleOpen} variant="contained">{name}</Button>
        </div>
    );
}

export default HeaderMain;