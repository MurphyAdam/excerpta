import Home from './containers/Home';
import SnippetManager from './containers/SnippetManager';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import NotFound from './components/Errors/NotFound';


// these are our app routes and there respective components
const Routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    needsAuthentication: false,
    needsAuthorisation: false
  },
  {
    path: '/editor',
    name: 'Snippets Editor',
    component: SnippetManager,
    needsAuthentication: false,
    needsAuthorisation: false
  },
  {
    path: '/auth/signin',
    name: 'Sign in',
    component: SignIn,
    needsAuthentication: false,
    needsAuthorisation: false
  },
  {
    path: '/auth/signup',
    name: 'Sign up',
    component: SignUp,
    needsAuthentication: false,
    needsAuthorisation: false
  },
  {
    path: '/http-status/404',
    name: 'Not Found',
    component: NotFound,
    needsAuthentication: false,
    needsAuthorisation: false
  },
];

export default Routes;