import React from "react";

import { Button } from "@material-ui/core";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  PlayArrow,
  FormatListNumberedRtl,
  SkipNext,
  Replay,
  Save,
  Clear,
  Gavel,
  FolderOpen,
  Info,
  ExitToApp,
  AccountCircle,
  FolderShared,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "200",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function HelpDialog({ handleCloseHelp, openHelp }) {
  const classes = useStyles();

  return (
    <Dialog open={openHelp} onClose={handleCloseHelp}>
      <div className={classes.root}>
        <DialogTitle>Funcionalidades de la aplicación</DialogTitle>
        <DialogContent>
          <Box style={{ height: 450, overflow: "auto", maxWidth: "100%" }}>
            <List className={classes.root}>
              <ListItem>Simulador</ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <Gavel />
                </IconButton>

                <ListItemText
                  primary="Ensamblar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {
                        " Se ensambla el programa del editor de código en el simulador"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <PlayArrow />
                </IconButton>
                <ListItemText
                  primary="Ejecutar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {
                        " Se ejecuta el programa (que ha sido previamente ensamblado) en el simulador"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <Replay />
                </IconButton>
                <ListItemText
                  primary="Recargar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {
                        " Se vuelve a ensamblar el programa que está cargado en el editor de código"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <SkipNext />
                </IconButton>
                <ListItemText
                  primary="Continuar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se continua con la ejecución del programa"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <FormatListNumberedRtl />
                </IconButton>
                <ListItemText
                  primary="Paso"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se ejecuta una instrucción"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <Info />
                </IconButton>
                <ListItemText
                  primary="Información de SpimUPV"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se informa sobre la creación de SpimUPV"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem>Editor de código</ListItem>
              <Divider />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <Save />
                </IconButton>
                <ListItemText
                  primary="Guardar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se guarda el contenido del editor de código en disco"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <Clear />
                </IconButton>
                <ListItemText
                  primary="Limpiar"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {
                        "Se limpia por completo el contenido del editor de código"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <FolderOpen />
                </IconButton>
                <ListItemText
                  primary="Abrir"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {
                        "Se abre un programa de disco del usuario en el editor de código"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>

              <ListItem>Usuario</ListItem>

              <Divider />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <ExitToApp />
                </IconButton>
                <ListItemText
                  primary="Cerrar sesión"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {"Se cierra la sesión del usuario logueado"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <AccountCircle />
                </IconButton>
                <ListItemText
                  primary="Información de usuario"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se ofrece información del usuario logueado"}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <ListItem>Servidor</ListItem>
              <Divider />

              <ListItem alignItems="flex-start">
                <IconButton disabled>
                  {" "}
                  <FolderShared />
                </IconButton>
                <ListItemText
                  primary="Gestión de ficheros del usuario"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      ></Typography>
                      {" Se ofrece información del usuario logueado"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHelp} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
