import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { getSnippets, updateSnippet } from '../redux/actions/snippets';
import { connect } from 'react-redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { AntTabs, AntTab } from '../components/Snippet/Tabs';
import TabContainer from '../components/Snippet/TabContainer';

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  divider: {
    marginTop: theme.spacing(0.7),
  },
}));

function SnippetManager (props){
  const { isAuthenticated, snippets, loadSnippets, updateSnippet } = {...props}
  const classes = useStyles();
  const [currentTabId, setCurrentTabId] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [tab, setTab] = useState(0)
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleTabChange = (event, value) => setTab(value);

  const saveSnippet = id => updateSnippet({id, edited: false});

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
          onClick={handleClick}
        >
          File
        </Typography>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem>
              New
            </MenuItem>
            <MenuItem key="save" onClick={() => saveSnippet(currentTabId)}>
              Save
            </MenuItem>
            <MenuItem>
              Close
            </MenuItem>
            <MenuItem>
              Delete
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
              label={`${snippet.edited ? snippet.title + '*' : snippet.title}`} >
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnippetManager);
