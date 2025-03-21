import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../context/NotificationProvider";
function ModalCharacter({ handleClose, open, character, setCharacter, validation, error}) {
  const showNotification = useNotification();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCharacter({...character, imgUrl : reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const addCharacter = async ()  => {
    if(!validation()) {
      return ;
    }
    if(character.id){
      await updateDocument("Characters", character);
      showNotification("Characters updated successfully!", "info");
    }else{
      await addDocument("Characters", character);
      showNotification("Characters added successfully!", "success");
    }
    handleClose();
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{character.id ? "Edit character" : "Add character" }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={character.name}
            onChange={handleInput}
            error={!!error.name}
            helperText={error.name}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            name="description"
            rows={4}
            value={character.description}
            onChange={handleInput}
            error={!!error.description}
            helperText={error.description}
          />
          <div className="flex justify-between">
          <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" style={{ marginTop: 10 }}>
            Choose Image
          </Button>
        </label>
        {/* Hiển thị ảnh đã chọn */}
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <img src={character.imgUrl} alt="Preview" style={{ width: 200, height: 150, borderRadius: 8 }} />
        </div>
          </div> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCharacter} variant="contained">
          {character.id ? "Update" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default ModalCharacter;