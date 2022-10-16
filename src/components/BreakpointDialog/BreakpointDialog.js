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

export default function BreakpointDialog({
    handleClose,
    open,
    setOpenBreakpointDialog,
    worker,
    setCheked,
    checked
}) {

    const handleCloseAcceptRunDialog = () => {
        setOpenBreakpointDialog(false);
        import("../../actions/spim")
          .then(({ setBreakpoint }) => {
            // Use runSpim
            const currentIndex = checked.indexOf(dirBreakpoint);
            const newChecked = [...checked];

            if (currentIndex === -1) {
            newChecked.push(dirBreakpoint);
            setBreakpoint(worker, dirBreakpoint);
            
            } else {
            // problema, si que está.
            }
            setCheked(newChecked);

          })
          .catch((err) => {

          });
      };

    const handleTextFieldBreakpoint = ({ target: { value } }) => {
        // ^ -> empieza, $ -> acaba
        setDirBreakpoint(value);
        //setError(!/^0x[0-9]{8}$/.test(value));
      };
    
    const [dirBreakpoint, setDirBreakpoint] = React.useState("0x00400000");

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">
      Establecer breakpoint{" "}
    </DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        value={dirBreakpoint}
        onChange={handleTextFieldBreakpoint}
        margin="dense"
        label="Punto de ruptura en:"
        defaultValue={dirBreakpoint}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancelar
      </Button>
      <Button
        onClick={handleCloseAcceptRunDialog}
        color="primary"
      >
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>

  );
}