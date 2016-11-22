import React from 'react';
import { render } from 'react-dom';
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router';
import App from './App';
import InternalTopmenu from './InternalTopmenu';
import Login from './Login';
import NotFound from './NotFound';
import Project from './Project';
import Projects from './Projects';
import ProjectsAddNew from './ProjectsAddNew';
import ProjectsList from './ProjectsList';
import Signup from './Signup';
import StartPage from './StartPage';
import RuleList from './RuleList';
import Points from './Points';
import Promotions from './Promotions';

render((
  <Router history={browserHistory}>
    <Route path="/" component={StartPage}>
      <IndexRedirect to="/signup"/> 
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
    </Route>
    <Route path="app/:login" component={App}>
      <IndexRedirect to="projects"/> 
      <Route path="rules" component={RuleList}/>
      <Route path="promotions" component={Promotions}/>
      <Route path="projects" component={Projects}>
        <IndexRedirect to="list"/> 
        <Route path="list" component={ProjectsList}/>
        <Route path="p/:projectID" component={Project}/>  
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('root'));