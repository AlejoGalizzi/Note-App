import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';


const ConfirmationModal = ({open = null, handleConfirm = () => {}, setOpen = () => {}, setObject= () => {}}) => {

  const handleClose = () => {
    setObject(null)
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this note?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="warning" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ConfirmationModal;