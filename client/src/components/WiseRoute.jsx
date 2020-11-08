import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function WiseRoute(props) {

  const { needsAuthentication, needsAuthorisation, currentUser, ...rest } = {...props}

  if(!needsAuthentication) {
      return <Route {...rest} />
  }
  else if(needsAuthentication) {
      if(currentUser.authenticated) {
          if(needsAuthorisation && currentUser.user.is_admin) {
              return <Route {...rest} />
          }
          else if(!needsAuthorisation) {
              return <Route {...rest} />
          }
          else {
            return <Redirect to="/" />
          }
      }
      else {
          return <Redirect to="/" />
      }
  }
  else {
      return <Redirect to="/" />
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  };
};

WiseRoute.propTypes = {
    needsAuthentication: PropTypes.bool,
    needsAuthorisation: PropTypes.bool,
    currentUser: PropTypes.object,
    rest: PropTypes.array
};

export default connect(mapStateToProps)(WiseRoute);