import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { addDocument, updateDocument } from "../../../services/firebaseService";
import { useNotification } from "../../../context/NotificationProvider";
function ModalCategory({ handleClose, open, category, setCategory, validation, error }) {
     const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategory({...category, [name] : value});
    };
   const addCategory = async ()  => {
       if(!validation()) {
         return ;
       }
       if(category.id) {
        await updateDocument("Categories", category);
         showNotification("Categories updated successfully!", "info");
       }else {
        await addDocument("Categories", category);
        showNotification("Categories added successfully!", "success");
       }
        handleClose();
   }

    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{category.id ? "Edit Category" : "Add Category" }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={category.name}
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
          value={category.description}
          onChange={handleInput}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addCategory} variant="contained">
           {category.id ? "Update" : "Save" }
        </Button>
      </DialogActions>
    </Dialog>
    );
}

export default ModalCategory;