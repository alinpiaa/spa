import React from 'react'
import { render } from 'react-dom'
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router'
//TODO: forms
class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id = "sOk">
            {`Welcome aboard,\n${this.props.login}!\nYou may want to\n`}
             <IndexLink id = "toLogin" to="/login">log in</IndexLink>
          </div>
  }
}         

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {registered: false, login: null};
  }

  fieldOnFocus () {
    swarn.innerHTML = '';
  }

  signUp() {
    let reqParams = {
      method: 'POST',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'login=' + encodeURIComponent(slogin.value) +
      '&password=' + encodeURIComponent(spassword.value)
    }

    fetch('/api/signup', reqParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          swarn.innerHTML = res.error; 
          return;
        }
        this.fieldOnFocus();
        this.setState({registered: true, login: res.login});
        
        // sOk.innerHTML = `Welcome aboard,\n${res.login}!\nYou may want to ${link()}.`                     
      })
      .catch(console.log);
  }

  render() {
    let readyMessage = (this.state.registered) ? <Message login = {this.state.login}/> : null;
    return <div className = "authForms">
              <div className = "lpForm">
                Login: 
                <input id="slogin" onFocus={this.fieldOnFocus}/>
                Password: 
                <input type="password" onFocus={this.fieldOnFocus} id="spassword"/>
                <div id="swarn" className ="warn"></div>  
                <p id = "pBtn"><button id = "signupBtn" onClick = {this.signUp}>Sign up</button></p>         
                {readyMessage}   
              </div>
            </div>
  }
}
