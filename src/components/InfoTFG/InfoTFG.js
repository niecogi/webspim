import React, { Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Info} from "@material-ui/icons";


export default function InfoTFG({setInput}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
    dialogTitle: {
      paddingRight: "0px",
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    red: {
      backgroundColor:"#f6685e",
      '&:hover': {
        background: "#f44336",
     },
    }
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 
  return (
    <Fragment>
      <Typography variant="h6" className={classes.title}></Typography>

      <IconButton color="inherit" size="small" onClick={handleClickOpen}>
        <Info />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        onRequestClose={handleClose}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Acerca de SpimUPV
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
            Trabajo de fin de grado
          </Typography>
          <Typography gutterBottom variant="body1">
            Interfaz web para un simulador del MIPS R2000
          </Typography>
          <Typography gutterBottom variant="body2">
            Tutores: Martí Campoy, Antonio
          </Typography>
          <Typography gutterBottom variant="body2">
             Petit Martí, Salvador Vicente
          </Typography>
          <Typography gutterBottom variant="body2">
            Alumna: Codoñer Gil, Nieves
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
