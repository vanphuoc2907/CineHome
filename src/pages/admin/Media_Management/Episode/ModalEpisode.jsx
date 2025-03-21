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
function ModalEpisode({ handleClose, open, episode, setEpisode, validation, error}) {
  const showNotification = useNotification();
  const movies = useContext(ContextMovies); 
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEpisode({ ...episode, [name]: value });
  };

  const addEpisode = async ()  => {
    if(!validation()) {
      return ;
    }
    if(episode.id){
      await updateDocument("Episodes", episode);
      showNotification("Episodes updated successfully!", "info");
    }else{
      await addDocument("Episodes", episode);
      showNotification("Episodes added successfully!", "success");
    }
    handleClose();
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{episode.id ? "Edit episode" : "Add episode" }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="EpisodesNumber"
            type="text"
            fullWidth
            name="episodesNumber"
            value={episode.episodesNumber}
            onChange={handleInput}
            error={!!error.episodesNumber}
            helperText={error.episodesNumber}
          />
          <TextField
            margin="dense"
            label="EpisodeURL"
            type="text"
            fullWidth
            multiline
            name="episodeURL"
            rows={4}
            value={episode.episodeURL}
            onChange={handleInput}
            error={!!error.episodeURL}
            helperText={error.episodeURL}
          />
          <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="my-select-label">ID MOVIE</InputLabel>
          <Select
            labelId="my-select-label"
            label="Chọn giá trị"
            name='idMovie'
            value={episode.idMovie}
            onChange={handleInput}
            error={!!error.idMovie}
            helperText={error.idMovie}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addEpisode} variant="contained">
          {episode.id ? "Update" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default ModalEpisode;