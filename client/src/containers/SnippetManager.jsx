import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { getSnippets, updateSnippet, saveSnippet } from '../redux/actions/snippets';
import { connect } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { AntTabs, AntTab } from '../components/Snippet/Tabs';
import TabContainer from '../components/Snippet/TabContainer';
import NewSnippet from '../components/Snippet/NewSnippet';

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
  const { isAuthenticated, snippets, loadSnippets, updateSnippet, saveSnippet } = props;
  const classes = useStyles();

  // Tabs state and actions
  const [currentTabId, setCurrentTabId] = useState();
  const [tab, setTab] = useState(0)
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const handleTabChange = (event, value) => setTab(value);

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
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={() => {setOpenCreateNew(!openCreateNew)}}>
            New
          </MenuItem>
          <MenuItem key="saveLocally" 
            onClick={() => saveSnippet({id: currentTabId ,state: ''}) }>
            Save to local
          </MenuItem>
          <MenuItem key="saveRemotely" 
            onClick={() => saveSnippet({id: currentTabId ,state: '[saving...]'}, true) }>
            Save to remote
          </MenuItem>
          <MenuItem>
            Close
          </MenuItem>
          <MenuItem>
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
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={() => {setOpenCreateNew(!openCreateNew)}}>
            Theme
          </MenuItem>
          <MenuItem key="saveLocally" 
            onClick={() => saveSnippet({id: currentTabId ,state: ''}) }>
            Mode
          </MenuItem>
          <MenuItem key="saveRemotely" 
            onClick={() => saveSnippet({id: currentTabId ,state: '[saving...]'}, true) }>
            Font
          </MenuItem>
          <MenuItem>
            Close
          </MenuItem>
        </Menu>
      </div>
      <Divider className={classes.divider} />
      <AntTabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        {snippets.snippets.length &&
          snippets.snippets.map(snippet => (
            <AntTab key={snippet.id}
              onClick={() => setCurrentTabId(snippet.id)}
              label={`${snippet.title} ${snippet.state}`} >
            </AntTab>
          )) 
        }
      </AntTabs>
      {snippets.snippets.length &&
        snippets.snippets.map((snippet, i) => (
          <TabContainer key={snippet.id}
            snippet={snippet} 
            tab={tab}
            index={i} 
            updateSnippet={updateSnippet} 
            saveSnippet={saveSnippet} />
        )) 
      }
      {openCreateNew &&
        <NewSnippet 
          open={openCreateNew}
          onOpen={() => {setOpenCreateNew(!openCreateNew)}}
          onClose={() => {setOpenCreateNew(false)}}
          setCurrentTabId={setCurrentTabId}
        />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: () => dispatch(getSnippets()),
    updateSnippet: data => dispatch(updateSnippet(data)),
    saveSnippet: (data, remote) => dispatch(saveSnippet(data, remote)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnippetManager);
