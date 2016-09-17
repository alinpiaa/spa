import React from 'react';
import { render } from 'react-dom';
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router';
import PromotionItem from './PromotionItem';

class Promotions extends React.Component {
  constructor(props) {
    super(props);
  }
  // //todo: DidMount - fetch to check Auth; if not user page, forbidden, redirect.
  render () {
    return <div id = "promotions">
            HERE IS YOUR PROMOTIONS
            <PromotionItem/>
            <PromotionItem/>
            <PromotionItem/>
          </div>
  }
}

export default Promotions;
