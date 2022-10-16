import React 
  from "react";

import { Button} 
  from "@material-ui/core";

  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField
  } from "@material-ui/core";

export default function RunDialog({
    dir,
    error,
    handleClose,
    handleTextField,
    handleCloseAccept,
    open
}) {
    

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">
      Parámetros de ejecución{" "}
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        value={dir}
        error={error}
        onChange={handleTextField}
        margin="dense"
        label="Dirección de inicio "
        defaultValue={dir}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button
        onClick={handleCloseAccept}
        color="primary"
        disabled={error}
      >
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>

  );
}