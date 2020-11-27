import React from 'react';
import AceEditor from "react-ace";
import { languages, themes } from '../../constants';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import "ace-builds/src-noconflict/ext-language_tools";

import { config } from 'ace-builds';

// the technique we use below significantly reduces our build bundle size
// using any other way may cause unrelated modules to be part of the production build
// in my case over 430 files including their .maps, the technique below reduced that into
// 7 files including their .map, and in addition, it loads the required modules from a fast 
// CDN 

languages.forEach(mode => {
config.setModuleUrl(
   `ace/mode/${mode}`,
   `https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict/mode-${mode}.js`
);});

themes.forEach(theme => {
config.setModuleUrl(
   `ace/theme/${theme}`,
   `https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict/theme-${theme}.js`
);});

const TabContainer = (props) => {
  const { snippet, tab, index, editorPreferences, 
    updateSnippet, saveSnippet, createSnippetStateAction, 
    deleteSnippetStateAction, downloadSnippet } = props;
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
      name: 'Download snippet file', 
      bindKey: {win: 'Ctrl-Alt-d', mac: 'Command-Alt-d'}, 
      exec: () => downloadSnippet(snippet.id) 
    },
    {
      name: 'New snippet', 
      bindKey: {win: 'Ctrl-Alt-n', mac: 'Command-Alt-n'}, 
      exec: () => setOpenCreateNew(!openCreateNew) 
    },
    {
      name: 'Delete snippet', 
      bindKey: {win: 'Ctrl-Alt-e', mac: 'Command-Alt-e'}, 
      exec: () => setOpenDelete(!openDelete) 
    }
  ];

  return (
    <React.Fragment>
      {tab === index && (
        <AceEditor
          mode={editorPreferences.mode}
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