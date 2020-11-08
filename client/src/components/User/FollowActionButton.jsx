import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PropTypes from 'prop-types'
import { followUser as follow, unfollowUser as unfollow } from '../../services/postData';
import Dialogx from '../Common/Dialog';


export default function FollowActionButton(props){
  const { user, reloadUser } = {...props};
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performFollow = async action => {
    if(!isLoading && action){
      setIsError(false);
      setIsLoading(true);
      try {
        if(action === "follow") await follow(user.id);
        else if (action === "unfollow") await unfollow(user.id);
        else return null;
        reloadUser(user.id);
      } catch (error) {
          if (error.response) {
            setIsError(true);
            setError(error.response?.data?.message || 
              error.response.statusText);
          }
          else if (error.request) {
            setIsError(true);
            setError(error.request?.data?.message || 
              error.request.statusText);
          }
      }
      setIsLoading(false);
    }
  };

  return (
  	<React.Fragment>
		  {user.following_them
		    ?
			   <Button
			      type="submit"
			      variant="outlined"
            disabled={isLoading}
			      onClick={() => performFollow("unfollow")}
			      startIcon={<PersonAddDisabledIcon onClick={() => performFollow("unfollow")}/>}
			    >
			      unfollow
			    </Button>
		    :
		     <Button
		        type="submit"
		        variant="outlined"
            disabled={isLoading}
		        onClick={() => performFollow("follow")}
		        startIcon={<PersonAddIcon onClick={() => performFollow("follow")}/>}
		      >
		        follow
		      </Button>
		    }
	    {isError && 
	      <Dialogx
	        title={"Error"}
	        body={error}
	        actionName={"Okay"}
	      />
	    }
    </React.Fragment>
  )
}

FollowActionButton.propTypes = {
  user: PropTypes.object.isRequired,
  reloadUser: PropTypes.func.isRequired,
};