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
import { ContextPlans } from "../../../../context/PlanProvider";
function ModalPackage({ handleClose, open, Package, setPackage, validation, error }) {
  const plans = useContext(ContextPlans);
  const showNotification = useNotification();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPackage({ ...Package, [name]: value });
  };

  const addPackage = async () => {
    if (!validation()) {
      return;
    }
    if (Package.id) {
      await updateDocument("Packages", Package);
      showNotification("Packages updated successfully!", "info");
    } else {
      await addDocument("Packages", Package);
      showNotification("Packages added successfully!", "success");
    }
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{Package.id ? "Edit package" : "Add package"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Discount"
          type="text"
          fullWidth
          name="discount"
          value={Package.discount}
          onChange={handleInput}
          error={!!error.discount}
          helperText={error.discount}
        />

        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="my-select-label">Plan ID</InputLabel>
          <Select
            labelId="my-select-label"
            label="Chọn giá trị"
            name='planId'
            value={Package.planId}
            onChange={handleInput}
            error={!!error.planId}
            helperText={error.planId}
          >
            {plans
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
          label="Time"
          type="text"
          fullWidth
          multiline
          name="time"
          value={Package.time}
          onChange={handleInput}
          error={!!error.time}
          helperText={error.time}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addPackage} variant="contained">
          {Package.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalPackage;