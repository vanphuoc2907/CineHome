import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../context/NotificationProvider";
import { ContextMovies } from "../../../../context/MovieProvider";
function ModalEpisode({ handleClose, open, episode, setEpisode, validation, error }) {
  const showNotification = useNotification();
  const movies = useContext(ContextMovies);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEpisode({ ...episode, [name]: value });
  };

  const addEpisode = async () => {
    if (!validation()) {
      return;
    }
    if (episode.id) {
      await updateDocument("Episodes", episode);
      showNotification("Episodes updated successfully!", "info");
    } else {
      await addDocument("Episodes", episode);
      showNotification("Episodes added successfully!", "success");
    }
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{episode.id ? "Edit episode" : "Add episode"}</DialogTitle>
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
          name="episodeURL"
          value={episode.episodeURL}
          onChange={handleInput}
          error={!!error.episodeURL}
          helperText={error.episodeURL}
        />
        <FormControl sx={{ mt: 1 }} fullWidth>
          <Autocomplete
            className='mt-2'
            options={movies} // Danh sách các tác giả
            getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm hoặc chọn phim"
                error={!!error.idMovie}
                helperText={error.idMovie}
              />
            )}
            value={
              movies.find((episode) => episode.id === movies.idMovie) || null // Hiển thị giá trị đã chọn
            }
            onChange={(event, newValue) => {
              // Cập nhật giá trị khi người dùng chọn
              handleInput({
                target: { name: "idMovie", value: newValue ? newValue.id : "" },
              });
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
            noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addEpisode} variant="contained">
          {episode.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEpisode;