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
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import { useNotification } from "../../../../context/NotificationProvider";
import { ContextPlans } from "../../../../context/PlanProvider";
function ModalFeature({ handleClose, open, Feature, setFeature, validation, error }) {
  const showNotification = useNotification();
  const plans = useContext(ContextPlans);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFeature({ ...Feature, [name]: value });
  };

  const addFeature = async () => {
    if (!validation()) {
      return;
    }
    if (Feature.id) {
      await updateDocument("Features", Feature);
      showNotification("Features updated successfully!", "info");
    } else {
      await addDocument("Features", Feature);
      showNotification("Features added successfully!", "success");
    }
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{Feature.id ? "Edit feature" : "Add feature"}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="my-select-label">Plan ID</InputLabel>
          <Select
            labelId="my-select-label"
            label="Chọn giá trị"
            name='planId'
            value={Feature.planId}
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
          label="Text"
          type="text"
          fullWidth
          name="text"
          value={Feature.text}
          onChange={handleInput}
          error={!!error.text}
          helperText={error.text}
        />
        <FormControl
          margin="dense"
          fullWidth
          error={!!error.available}
        >
          <FormLabel>Available</FormLabel>
          <RadioGroup
            row // to make it inline, remove if you want vertical
            name="available"
            value={Feature.available}
            onChange={handleInput}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addFeature} variant="contained">
          {Feature.id ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalFeature;