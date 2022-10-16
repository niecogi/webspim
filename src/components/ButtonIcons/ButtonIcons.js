import React, { useEffect } from "react";

import { Button, Toolbar, ButtonGroup } from "@material-ui/core";

import {
  PlayArrow,
  Help,
  FormatListNumberedRtl,
  SkipNext,
  Cached,
  Replay,
} from "@material-ui/icons";

import {
  reload,
} from "../../actions/spim";

import RunDialog from "../../components/RunDialog/RunDialog";
import HelpDialog from "../../components/HelpDialog/HelpDialog";

import "./ButtonIcons.css";

export default function ButtonIcons({
  worker,
  dir,
  setDir,
  input,
  handleRegisterType,
  sync,
  checked,
  setCheked,
  checkedCB,
  isRunning,
  setIsRunning,
}) {
  const [open, setOpen] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);
  const [error, setError] = React.useState("");
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
  const handleCloseAccept = () => {
    setOpen(false);
    import("../../actions/spim")
      .then(({ runSpim }) => {
        // Use runSpim

        runSpim(worker, dir);
        setIsRunning(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStepButton = (worker) => {
    import("../../actions/spim")
      .then(({ step }) => {
        // Use step
        step(worker, 1);
        sync();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContinueButton = (worker) => {
    import("../../actions/spim")
      .then(({ continueRun }) => {
        // Use runSpim
        continueRun(worker);
        if (checkedCB) {
          worker.postMessage(["print_all_regs hex"]);
        } else {
          worker.postMessage(["print_all_regs dec"]);
        }

        worker.postMessage(["print_data"]);
        worker.postMessage(["print_text"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextField = ({ target: { value } }) => {
    // ^ -> empieza, $ -> acaba
    setDir(value);
    setError(!/^0x[0-9]{8}$/.test(value));
  };
  const [runButton, setRunButton] = React.useState(
    <Button
      style={{ backgroundColor: "white" }}
      size="small"
      variant="outlined"
      startIcon={<PlayArrow />}
      onClick={() => {
        handleClickOpen();
      }}
    >
      EJECUTAR
    </Button>
  );

  useEffect(() => {
    if (isRunning) {
      setRunButton(
        <Button
          size="small"
          variant="outlined"
          startIcon={<Cached />}
          disabled={true}
          style={{ backgroundColor: "#e57373" }}
        >
          EJECUTANDO
        </Button>
      );
    } else {
      setRunButton(
        <Button
          style={{ backgroundColor: "white" }}
          size="small"
          variant="outlined"
          startIcon={<PlayArrow />}
          onClick={() => {
            handleClickOpen();
          }}
        >
          EJECUTAR
        </Button>
      );
    }
  }, [isRunning]);

  return (
    <div>
      <Toolbar variant="dense" flexDirection="row-reverse">
        <ButtonGroup>
          {runButton}

          <RunDialog
            dir={dir}
            error={error}
            handleClose={handleClose}
            handleTextField={handleTextField}
            handleCloseAccept={handleCloseAccept}
            open={open}
          />

          <Button
            size="small"
            style={{ backgroundColor: "white" }}
            variant="outlined"
            startIcon={<Replay />}
            onClick={() => {reload(worker, input); setCheked([]);}}
          >
            RECARGAR
          </Button>
          <Button
            size="small"
            style={{ backgroundColor: "white" }}
            variant="outlined"
            startIcon={<FormatListNumberedRtl />}
            onClick={() => {
              handleStepButton(worker);
            }}
          >
            PASO
          </Button>

          <Button
            style={{ backgroundColor: "white" }}
            size="small"
            variant="outlined"
            startIcon={<SkipNext />}
            onClick={() => {
              handleContinueButton(worker);
            }}
          >
            Continuar
          </Button>
          <Button
            size="small"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            startIcon={<Help />}
            onClick={() => {
              handleClickOpenHelp();
            }}
          >
            AYUDA
          </Button>
          <HelpDialog
            openHelp={openHelp}
            handleCloseHelp = {handleCloseHelp}

          ></HelpDialog>
        </ButtonGroup>
      </Toolbar>
    </div>
  );
}
