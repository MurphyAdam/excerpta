import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import useWindowDimensions from '../../hooks/useWindowDimensions';

const TabContainer = (props) => {
  const { snippet, tab, index, editorPreferences, 
    updateSnippet, saveSnippet, createSnippetStateAction, deleteSnippetStateAction } = props;
  const { height, width } = useWindowDimensions();
  const { openCreateNew, setOpenCreateNew } = createSnippetStateAction;
  const { openDelete, setOpenDelete } = deleteSnippetStateAction;


  // whats the 10% of window.innerWidth ?
  // solution: 10 / 100 * window.innerWidth

  const editorDimensions = {
    width: (83/100) * width,
    height: (70/100) * height,
  }

  // commands is array of key bindings.
  const commands = [
    {
      //name for the key binding.
      name: 'Save snippet locally', 
      //key combination used for the command.
      bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, 
      //function to execute when keys are pressed.
      exec: () => saveSnippet({id: snippet.id ,state: ''})
    },
    {
      name: 'Save snippet to server', 
      bindKey: {win: 'Ctrl-Alt-s', mac: 'Command-Alt-s'}, 
      exec: () => saveSnippet({id: snippet.id ,state: '[saving...]'}, true) 
    },
    {
      name: 'New snippet', 
      bindKey: {win: 'Ctrl-Alt-n', mac: 'Command-Alt-n'}, 
      exec: () => setOpenCreateNew(!openCreateNew) 
    },
    {
      name: 'Delete snippet', 
      bindKey: {win: 'Ctrl-Alt-d', mac: 'Command-Alt-d'}, 
      exec: () => setOpenDelete(!openDelete) 
    }
  ];

  return (
    <React.Fragment>
      {tab === index && (
        <AceEditor
          mode={snippet.language}
          fontSize={editorPreferences.font}
          width={`${Number(editorDimensions.width).toString()}px`}
          height={`${Number(editorDimensions.height).toString()}px`}
          value={snippet.code}
          theme={editorPreferences.theme}
          onChange={code => updateSnippet({code, id: snippet.id, state: '*'})}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
          commands={commands}
        />
        )}
    </React.Fragment>
  )
}

export default TabContainer;