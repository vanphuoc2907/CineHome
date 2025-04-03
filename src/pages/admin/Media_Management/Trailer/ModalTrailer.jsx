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
                        movies.find((trailer) => trailer.id === movies.idMovie) || null // Hiển thị giá trị đã chọn
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
        <TextField
          margin="dense"
          label="TrailerURL"
          type="text"
          fullWidth
          multiline
          name="trailerURL"
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