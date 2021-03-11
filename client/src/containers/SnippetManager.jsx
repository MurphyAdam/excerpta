import React, { useState, useEffect, lazy } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import {
  getSnippets, updateSnippet, saveSnippet,
  deleteSnippet, setCurrentSnippetMeta, closeSnippet
} from '../redux/actions/snippets';
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
import { updateEditorPreferences } from '../redux/actions/ui';
import FileDownloader from "js-file-download";

import { error as notificationError } from 'react-notification-system-redux';
import { notificationTemplate } from '../redux/methods';

import Pagination from '@material-ui/lab/Pagination';

const ChangeTheme = lazy(() => import('../components/Snippet/ChangeTheme'));
const ChangeMode = lazy(() => import('../components/Snippet/ChangeMode'));

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
  },
  pagination: {
    padding: theme.spacing(1.2),
  }
}));

function SnippetManager(props) {
  const { isAuthenticated, snippets, loadSnippets, updateSnippet,
    saveSnippet, deleteSnippet, currentSnippetMeta,
    setCurrentSnippetMeta, editorPreferences,
    updateEditorPreferences, closeSnippet, addNotification } = props;
  const classes = useStyles();

  // Tabs and snippets CRUD components actions
  const [openChangeMode, setOpenChangeMode] = useState(false);
  const [openChangeTheme, setOpenChangeTheme] = useState(false);
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleTabChange = (event, value) => setCurrentSnippetMeta({ tabId: value });

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
    if (sign === '+')
      updateEditorPreferences({ font: editorPreferences.font + 1 });
    else if (sign === '-')
      updateEditorPreferences({ font: editorPreferences.font - 1 });
    return;
  }

  const downloadSnippet = id => {
    const snippet = snippets.snippets.find(snippet => snippet.id === id);
    if (snippet) {
      FileDownloader(snippet.code, snippet.name)
    }
    else {
      addNotification({
        ...notificationTemplate,
        'title': 'Could not download snippet.'
      }, notificationError);
    }
  }

  const handlePaginationChange = v => {
    // prevent user from reloading the same pagination
    if (snippets.current !== v || !snippets.isLoading)
      loadSnippets(v);
    // each pagination object has a maximum of 10 objects, but may contain less.
    // each object is mapped to a tabId: 0, 1, 2, n.
    // when the user requests the next pagination, it loads and sets 
    // some fields of currentSnippetMeta object, but not tabId, so for example
    // if tabId was 7 before user loads new pagination, it stays so, and the new 
    // pagination may contain less that 7 objects, and the tabId would be incorret 
    // and out of focus. so after each pagination change, we also set the tabId to 0
    // and it fixes all such issues.
    setCurrentSnippetMeta({ tabId: 0 });
  }

  useEffect(
    () => {
      if (isAuthenticated &&
        !snippets.snippets.length &&
        !snippets.isLoading &&
        !snippets.isLoaded &&
        !snippets.isError) loadSnippets(1)
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
              width: 'fit-content',
            },
          }}
        >
          <MenuItem onClick={() => { setOpenCreateNew(!openCreateNew) }}>
            New File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Alt+N
          </MenuItem>
          <MenuItem key="saveLocally"
            onClick={() => saveSnippet({ id: currentSnippetMeta.id, state: '' })}>
            Save to local&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+S
          </MenuItem>
          <MenuItem key="saveRemotely"
            onClick={() => saveSnippet({ id: currentSnippetMeta.id, state: '[saving...]' }, true)}>
            Save to server&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Alt+S
          </MenuItem>
          <MenuItem key="downloadSnippet" onClick={() => downloadSnippet(currentSnippetMeta.id)}>
            Download File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Alt+D
          </MenuItem>
          <MenuItem key="closeSnippet"
            onClick={() => closeSnippet({ id: currentSnippetMeta.id, tabId: currentSnippetMeta.tabId, state: 'closed' })}>
            Close File
          </MenuItem>
          <MenuItem key="deleteSnippet" onClick={() => { setOpenDelete(!openDelete) }}>
            Delete File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Alt+E
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
            onClick={() => { setOpenChangeTheme(!openChangeTheme) }}>
            Theme ({editorPreferences.theme})
          </MenuItem>
          <MenuItem key="Change Language Mode"
            onClick={() => { setOpenChangeMode(!openChangeMode) }}>
            Mode ({editorPreferences.mode})
          </MenuItem>
          <MenuItem key="saveRemotely">
            Font ({editorPreferences.font}) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <ZoomInIcon onClick={() => adjustFontSize('+')} />
            &nbsp;&nbsp;&nbsp;
            <ZoomOutIcon onClick={() => adjustFontSize('-')} />
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
            if (snippet.state !== 'closed') {
              return (
                <AntTab key={snippet.id}
                  onClick={() => setCurrentSnippetMeta({ id: snippet.id, name: snippet.name, mode: snippet.language })}
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
          if (snippet.state !== 'closed') {
            return (
              <TabContainer key={snippet.id}
                snippet={snippet}
                tab={currentSnippetMeta.tabId}
                index={i}
                editorPreferences={editorPreferences}
                updateSnippet={updateSnippet}
                saveSnippet={saveSnippet}
                downloadSnippet={downloadSnippet}
                createSnippetStateAction={{ openCreateNew, setOpenCreateNew }}
                deleteSnippetStateAction={{ openDelete, setOpenDelete }}
              />
            )
          }
          return null;
        })
      }
      {snippets.isLoaded && snippets.totalPages > 1 &&
        <div className={classes.pagination}>
          <Pagination
            count={snippets.totalPages}
            page={snippets.current}
            variant="outlined"
            color="secondary"
            onChange={(event, value) => handlePaginationChange(value)}
            showFirstButton
            showLastButton
          />
        </div>
      }
      {openCreateNew &&
        <NewSnippet
          open={openCreateNew}
          onOpen={() => { setOpenCreateNew(!openCreateNew) }}
          onClose={() => { setOpenCreateNew(false) }}
          setCurrentSnippetMeta={setCurrentSnippetMeta}
          handleFileMenuClose={handleFileMenuClose}
        />
      }
      {openChangeTheme &&
        <React.Suspense fallback={<CircularLoader />} >
          <ChangeTheme
            open={openChangeTheme}
            onOpen={() => { setOpenChangeTheme(!openChangeTheme) }}
            onClose={() => { setOpenChangeTheme(false) }}
            editorPreferencesStateAction={{ editorPreferences, updateEditorPreferences }}
          />
        </React.Suspense>
      }
      {openChangeMode &&
        <React.Suspense fallback={<CircularLoader />}>
          <ChangeMode
            open={openChangeMode}
            onOpen={() => { setOpenChangeMode(!openChangeMode) }}
            onClose={() => { setOpenChangeMode(false) }}
            editorPreferencesStateAction={{ editorPreferences, updateEditorPreferences }}
          />
        </React.Suspense>
      }
      {openDelete &&
        <DialogWithCallback
          open={openDelete}
          onClose={() => { setOpenDelete(false) }}
          actionCallback={() => deleteSnippet({ id: currentSnippetMeta.id, tabId: currentSnippetMeta.tabId })}
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
    snippets: state.snippets.mySnippets,
    currentSnippetMeta: state.snippets.currentSnippetMeta,
    editorPreferences: state.ui.editor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: page => dispatch(getSnippets(page)),
    updateSnippet: data => dispatch(updateSnippet(data)),
    saveSnippet: (data, remote) => dispatch(saveSnippet(data, remote)),
    deleteSnippet: snippetMeta => dispatch(deleteSnippet(snippetMeta)),
    setCurrentSnippetMeta: meta => dispatch(setCurrentSnippetMeta(meta)),
    updateEditorPreferences: props => dispatch(updateEditorPreferences(props)),
    closeSnippet: snippetMeta => dispatch(closeSnippet(snippetMeta)),
    addNotification: (data, level) => dispatch(level(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnippetManager);
