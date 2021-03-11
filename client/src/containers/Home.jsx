import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { CircularLoader } from '../components/Common/Loaders';

const SnippetManager = lazy(() => import('./SnippetManager'));
const About = lazy(() => import('./About'));

const Home = (props) => {

  const { currentUser, isAuthenticated } = { ...props };

  return (
    <React.Fragment>
      {!isAuthenticated
        ?
        <React.Suspense fallback={<CircularLoader />}>
          <About />
        </React.Suspense>
        :
        <React.Suspense fallback={<CircularLoader />}>
          <SnippetManager currentUser={currentUser}
            isAuthenticated={isAuthenticated} />
        </React.Suspense>
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