import React, { Fragment, useEffect, useState }
  from "react";

import clsx
  from 'clsx';

import { List, ListItem, ListItemText, Box, Checkbox }
  from "@material-ui/core";

import { makeStyles }
  from "@material-ui/core/styles";

import "./Console.css";

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 7,
    width: 10,
    height: 10,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ab003c',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#f50057',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 5,
      height: 10,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#ab003c',
    },
  },
});

export default function ConsoleB({
  input,
  checked,
  handleBreakpoints,
  actualAddress
}) {
 
  const [instructions,        setInstructions]        = useState([]);
  const [instructions1,    setInstructions1]          = useState([]);
  const [instructAddress,  setInstructAddress]        = useState([]);
  const [metadata,                setMetadata]        = useState([]);
  const classes = useStyles();
  var k = 0;

  useEffect(() => {
    let lines = input?.split("\n");
    let instruct = [];
    let instruct1 = [];
    let instAdd = [];

    setMetadata(lines.splice(lines.length-3));
    for(let i = 0; i < lines.length; i++){
      instAdd[i] = lines[i].substring(3,11);
      let a      = lines[i].split(";"); 
      for(let j = 0; j < a.length; j++){
        instruct[i]   = a[0]; 
        instruct1[i]  = a[1]; 
      }
    }
    setInstructions(instruct);
    setInstructions1(instruct1);
    setInstructAddress(instAdd);
  }, [input]);

  useEffect(() => {
   for(let i = 0; i < instructAddress.length; i++){

     if (instructAddress[i] === actualAddress) {
       k = i;
     }
   }

  }, [actualAddress]);

  return (
    
    <Fragment>
      <Box
        border={1}
        style={{ height: 150, overflow: "auto", maxWidth: "100%", resize: "vertical" }}
      >
        <List dense  disablePadding >
          {instructions.map((instruction, index) => {
            let address = instruction.match(/[0-9a-f]{8}/i)[0];
            let a = (address)=> {
              if(address  === actualAddress){
                return 'yellow';
              }
            }
              let f = (address)=> {
                if(address  === actualAddress){
                  return 'true';
                }else{
                  return 'false';
                }
               
            }
            return (
              <ListItem key= {instruction.match(/0x[0-9a-f]{8}/i)[0]} autoFocus = {f(address) }container dense style={{ paddingTop: 0, paddingBottom: 0, backgroundColor:a(address)}} >
                <Checkbox
                  className= {classes.root}
                  size="small"
                  checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                  icon={<span className={classes.icon} />}
                  id={instruction.match(/0x[0-9a-f]{8}/i)[0]}
                  edge="start"
                  checked={checked.indexOf(instruction.match(/0x[0-9a-f]{8}/i)[0]) !== -1 }
                  tabIndex={-1}
                  disableRipple
                  onChange={handleBreakpoints}
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                />
                <ListItemText  disableTypography primary={instruction} 
                  style={{marginTop: 0, marginBottom: 0,fontFamily: ['Roboto Mono', 'monospace'], fontSize: 13.333}} />
                  <div>
                  <ListItemText  disableTypography secondary={instructions1[index]} 
                  style={{color: 'grey',marginTop: 0, //marginLeft: 'auto', 
                   marginBottom: 0,fontFamily: ['Roboto Mono', 'monospace'], fontSize: 13.333}} />
                
                  </div>
                
              </ListItem>
            );
          })}
        </List>
        <List dense className="root">
          {metadata.map((metadat) => {
            return (
              <ListItem dense container>
                <ListItemText dense primary={metadat} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Fragment>
  );
}
