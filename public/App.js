import React from 'react';
import { render } from 'react-dom';
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router';
import InternalTopmenu from './InternalTopmenu';
import PromotionsShortList from './PromotionsShortList';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // //todo: DidMount - fetch to check Auth; if not user page, forbidden, redirect.
  render () {
    return <div id = "app">
            <InternalTopmenu login = {this.props.params.login}/>
            <div id = "appContent">
              {this.props.children}
              <PromotionsShortList login = {this.props.params.login}/>
            </div>
          </div>
  }
}

export default App;
