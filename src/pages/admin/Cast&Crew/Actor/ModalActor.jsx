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
function ModalActor({ handleClose, open, actor, setActor, validation, error}) {
  const showNotification = useNotification();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setActor({ ...actor, [name]: value });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setActor({...actor, imgUrl : reader.result});
      };
      reader.readAsDataURL(file);
    }
  };
  const addActor = async ()  => {
    if(!validation()) {
      return ;
    }
    if(actor.id){
      await updateDocument("Actors", actor);
      showNotification("Actors updated successfully!", "info");
    }else{
      await addDocument("Actors", actor);
      showNotification("Actors added successfully!", "success");
    }
    handleClose();
    }
        
    return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>{actor.id ? "Edit actor" : "Add actor" }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={actor.name}
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
            value={actor.description}
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
                    <img src={actor.imgUrl} alt="Preview" style={{ width: 200, height: 150, borderRadius: 8 }} />
                  </div>
                    </div> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addActor} variant="contained">
          {actor.id ? "Update" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default ModalActor;