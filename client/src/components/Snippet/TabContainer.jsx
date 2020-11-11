import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const TabContainer = (props) => {
  const { snippet, tab, index, updateSnippet, saveSnippet } = props;

  const editorDimensions = {
    width: (window.screen.availWidth - (window.screen.availWidth / 5)),
    height: window.screen.availHeight - (window.screen.availHeight / 3),
  }

  return (
    <React.Fragment>
      {tab === index && (
        <AceEditor
          mode="javascript"
          fontSize={14}
          width={editorDimensions.width}
          height={editorDimensions.height}
          value={snippet.code}
          theme="monokai"
          onChange={code => updateSnippet({code, id: snippet.id, edited: true})}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
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