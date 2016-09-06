import React from 'react'
import { render } from 'react-dom'
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn () {
    let reqParams = {
      method: 'POST',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }, 
      body: 'login=' + encodeURIComponent(login.value) +
      '&password=' + encodeURIComponent(password.value), 
      credentials: 'include'
    }

    fetch('/api/login', reqParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          lwarn.innerHTML = res.error; 
          return;
        }
        browserHistory.push(`app/${res.login}`);                    
      })
      .catch(console.log);
  }

  fieldOnFocus () {
    login.value = '';
    password.value = '';
    lwarn.innerHTML = '';
  }

  render () {
    return <div className = "lpForm">
            <p id = "canlogin"> If you are already registered, you can login.</p>     
            Login: 
            <input id="login" onFocus={this.fieldOnFocus}/>
            Password:
            <input type="password" id="password"/>
            <p><button id = "loginBtn" onClick={this.logIn}>Log in</button></p>              
            <div id="lwarn" className ="warn"></div>    
          </div>
  }
}
export default Login;