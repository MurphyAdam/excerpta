import React from 'react';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import useWindowDimensions from '../../hooks/useWindowDimensions';


const TabContainer = (props) => {
  const { snippet, tab, index, updateSnippet, saveSnippet } = props;
  const { height, width } = useWindowDimensions();

  // whats the 10% of window.innerWidth ?
  // solution: 10 / 100 * window.innerWidth

  const editorDimensions = {
    width: (83/100) * width,
    height: (70/100) * height,
  }

  return (
    <React.Fragment>
      {tab === index && (
        <AceEditor
          mode="javascript"
          fontSize={14}
          width={`${Number(editorDimensions.width).toString()}px`}
          height={`${Number(editorDimensions.height).toString()}px`}
          value={snippet.code}
          theme="monokai"
          onChange={code => updateSnippet({code, id: snippet.id, edited: true})}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
          commands={[{   // commands is array of key bindings.
            name: 'Save snippet', //name for the key binding.
            bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
            exec: () => saveSnippet(snippet.id)  //function to execute when keys are pressed.
          }]}
        />
        )}
    </React.Fragment>
  )
}

export default TabContainer;