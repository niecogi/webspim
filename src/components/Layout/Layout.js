import React, { useEffect, useState } from "react";

import { Grid, TextField, Box} from "@material-ui/core";

import CustomCodeMirror from "../CustomCodeMirror/CustomCodeMirror";
import ButtonsCodeMirror from "../ButtonsCodeMirror/ButtonsCodeMirror";
import Header from "../Header/Header";
import ButtonIcons from "../ButtonIcons/ButtonIcons";
import ErrorDialog from "../ErrorDialog/ErrorDialog";
import { DEFAULT_PROGRAM } from "../../static/program/strings";
import SpimTextAreas from "../SpimTextAreas/SpimTextAreas";

import "codemirror/keymap/sublime";
import "codemirror/theme/mdn-like.css";
import "./Layout.css";

let spim_command = false;

export default function Layout() {
  const [worker, ] = useState(new Worker("worker.js"));
  const [input, setInput] = useState(DEFAULT_PROGRAM);
  const [data, setData] = useState("");
  const [err, setErr] = useState("");
  //const [, setCmd] = useState("");
  //const [command, setCommand] = useState("");
  const [registersDEC, setRegistersDEC] = useState("");
  const [registersHEX, setRegistersHEX] = useState("");
  const [text, setText] = useState("");
  const [outputWeb, setOutputWeb] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkedCB, setChekedCB] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [, setSelectedFile] = useState();
  const [nameSelectedFile,] = React.useState("example.s");
  const [dir, setDir] = React.useState("0x00400000");
  const [isRunning,setIsRunning] = React.useState(false);


  const handleDialogErrorClose = () => {
    setDialogOpen(false);
  };

  const set = {
    'load "dummy.s"': () => {
      sync();
    },
    step: ({ address, output }) => {
      sync();
    },
    "print_all_regs dec": setRegistersDEC,
    "print_all_regs hex": setRegistersHEX,
    continue: () => {
      sync();
    },
    run: ({ address, output }) => {
      sync();
      setOutputWeb("El programa se ha ejecutado correctamente");
      setIsRunning(false);
      
    },
    breakpoint: ({ address, output }) => {
      sync();
    },
    delete: ({ address, output }) => {
      sync();
    },
    print_data: setData,
    print_text: (text) => {
      setText(text);
    },
    reinitialize: () => {
    },
    help : () => {},
  };
  //cuando renderice, se "ejecutará " 1 vez el useeffect []
  useEffect(() => {
    worker.onmessage = function (msg) {
      let cmd = msg.data[0];
      let output = msg.data[1];
      let error = msg.data[2];

      if (error !== "" && !/Attempt/.test(error)) {
        setErr(error);
        setDialogOpen(true);
      }

      //versión prueba funcionamiento de los comandos
      if (spim_command === true) {
        spim_command = false;
        setOutputWeb(`${output}`);
      } else {
        if (cmd === 'load "dummy.s"') {
          if (error === "") {
            setOutputWeb("El programa se ha ensamblado correctamente");
          } else {
            setOutputWeb(
              `\nEl programa no se ha ensamblado correctamente.\n Error:\n${msg.data[2]}`
            );
          }
        }

        if (cmd.startsWith("run")) {
          let address = cmd.split(" ")[1];
          cmd = "run";
          output = { address, output };
        }

        if (cmd.startsWith("breakpoint")) {
          let address = cmd.split(" ")[1];
          cmd = "breakpoint";
          output = { address, output };
        }
        if (cmd.startsWith("delete")) {
          let address = cmd.split(" ")[1];
          cmd = "delete";
          output = { address, output };
        }
        if (cmd.startsWith("step")) {
          let address = cmd.split(" ")[1];
          cmd = "delete";
          output = { address, output };
        }
        set[cmd](output);
      }
    };

    sync();
  }, []);

  function sync() {
    worker.postMessage(["print_all_regs hex"]);
    worker.postMessage(["print_all_regs dec"]);
    worker.postMessage(["print_data"]);
    worker.postMessage(["print_text"]);
  }
  /*

  function spim_cmd(event) {
    if (event.keyCode === 13) {
      spim_command = true;
      worker.postMessage([command]);
      setCmd("");
    }
  }
  */

  const handleRegisterType = (e) => {
    let c = e.target.checked;
    setChekedCB(c);
    console.log(e.target.checked);

    if (checkedCB) {
      worker.postMessage(["print_all_regs hex"]);
    } else {
      worker.postMessage(["print_all_regs dec"]);
    }
  };
  const [checked, setCheked] = useState([]);
  const headerProps = {input,setDir,dir,setInput,setSelectedFile,setCheked,checked,worker}
  return (
    <div className="App">
      <Header
        {...headerProps}
      />
      <Grid container>
        <Grid item md={6}>
          <ButtonIcons
            setCheked={setCheked}
            input={input}
            dir={dir}
            setDir={setDir}
            worker={worker}
            handleRegisterType={handleRegisterType}
            sync={sync}
            checked={checked}
            checkedCB={checkedCB}
            setIsRunning={setIsRunning}
            isRunning={isRunning}
           
          />
        </Grid>
        <Grid item md={6}>
          <ButtonsCodeMirror
            input={input}
            setInput={setInput}
            worker={worker}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            setSelectedFile={setSelectedFile}
            setCheked={setCheked}
            setOutputWeb={setOutputWeb}
          />
        </Grid>
      </Grid>
      <Box mx={2}>
        <Grid container direction="row">
          <Grid container direction={"column"} md={6} spacing={1}>
            <SpimTextAreas
              registers={registersDEC}
              setRegisters={setRegistersDEC}
              registersHEX={registersHEX}
              setRegistersHEX={setRegistersHEX}
              text={text}
              data={data}
              setData={setData}
              outputWeb={outputWeb}
              checked={checked}
              setCheked={setCheked}
              worker={worker}
            />
          </Grid>
          <Grid item md={6} style={{width: '100%'}}>
            <CustomCodeMirror
              value={input}
              setInput={setInput}
              nameSelectedFile={nameSelectedFile}
            />
          </Grid>
        </Grid>
      </Box>
      <ErrorDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleDialogErrorClose={handleDialogErrorClose}
        err={err}
      ></ErrorDialog>
      {/* <TextField
        label="spim command"
        id="cmd"
        value={command}
        onChange={(event) => setCommand(event.target.value)}
        onKeyUp={spim_cmd}
        InputLabelProps={{
          shrink: true,
        }}
      ></TextField>*/}

      
    </div>
  );
}
