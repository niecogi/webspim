import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import { Box } from "@material-ui/core";


import "./CustomCodeMirror.css";

export default function CustomCodeMirror({ value: input, setInput: setInput, nameSelectedFile: nameSelectedFile}){
 
    return(
        <Box ml={2}  mt = {5} style={{ maxWidth: "100%"}}>
        <CodeMirror
                id="CodeMirror"
                value={input}
                height={650}
                style={{ maxWidth: "100%",fontFamily: ["Roboto Mono", "monospace"] }}
                options={{
                  theme: "mdn-like",
                  keyMap: "sublime",
                  mode: "jsx",
                }}
                onChange={(event) => setInput(event.getValue())}
              />
        </Box>
    )

}