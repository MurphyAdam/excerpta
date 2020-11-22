import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { getPublicSnippets } from '../redux/actions/snippets';
import SnippetShowCase from '../components/Snippet/SnippetShowCase';

const Snippets = (props) => {
	
  const { snippets, loadSnippets, editorPreferences } = props;

  useEffect(
    () => {
      if (!snippets.snippets.length && 
          !snippets.isLoading && 
          !snippets.isLoaded &&
          !snippets.isError) loadSnippets()
    }, 
    [snippets, loadSnippets]
  );

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
    loadSnippets: () => dispatch(getPublicSnippets()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Snippets);