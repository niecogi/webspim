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

export default function StepDialog({
    handleClose,
    handleCloseAccept,
    open,
    numberSteps,
    handleTextFieldSteps
}) {

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">
      Número de pasos{" "}
    </DialogTitle>
    <DialogContent>
    <TextField
          variant="outlined"
          id="standard-number"
          label="Number"
          type="number"
          onChange={handleTextFieldSteps}
          value={numberSteps}
          InputLabelProps={{
            shrink: true,
          }}
        />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button
        onClick={() => { handleCloseAccept()}}
        color="primary"
      >
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>

  );
}