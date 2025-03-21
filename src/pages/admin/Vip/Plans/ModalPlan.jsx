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
function ModalPlan({ handleClose, open, plan, setPlan, validation, error}) {
  const showNotification = useNotification();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  const addPlan = async ()  => {
    if(!validation()) {
      return ;
    }
    if(plan.id){
      await updateDocument("Plans", plan);
      showNotification("Plans updated successfully!", "info");
    }else{
      await addDocument("Plans", plan);
      showNotification("Plans added successfully!", "success");
    }
    handleClose();
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{plan.id ? "Edit plan" : "Add plan" }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Level"
            type="text"
            fullWidth
            name="level"
            value={plan.level}
            onChange={handleInput}
            error={!!error.level}
            helperText={error.level}
          />
         
          <TextField
            margin="dense"
            label="PricePerMonth"
            type="text"
            fullWidth
            name="pricePerMonth"
            value={plan.pricePerMonth}
            onChange={handleInput}
            error={!!error.pricePerMonth}
            helperText={error.pricePerMonth}
          />
           <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            multiline
            name="title"
            rows={4}
            value={plan.title}
            onChange={handleInput}
            error={!!error.title}
            helperText={error.title}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addPlan} variant="contained">
          {plan.id ? "Update" : "Save" }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default ModalPlan;