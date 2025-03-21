import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../context/NotificationProvider";
import { ContextMovies } from "../../../../context/MovieProvider";
function ModalTrailer({ handleClose, open, trailer, setTrailer, validation, error }) {
  const showNotification = useNotification();
  const movies = useContext(ContextMovies);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTrailer({ ...trailer, [name]: value });
  };

  const addTrailer = async () => {
    if (!validation()) {
      return;
    }
    if (trailer.id) {
      await updateDocument("Trailers", trailer);
      showNotification("Trailers updated successfully!", "info");
    } else {
      await addDocument("Trailers", trailer);
      showNotification("Trailers added successfully!", "success");
    }
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{trailer.id ? "Edit trailer" : "Add trailer"}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="my-select-label">MOVIE ID</InputLabel>
          <Select
            labelId="my-select-label"
            label="Chọn giá trị"
            name='movieId'
            value={trailer.movieId}
            onChange={handleInput}
            error={!!error.movieId}
            helperText={error.movieId}
          >
            {movies
              ?.slice() // Tạo bản sao để tránh thay đổi mảng gốc
              .sort((a, b) => a.lever - b.lever) // Sắp xếp tăng dần theo lever
              .map((row, index) => (
                <MenuItem key={index} value={row.id}>
                  {row.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="TrailerURL"
          type="text"
          fullWidth
          multiline
          name="trailerURL"
          rows={4}
          value={trailer.trailerURL}
          onChange={handleInput}
          error={!!error.trailerURL}
          helperText={error.trailerURL}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addTrailer} variant="contained">
          {trailer.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalTrailer;