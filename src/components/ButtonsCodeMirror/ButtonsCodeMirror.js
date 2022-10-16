import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Input,
} from "@material-ui/core";

import {
  Gavel,
  Save,
  Clear,
  FolderOpen,
  CloudUpload,
} from "@material-ui/icons";

import { Alert, AlertTitle } from "@material-ui/lab";

import { useCookieState } from "ahooks";
import axios from "axios";

export default function ButtonsCodeMirror({
  input,
  setInput,
  worker,
  setIsSelected,
  setSelectedFile,
  setCheked,
  setOutputWeb,
}) {
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function spim_load() {
    if (input.trim().length > 0) {
      import("../../actions/spim")
        .then(({ clearRegs, assemble }) => {
          clearRegs(worker);
          assemble(worker, input);
          setCheked([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOutputWeb("El programa está vacio, prueba con otro");
    }
  }


  const changeHandler = (event) => {
    if (event.target.files[0] == null) {
      return;
    }
    var file = event.target.files[0];
    if (file == null || file.length === 0) {
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>No</strong> has seleccionado un archivo
      </Alert>;
    }
 else {
      setSelectedFile(file);
      var fileReader = new FileReader();
      var textFromFileLoaded = "";

      fileReader.onload = function (fileLoadedEvent) {
        textFromFileLoaded = fileLoadedEvent.target.result;
        setInput(textFromFileLoaded);
      };
      fileReader.readAsText(file);
      setIsSelected(true);
    }
  };

  function handleSaveButton() {
    const element = document.createElement("a");
    const file = new Blob([input], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.s";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  const handleTextField = ({ target: { value } }) => {
    setNameFileServer(value);
    setError(!/[a-zA-Z0-9]$/.test(value));
  };

  async function handleUploadToServer(e) {
    setSucess("");
    setError("");
    e.preventDefault();
    let error;
    axios
      .get(`http://localhost:8080/api/files/files`, {
        params: {
          authToken: authToken,
        },
      })
      .then((data) => {
        let auxNames = [];

        for (let i = 0; i < data.length; i++) {
          auxNames[i] = data.data[i];
        }
        if (data.length === 0) {
          error = false;
        } else {
          if (auxNames.indexOf(`${nameFileServer}.s`)) {
            error = true;
          } else {
            error = false;
          }
        }
      });
    if (error) {
      setError("Ya existe un programa con ese nombre en el servidor");
    } else {
      const file = new File([input], `${nameFileServer}.s`, {
        type: "text/plain",
      });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("authToken", authToken);
      try {
         await axios
          .post(
            `http://localhost:8080/api/files/file`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            authToken
          )
          .then((data) => {
            setSucess("Se ha subido el programa correctamente");
          });
      } catch (err) {
        setError("Ya existe un archivo con ese nombre");
      }
    }
  }

  function cleanCodemirror() {
    setInput("");
  }
  const [authToken] = useCookieState("authToken");
  const [nameFileServer, setNameFileServer] = useState("");
  const [error, setError] = useState("");

  return (
    <Toolbar variant="dense">
      <ButtonGroup>
        <Button
          style={{ backgroundColor: "white" }}
          size="small"
          variant="outlined"
          onClick={spim_load}
          startIcon={<Gavel />}
        >
          ENSAMBLAR
        </Button>
        <Button
          style={{ backgroundColor: "white" }}
          size="small"
          variant="outlined"
          startIcon={<Save />}
          onClick={handleSaveButton}
        >
          Guardar
        </Button>
        <Button
          style={{ backgroundColor: "white" }}
          size="small"
          variant="outlined"
          startIcon={<Clear />}
          onClick={cleanCodemirror}
        >
          LIMPIAR
        </Button>
        <Button
          size="small"
          style={{ backgroundColor: "white" }}
          variant="outlined"
          component="label"
          startIcon={<FolderOpen />}
        >
          Abrir
          <input type="file" accept=".s" hidden onChange={changeHandler} />
        </Button>
        {authToken ? (
          <Button
            size="small"
            style={{ backgroundColor: "white" }}
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            onClick={handleClickOpen}
          >
            Subir
          </Button>
        ) : null}
      </ButtonGroup>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Subir al servidor
        </DialogTitle>
        <DialogContent dividers>
          {error ? <Alert severity="error">{error}</Alert> : null}
          {sucess ? <Alert severity="success">{sucess}</Alert> : null}
          <Input
            error={error}
            fullWidth
            helperText={error}
            value={nameFileServer}
            id="standard-adornment-weight"
            onChange={handleTextField}
            endAdornment={<InputAdornment position="end">.s</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button autoFocus onClick={handleUploadToServer} color="primary">
            Subir
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}
