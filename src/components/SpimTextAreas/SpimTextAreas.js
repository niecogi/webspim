import React, { Fragment, useEffect, useState }
  from "react";

import { Grid, TextareaAutosize, Tab, Tabs,Box,Typography}
  from "@material-ui/core";

import Console 
  from "../../components/Console/Console";

export default function SpimTextAreas({
    registers,
    setRegisters,
    registersHEX,
    setRegistersHEX,
    text,
    data,
    setData,
    outputWeb,
    checked,
    setCheked,
    worker
}) {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
    const [actualAddress, setActualAddress] = useState("");
    useEffect(() => {
        let PC = registers.substring(11, 19);
        console.log(PC);
        setActualAddress(PC);
      }, [registers]);
      

  const handleBreakpoints = (event) => {
    let address = event.target.id;
    const currentIndex = checked.indexOf(address);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(address);
      worker.postMessage(["breakpoint " + address]);
      
    } else {
      newChecked.splice(currentIndex, 1);
      worker.postMessage(["delete " + address]);
    }
    setCheked(newChecked);

    console.log(checked);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid item >
        <div style={{display : 'flex',justifyContent: 'space-between'}}>
        <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        size="small"
        dense
        style={{minHeight: 0, maxHeight: '40px',  marginTop: 0, marginBottom: 0, padding: 0, fontFamily: ['Roboto Mono', 'monospace'], fontSize: 13.333, weight: 10}} 
      >
        <Tab label="DEC" {...a11yProps(0)} />
        <Tab label="HEX" {...a11yProps(1)} />
      </Tabs>
        </div>
     
      <TabPanel value={value} index={0}>
      <TextareaAutosize
          item
          readOnly
          style={{
            width: "100%",
            resize: "vertical",
            fontFamily: ["Roboto Mono", "monospace"],
          }}
          rowsMax={10}
          aria-label="maximum height"
          value={registers}
          id="log"
          onChange={(event) => setRegisters(event.target.value)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TextareaAutosize
          item
          readOnly
          style={{
            width: "100%",
            resize: "vertical",
            fontFamily: ["Roboto Mono", "monospace"],
          }}
          rowsMax={10}
          aria-label="maximum height"
          value={registersHEX}
          id="log"
          onChange={(event) => setRegistersHEX(event.target.value)}
        />
      </TabPanel>
      </Grid>

      <Grid item>
        <Console
          item
          input={text}
          checked={checked}
          handleBreakpoints={handleBreakpoints}
          actualAddress={actualAddress}
        />
      </Grid>

      <Grid item>
        <TextareaAutosize
          item
          readOnly
          rowsMax={10}
          style={{
            width: "100%",
            resize: "vertical",
            fontFamily: ["Roboto Mono", "monospace"],
          }}
          value={data}
          aria-label="maximum height"
          onChange={(event) => setData(event.target.value)}
        />
      </Grid>

      <Grid item>
        <TextareaAutosize
          item
          readOnly
          style={{
            width: "100%",
            resize: "vertical",
            minHeight: "150",
            fontFamily: ["Roboto Mono", "monospace"],
          }}
          rowsMax={10}
          value={outputWeb}
          aria-label="maximum height"
          onChange={(event) => setData(event.target.value)}
        />
      </Grid>
    </Fragment>
  );
}
