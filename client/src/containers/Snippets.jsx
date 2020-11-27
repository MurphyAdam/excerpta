import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { getPublicSnippets } from '../redux/actions/snippets';
import SnippetShowCase from '../components/Snippet/SnippetShowCase';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(1.2),
  }
}));

const Snippets = (props) => {
	
  const { snippets, loadSnippets, editorPreferences } = props;
  const classes = useStyles();

  useEffect(
    () => {
      if (!snippets.snippets.length && 
          !snippets.isLoading && 
          !snippets.isLoaded &&
          !snippets.isError) loadSnippets(1)
    }, 
    [snippets, loadSnippets]
  );

  const handlePaginationChange = v => {
    // prevent user from reloading the same pagination
    if(snippets.current !== v || snippets.isLoading)
      loadSnippets(v);
  }

  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
      </Container>
      {!!snippets.snippets.length &&
        <SnippetShowCase snippets={snippets.snippets} editorPreferences={editorPreferences} />
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
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.user,
    snippets: state.snippets.publicSnippets,
    editorPreferences: state.ui.editor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSnippets: page => dispatch(getPublicSnippets(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Snippets);