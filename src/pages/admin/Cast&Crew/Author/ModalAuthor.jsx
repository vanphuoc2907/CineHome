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
function ModalAuthor({ handleClose, open, author, setAuthor, validation, error }) {
     const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setAuthor({...author, [name] : value});
    };
   const addAuthor = async ()  => {
       if(!validation()) {
         return ;
       }
       if(author.id) {
        await updateDocument("Authors", author);
         showNotification("Authors updated successfully!", "info");
       }else {
        await addDocument("Authors", author);
        showNotification("Authors added successfully!", "success");
       }
        handleClose();
   }

    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{author.id ? "Edit author" : "Add author" }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          name="name"
          value={author.name}
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
          value={author.description}
          onChange={handleInput}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addAuthor} variant="contained">
           {author.id ? "Update" : "Save" }
        </Button>
      </DialogActions>
    </Dialog>
    );
}

export default ModalAuthor;