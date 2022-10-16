import React, {useContext } from "react";

import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@material-ui/core";

import InfoTFG from "../../components/InfoTFG/InfoTFG";
import RunDialog from "../../components/RunDialog/RunDialog";
import BreakpointDialog from "../../components/BreakpointDialog/BreakpointDialog";
import StepDialog from "../../components/StepDialog/StepDialog";
import HelpDialog from "../../components/HelpDialog/HelpDialog";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  reload,
  continueRun,
} from "../../actions/spim";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
}));

export default function Header({
  input,
  setInput,
  setSelectedFile,
  worker,
  dir,
  setDir,
  setCheked,
  checked,
  sync
}) {
  const classes = useStyles();
  const [error, setError] = React.useState("");
  const [numberSteps,        setNumberSteps]        = React.useState("1");
  const [anchorFile, setAnchorFile] = React.useState(null);
  const [anchorSimulation, setAnchorSimulation] = React.useState(null);
  const [anchorHelp, setAnchorHelp] = React.useState(null);
  const [openRunDialog, setOpenRunDialog] = React.useState(false);
  const [openBreakpointDialog, setOpenBreakpointDialog] = React.useState(false);
  const [openStepDialog,  setOpenStepDialog]        = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenHelp = () => {
    setOpenHelp(true);
  };
  const handleCloseHelp = () => {
    setOpenHelp(false);
  };

  const handleClickOpenRunDialog = () => {
    setOpenRunDialog(true);
  };
  const handleClickOpenBreakpointDialog = () => {
    setOpenBreakpointDialog(true);
  };
  const handleClickOpenStepDialog = () => {
    setOpenStepDialog(true);
  };
  const handleCloseAcceptStepDialog = () => {
    setOpenStepDialog(false);
    worker.postMessage([`step ${numberSteps}`]);
  
    
  };
const handleCloseStepDialog = () => {
    setOpenStepDialog(false);
  };

  const handleTextFieldRunDir = ({ target: { value } }) => {
    // ^ -> empieza, $ -> acaba
    setDir(value);
    setError(!/^0x[0-9]{8}$/.test(value));
  };

  const handleTextFieldSteps = ({ target: { value } }) => {
    // ^ -> empieza, $ -> acaba
    setNumberSteps(value);
  };


  const handleCloseRunDialog = () => {
    setOpenRunDialog(false);
  };

  const handleCloseBreakpointDialog = () => {
    setOpenBreakpointDialog(false);
  };
  const handleCloseAcceptRunDialog = () => {
    setOpenRunDialog(false);
    import("../../actions/spim")
      .then(({ runSpim }) => {
        // Use runSpim
        runSpim(worker, dir);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickMenuFile = (event) => {
    setAnchorFile(event.currentTarget);
  };

  const handleCloseMenFile = () => {
    setAnchorFile(null);
  };
  const handleClickMenuSimulation = (event) => {
    setAnchorSimulation(event.currentTarget);
  };

  const handleCloseMenuSimulation = () => {
    setAnchorSimulation(null);
  };
  const handleClickMenuHelp = (event) => {
    setAnchorHelp(event.currentTarget);
  };

  const handleCloseMenuHelp = () => {
    setAnchorHelp(null);
  };
  const changeHandler = (event) => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept=".s"
    input.onchange = (e) => {
      let file = e.target.files[0];
      var fileReader = new FileReader();
      var textFromFileLoaded = "";
      setSelectedFile(file);
      fileReader.onload = function (fileLoadedEvent) {
        textFromFileLoaded = fileLoadedEvent.target.result;
        setInput(textFromFileLoaded);
      };
      fileReader.readAsText(file);
    };
    input.click();
  };
  function handleSaveButton() {
    const element = document.createElement("a");
    const file = new Blob([input], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.s";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
    <header className="App-header">
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Button
              variant="text"
              color="inherit"
              size="small"
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleClickMenuFile}
            >
              Archivo
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorFile}
              keepMounted
              open={Boolean(anchorFile)}
              onClose={handleCloseMenFile}
            >
              <StyledMenuItem onClick={ () =>{handleCloseMenFile(); changeHandler(); } }>
                <ListItemText primary="Abrir" />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Guardar archivo" onClick={ () =>{handleCloseMenFile(); handleSaveButton();} }/>
              </StyledMenuItem>
            </StyledMenu>

            <Button
              variant="text"
              color="inherit"
              size="small"
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleClickMenuSimulation}
            >
              Simulador
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorSimulation}
              keepMounted
              open={Boolean(anchorSimulation)}
              onClose={handleCloseMenuSimulation}
            >
              <StyledMenuItem>
                <ListItemText
                  primary="Recargar el programa"
                  onClick={() =>{ handleCloseMenuSimulation(); reload(worker, input);  setCheked([])} }
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText
                  primary="Ejecutar"
                  onClick={() => {
                    handleCloseMenuSimulation();
                    handleClickOpenRunDialog();
                  }}
                />
              </StyledMenuItem>
              <RunDialog
                dir={dir}
                error={error}
                handleClose={handleCloseRunDialog}
                handleTextField={handleTextFieldRunDir}
                handleCloseAccept={handleCloseAcceptRunDialog}
                open={openRunDialog}
              ></RunDialog>
              <StyledMenuItem>
                <ListItemText
                  primary="Continuar"
                  onClick={() => { handleCloseMenuSimulation(); continueRun(worker)}}
                />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText
                  primary="Pasos"
                  onClick={() => {
                    handleCloseMenuSimulation();
                    handleClickOpenStepDialog();
                  }}
                />
              </StyledMenuItem>
              <StepDialog
              handleClose={handleCloseStepDialog}
              handleCloseAccept={handleCloseAcceptStepDialog}
              open={openStepDialog}
              setOpenBreakpointDialog = {setOpenStepDialog}
              numberSteps={numberSteps}
              handleTextFieldSteps = {handleTextFieldSteps}
              ></StepDialog>
              <StyledMenuItem>
                <ListItemText
                  primary="Puntos de ruptura"
                  onClick={() => {
                    handleCloseMenuSimulation();
                    handleClickOpenBreakpointDialog();
                  }}
                />
              </StyledMenuItem>
              <BreakpointDialog
                dir={dir}
                worker = {worker}
                setCheked = {setCheked}
                checked={checked}
                error={error}
                handleClose={handleCloseBreakpointDialog}
                handleCloseAccept={handleCloseBreakpointDialog}
                open={openBreakpointDialog}
                setOpenBreakpointDialog = {setOpenBreakpointDialog}
              ></BreakpointDialog>
            </StyledMenu>
            <Button
              variant="text"
              color="inherit"
              size="small"
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={handleClickMenuHelp}
            >
              Ayuda
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorHelp}
              keepMounted
              open={Boolean(anchorHelp)}
              onClose={handleCloseMenuHelp}
            >
              <StyledMenuItem>
                <ListItemText primary="Temas de ayuda" 
                onClick={() => {
                  handleCloseMenuHelp();
                  handleClickOpenHelp();
                }}/>
                

              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemText primary="Acerca de SpimUPV" 
                 onClick={() => {
                  handleCloseMenuHelp();
                  handleClickOpen();
                }}/>
              </StyledMenuItem>
                  

                  <HelpDialog
                  openHelp ={openHelp}
                  handleCloseHelp = {handleCloseHelp}
                  >
                    
                     </HelpDialog>
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
            Tutor/a: Martí Campoy, Antonio
          </Typography>
          <Typography gutterBottom variant="body2">
            Cotutor/a 1: Petit Martí, Salvador Vicente
          </Typography>
          <Typography gutterBottom variant="body2">
            Alumno/a: Codoñer Gil, Nieves
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
            </StyledMenu>
            <InfoTFG setInput = {setInput}/>
            
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
}
