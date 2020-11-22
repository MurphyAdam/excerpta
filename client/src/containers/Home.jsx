import React from 'react';
import { connect } from 'react-redux';
import SnippetManager from './SnippetManager';
import About from './About';

const Home = (props) => {
	
  const { currentUser, isAuthenticated } = {...props};

  return (
    <React.Fragment>
      {!isAuthenticated
        ?
        <React.Fragment>
          <About />
        </React.Fragment>
        :
        <SnippetManager currentUser={currentUser}
          isAuthenticated={isAuthenticated} />
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.user,
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);