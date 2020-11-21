import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { getSnippets, updateSnippet, saveSnippet, 
  deleteSnippet, setCurrentSnippetMeta, closeSnippet } from '../redux/actions/snippets';
import { connect } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { AntTabs, AntTab } from '../components/Snippet/Tabs';
import TabContainer from '../components/Snippet/TabContainer';
import NewSnippet from '../components/Snippet/NewSnippet';

import Fade from '@material-ui/core/Fade';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { CircularLoader } from '../components/Common/Loaders';

import DialogWithCallback from '../components/Common/DialogWithCallback';
import { Link as RouterLink } from 'react-router-dom';
import ChangeTheme from '../components/Snippet/ChangeTheme';
import ChangeMode from '../components/Snippet/ChangeMode';
import { updateEditorPreferences } from '../redux/actions/ui';

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  divider: {
    marginTop: theme.spacing(0.7),
  },
  barElements: {
    marginRight: theme.spacing(2)
  }
}));

function SnippetManager (props){
  const { isAuthenticated, snippets, loadSnippets, updateSnippet, 
    saveSnippet, deleteSnippet, currentSnippetMeta, 
    setCurrentSnippetMeta, editorPreferences, 
    updateEditorPreferences, closeSnippet } = props;
  const classes = useStyles();

  // Tabs and snippets CRUD components actions
  const [openChangeMode, setOpenChangeMode] = useState(false);
  const [openChangeTheme, setOpenChangeTheme] = useState(false);
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleTabChange = (event, value) => setCurrentSnippetMeta({tabId: value});

  // File Menu Anchor, state and actions
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const fileMenuopen = Boolean(fileMenuAnchorEl);
  const handleFileMenuClick = (event) => setFileMenuAnchorEl(event.currentTarget);
  const handleFileMenuClose = () => setFileMenuAnchorEl(null);

  // Preferences Menu Anchor, state and actions
  const [preferencesMenuAnchorEl, setPreferencesMenuAnchorEl] = useState(null);
  const preferencesMenuopen = Boolean(preferencesMenuAnchorEl);
  const handlePreferencesMenuClick = (event) => setPreferencesMenuAnchorEl(event.currentTarget);
  const handlePreferencesMenuClose = () => setPreferencesMenuAnchorEl(null);

  // Preferences Menu Anchor, state and actions
  const [helpMenuAnchorEl, setHelpMenuAnchorEl] = useState(null);
  const helpMenuopen = Boolean(helpMenuAnchorEl);
  const handleHelpMenuClick = (event) => setHelpMenuAnchorEl(event.currentTarget);
  const handleHelpMenuClose = () => setHelpMenuAnchorEl(null);

  const adjustFontSize = sign => {
    if(sign === '+')
      updateEditorPreferences({font: editorPreferences.font + 1});
    else if(sign === '-') 
      updateEditorPreferences({font: editorPreferences.font - 1});
    return;
  }

  useEffect(
    () => {
      if (isAuthenticated &&
          !snippets.snippets.length && 
          !snippets.isLoading && 
          !snippets.isLoaded &&
          !snippets.isError) loadSnippets()
    }, 
    [isAuthenticated, snippets, loadSnippets]
  );

  return (
    <React.Fragment>
      <div className={classes.menuList}>
        <Typography
          aria-label="File"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleFileMenuClick}
          className={classes.barElements}
        >
          File
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={fileMenuAnchorEl}
          keepMounted
          open={fileMenuopen}
          onClose={handleFileMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '25ch',
            },
          }}
        >
          <MenuItem onClick={() => {setOpenCreateNew(!openCreateNew)}}>
            New
          </MenuItem>
          <MenuItem key="saveLocally" 
            onClick={() => saveSnippet({id: currentSnippetMeta.id ,state: ''}) }>
            Save to local
          </MenuItem>
          <MenuItem key="saveRemotely" 
            onClick={() => saveSnippet({id: currentSnippetMeta.id ,state: '[saving...]'}, true) }>
            Save to remote
          </MenuItem>
          <MenuItem key="closeSnippet" 
            onClick={() => closeSnippet({id: currentSnippetMeta.id , tabId: currentSnippetMeta.tabId , state: 'closed'}) }>
            Close
          </MenuItem>
          <MenuItem key="deleteSnippet" onClick={() => {setOpenDelete(!openDelete)}}>
            Delete
          </MenuItem>
        </Menu>
        <Typography
          aria-label="File"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handlePreferencesMenuClick}
          className={classes.barElements}
        >
          Preferences
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={preferencesMenuAnchorEl}
          keepMounted
          open={preferencesMenuopen}
          onClose={handlePreferencesMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '25ch',
            },
          }}
        >
          <MenuItem key="Change Theme"
            onClick={() => {setOpenChangeTheme(!openChangeTheme)}}>
            Theme ({editorPreferences.theme})
          </MenuItem>
          <MenuItem key="Change Language Mode" 
            onClick={() => {setOpenChangeMode(!openChangeMode)}}>
            Mode ({editorPreferences.mode})
          </MenuItem>
          <MenuItem key="saveRemotely">
            Font ({editorPreferences.font}) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <ZoomInIcon onClick={() => adjustFontSize('+') } />
            &nbsp;&nbsp;&nbsp;
            <ZoomOutIcon onClick={() => adjustFontSize('-') } />
          </MenuItem>
          <MenuItem>
            Close
          </MenuItem>
        </Menu>
        <Typography
          aria-label="File"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleHelpMenuClick}
          className={classes.barElements}
        >
          Help
        </Typography>
        <Menu
          id="long-menu"
          anchorEl={helpMenuAnchorEl}
          keepMounted
          open={helpMenuopen}
          onClose={handleHelpMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '25ch',
            },
          }}
        >
          <MenuItem key="saveLocally">
            Documentation
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/about"
            aria-label="About Snippets" >
            About Snippets
          </MenuItem>
        </Menu>
      </div>
      <Divider className={classes.divider} />
      <AntTabs
        value={currentSnippetMeta.tabId}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        {!!snippets.snippets.length &&
          snippets.snippets.map(snippet => {
            if(snippet.state !== 'closed') {
              return (
                <AntTab key={snippet.id}
                  onClick={() => setCurrentSnippetMeta({id: snippet.id, name: snippet.name, mode: snippet.language})}
                  label={`${snippet.name} ${snippet.state}`} >
                </AntTab>
                )
            }
            return null;
          }) 
        }
      </AntTabs>
      {!!snippets.snippets.length &&
        snippets.snippets.map((snippet, i) => {
          if(snippet.state !== 'closed') {
            return (
              <TabContainer key={snippet.id}
                snippet={snippet} 
                tab={currentSnippetMeta.tabId}
                index={i} 
                editorPreferences={editorPreferences}
                updateSnippet={updateSnippet} 
                saveSnippet={saveSnippet} 
                createSnippetStateAction={{openCreateNew, setOpenCreateNew}}
                deleteSnippetStateAction={{openDelete, setOpenDelete}} />
            )
          }
          return null;
        }) 
      }
      {openCreateNew &&
        <NewSnippet 
          open={openCreateNew}
          onOpen={() => {setOpenCreateNew(!openCreateNew)}}
          onClose={() => {setOpenCreateNew(false)}}
          setCurrentSnippetMeta={setCurrentSnippetMeta}
          handleFileMenuClose={handleFileMenuClose}
        />
      }
      {openChangeTheme &&
        <ChangeTheme 
          open={openChangeTheme}
          onOpen={() => {setOpenChangeTheme(!openChangeTheme)}}
          onClose={() => {setOpenChangeTheme(false)}}
          editorPreferencesStateAction={{editorPreferences, updateEditorPreferences}}
        />
      }
      {openChangeMode &&
        <ChangeMode 
          open={openChangeMode}
          onOpen={() => {setOpenChangeMode(!openChangeMode)}}
          onClose={() => {setOpenChangeMode(false)}}
          editorPreferencesStateAction={{editorPreferences, updateEditorPreferences}}
        />
      }
      {openDelete &&
        <DialogWithCallback 
          open={openDelete}
          onClose={() => {setOpenDelete(false)}}
          actionCallback={() => deleteSnippet({id: currentSnippetMeta.id , tabId: currentSnippetMeta.tabId})}
          title={`Delete file '${currentSnippetMeta.name}'?`}
          body={`Click delete to permanently delete '${currentSnippetMeta.name}'`}
        />
      }
      {snippets.isLoading &&
        <CircularLoader />
      }
    </React.Fragment>
  )
};

SnippetManager.propTypes = {
  loadSnippets: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    snippets: state.snippets,
    currentSnippetMeta: state.snippets.currentSnippetMeta,
    editorPreferences: state.ui.editor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: () => dispatch(getSnippets()),
    updateSnippet: data => dispatch(updateSnippet(data)),
    saveSnippet: (data, remote) => dispatch(saveSnippet(data, remote)),
    deleteSnippet: snippetMeta => dispatch(deleteSnippet(snippetMeta)),
    setCurrentSnippetMeta: meta => dispatch(setCurrentSnippetMeta(meta)),
    updateEditorPreferences: props => dispatch(updateEditorPreferences(props)),
    closeSnippet: snippetMeta => dispatch(closeSnippet(snippetMeta)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnippetManager);
