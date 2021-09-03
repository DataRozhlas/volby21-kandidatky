import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BocniMenu from "./BocniMenu.jsx";

const Modal = ({ open, setOpen, filtr, setFiltr, classes }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <IconButton
          onClick={handleClose}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <BocniMenu filtr={filtr} setFiltr={setFiltr} classes={classes} />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
