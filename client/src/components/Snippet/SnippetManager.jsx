import React, { useState, useEffect, lazy } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { CircularLoader } from '../Common/Loaders';
import { getSnippets } from '../../redux/actions/snippets';
import { connect } from 'react-redux';


function SnippetManager (props){
  const { currentUser, isAuthenticated, snippets, loadSnippets } = {...props}

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
    <div>
      {null}
    </div>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SnippetManager);
