import { Button, TextareaAutosize } from "@material-ui/core";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

export default function ErrorDialog({
  dialogOpen,
  setDialogOpen,
  handleDialogErrorClose,
  err,
}) {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogErrorClose}>
    
      <DialogContent>
      <Alert severity="error"> Un error ha ocurrido mientras se cargaba el archivo.</Alert>
        <DialogContentText id="alert-dialog-description">
          El mensaje obtenido es el siguiente:
        </DialogContentText>

        <TextareaAutosize
          readOnly
          aria-label="empty textarea"
          value={err}
          cols="60"
          aria-label="maximum height"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogErrorClose} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
