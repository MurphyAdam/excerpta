import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { CircularLoader } from '../components/Common/Loaders';
import { getSnippets, updateSnippet } from '../redux/actions/snippets';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import { AntTabs, AntTab } from '../components/Snippet/Tabs';

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
  const { currentUser, isAuthenticated, snippets, loadSnippets, updateSnippet } = {...props}
  const classes = useStyles();
  const [code, setCode] = useState(`const ikhan = 1`)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDelete, setOpenDelete] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [tab, setTab] = useState(0)

  const handleTabChange = (event, value) => setTab(value);

  console.log(snippets);

  const editorDimensions = {
    width: (window.screen.availWidth - (window.screen.availWidth / 5)),
    height: window.screen.availHeight - (window.screen.availHeight / 4),
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

  function onChange(newValue) {
    console.log("change", newValue);
  }

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
            <MenuItem key="2-delete" onClick={null}>
              Save
            </MenuItem>
            <MenuItem>
              Quit
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
              label={snippet.title} />
          )) 
        }
      </AntTabs>
      {snippets.snippets.length &&
        snippets.snippets.map((snippet, i) => (
          <TabContainer key={snippet.id}
            snippet={snippet} 
            tab={tab}
            index={i} 
            editorDimensions={editorDimensions}
            setCode={setCode} 
            updateSnippet={updateSnippet} />
        )) 
      }
    </React.Fragment>
  )
};

SnippetManager.propTypes = {
  loadSnippets: PropTypes.func.isRequired,
}


const TabContainer = (props) => {
  const { snippet, tab, index, editorDimensions, setCode, updateSnippet } = props;

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
          onChange={code => updateSnippet({code, id: snippet.id})}
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
            exec: () => { alert('key-binding used')}  //function to execute when keys are pressed.
          }]}
        />
        )}
    </React.Fragment>
  )
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
