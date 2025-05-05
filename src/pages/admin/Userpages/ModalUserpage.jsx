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
function ModalUserpage({ handleClose, open, userpage, setUserpage, validation, error }) {
     const showNotification = useNotification();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserpage({...userpage, [name] : value});
    };
   const addUserpage = async ()  => {
       if(!validation()) {
         return ;
       }
       if(userpage.id) {
        await updateDocument("Userpages", userpage);
         showNotification("Userpages updated successfully!", "info");
       }else {
        await addDocument("Userpages", userpage);
        showNotification("Userpages added successfully!", "success");
       }
        handleClose();
   }

    return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{userpage.id ? "Edit Userpage" : "Add Userpage" }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="text"
          fullWidth
          name="email"
          value={userpage.email}
          onChange={handleInput}
          error={!!error.email}
          helperText={error.email}
        />
        <TextField
          margin="dense"
          label="Password"
          type="text"
          fullWidth
          multiline
          name="password"
          value={userpage.password}
          onChange={handleInput}
          error={!!error.password}
          helperText={error.password}
        />
         <TextField
          margin="dense"
          label="Role"
          type="text"
          fullWidth
          multiline
          name="role"
          value={userpage.role}
          onChange={handleInput}
          error={!!error.role}
          helperText={error.role}
        />
         <TextField
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          multiline
          name="username"
          value={userpage.dusername}
          onChange={handleInput}
          error={!!error.username}
          helperText={error.username}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addUserpage} variant="contained">
           {userpage.id ? "Update" : "Save" }
        </Button>
      </DialogActions>
    </Dialog>
    );
}

export default ModalUserpage;