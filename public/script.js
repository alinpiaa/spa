import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

class StartPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return<div>
            <ul className = "links">
              <li><IndexLink to="/signup" activeClassName="linkActive">Signup</IndexLink></li>
              <li><IndexLink to="/login" activeClassName="linkActive">Login</IndexLink></li>
              <li><IndexLink to="/about" activeClassName="linkActive">About</IndexLink></li>
            </ul>
            {this.props.children}
          </div>
  }
}

const About = () => (
  <div>
    © Rumata Estorskij, 2016.
  </div>
)

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  fieldOnFocus () {
    slogin.value = '';
    spassword.value = '';
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
        sOk.innerHTML = `Welcome aboard, ${res.login}! You may want to login.`                     
      })
      .catch(console.log);
  }

  render() {
    return <div>
            <input id="slogin" onFocus={this.fieldOnFocus}/>
            <input type="password" id="spassword"/>
            <p><button id = "signupBtn" onClick = {this.signUp}>Sign up</button></p>         
            <div id="swarn" className ="warn"></div>  
            <div id="sOk"></div>    
          </div>
  }
}

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
        browserHistory.push(`/userdata/${res.login}`);                    
      })
      .catch(console.log);
  }

  fieldOnFocus () {
    login.value = '';
    password.value = '';
    lwarn.innerHTML = '';
  }

  render () {
    return <div>
            <p>If you are already registered, you can login.</p>     
            <input id="login"/>
            <input type="password" id="password"/>
            <p><button id = "loginBtn" onClick={this.logIn}>Log in</button></p>              
            <div id="lwarn" className ="warn"></div>    
          </div>
  }
}

class NotFound extends React.Component {
  render() {
    return <div>
          404 Not Found
          </div>
  }
}

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secrets: []};
  }
  componentDidMount () {
    let reqParams = {
      method: 'GET',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      }, 
      credentials: 'include'
    }

    fetch('/api/secretRoute', reqParams)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          this.setState( {secrets: [...this.state.secrets, 
          res.message]} );
        } else {
          console.log(res.error);
        }
      })
      .catch(console.log);
  }
  render () {
    return <div> 
      Secret!
      {this.state.secrets.length}
      </div>
  }
}

class Userdata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: []};
    this.addProj = this.addProj.bind(this);
  }

  chooseProj(e) {
    e.target.className = 'chosen';  
  }

  addProj () {
    let reqParams = {
      method: 'POST',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },  
      body: 'project=' + encodeURIComponent(field.value),
      credentials: 'include'
    }
    fetch(`/api/userdata/${this.props.routeParams.login}`, reqParams)
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          return res._id;
        }
      })
      .then(_id => {
        this.setState( {projects: [...this.state.projects, 
        {name: field.value, _id: _id}]} );
      })
      .catch(console.log);        
  }

  componentDidMount () {
    let reqParams = {
      method: 'GET',
      headers: {  
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
      },
      credentials: 'include'
    } 
    fetch(`/api/userdata/${this.props.routeParams.login}`, reqParams)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.error) {
          res.map(elem => {
            this.setState( {projects: [...this.state.projects, 
            {name: elem.name, _id: elem._id}]} );
          })
          return;
        }
          return console.log(res.error);
      })
      .catch(console.log);
  }

  render () {
    let projects = this.state.projects;
    return <div>
            <input type ="text" id="field"/>
            <button onClick={this.addProj}>Add project</button>
            <ol>
              {projects.map((el,i) => {
                return <li key={i} id={el._id} onClick={this.chooseProj}> {el.name} </li>;
              })}
            </ol>
          </div>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return <div>
            <Topmenu/>
            BLABLABLABLA
          </div>
  }
}

class Topmenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return <div> 
            <ul className = "links">
              <li>LOGO :)</li>
              <li><IndexLink to="/projects" activeClassName="linkActive">Projects</IndexLink></li>
              <li><IndexLink to="/blabla" activeClassName="linkActive">Blabla</IndexLink></li>
              <li><button>Log out</button></li>
            </ul>           
          </div>
  }
}

class Blabla extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return <div> 
            BLABLABLABLA         
          </div>
  }
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return <div> 
            PROJECTS ARE HERE! :)       
          </div>
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={StartPage}>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/about" component={About}/>
    </Route>
    <Route path="/app/:login" component={App}>
       <Route path="/projects" component={Projects}/>
       <Route path="/blabla" component={Blabla}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('root'));