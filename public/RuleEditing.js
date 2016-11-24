import React from 'react'
import { render } from 'react-dom'
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router'
import ee from './EventEmitter';

export default class RuleEditing extends React.Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.onFinishEdit = this.onFinishEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.hideColors = this.hideColors.bind(this);
    this.showColors = this.showColors.bind(this);
  }

  onFinishEdit() {
    ee.emitEvent('ruleFinishEdit');  
  }

  onDelete(){
    let reqParams = {
      method: 'DELETE',
      credentials: 'include'
    }

    let login = this.props.login;
    let ruleID = this.props.target.props.id;
    fetch(`/api/userdata/${login}/rules/${ruleID}`, reqParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error);
        }
        // this.onFinishEdit().then(res => ee.emitEvent('projectDeleted', [projID]));   
        ee.emitEvent('ruleDeleted', [ruleID]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  showColors () {
    this.refs.editOptions.style.width = "150px";    
  }

  hideColors (e) {
    if (e.target.className == "colorsList") {
      this.refs.plabel.style.backgroundColor = 
        e.target.style.backgroundColor;
    } 
    this.refs.editOptions.style.width = "0"; 
  }

  saveChanges () {
    let bodyJSON = JSON.stringify({
      name: this.refs.editName.value,
      label: this.refs.plabel.style.backgroundColor,
      fine: this.refs.editFine.value
    });
      
    let reqParams = {
      method: 'PUT',
      headers: {  
        "Content-type": "application/json; charset=UTF-8"  
      },
      credentials: 'include',
      body: bodyJSON
    }

    let login = this.props.login;
    let ruleID = this.props.target.props.id;
    // fetch(`/api/userdata/${this.props.params.login}`, reqParams)
    fetch(`/api/userdata/${login}/rules/${ruleID}`, reqParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error); // handle;
          return;
        }
        let newData = {
          name: this.refs.editName.value, 
          label: this.refs.plabel.style.backgroundColor,
          fine: this.refs.editFine.value // duplicate
        };
        
        ee.emitEvent('ruleSaveEdit', [ruleID, newData]);
        this.onFinishEdit();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return<div className = "editForm">
              <div style = {{backgroundColor: this.props.target.props.label}} 
                className = "projectLabel" 
                ref = "plabel">
              </div>
              <input type = "text" defaultValue = {this.props.target.props.name} 
                className = "editName" 
                ref = "editName"
              />
              <div className = "editOpt">
                <div className = "editLabelForm">
                  <div className = "editChosen" onClick = {this.showColors}>
                    <i className="fa fa-tags" aria-hidden="true"></i>
                  </div>  
                  <div className = "editOptions" onClick = {this.hideColors} ref = "editOptions">
                    <div className = "colorsList" style = {{backgroundColor: "#FF3C3D"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#6DC04C"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#4591CB"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#ECEA48"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#BB5FF6"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#FFBE58"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#FF5BCE"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#58C6A0"}}></div>
                    <div className = "colorsList" style = {{backgroundColor: "#676C9A"}}></div>
                  </div>
                </div> 
                <input type = "number" className = "editPoints" 
                  ref = "editFine"
                  defaultValue = {this.props.target.props.fine} 
                  min = "1" max = "500"
                />
                <div className = "editButtons">           
                  <button className = "editSave" onClick = {this.saveChanges}>Save</button>
                  <button className = "editFinish" onClick = {this.onFinishEdit}>Cancel</button>
                  <button className = "editDelete" onClick = {this.onDelete}>
                    <i className="fa fa-trash"></i>
                  </button>                  
                </div>  
              </div>
            </div>
  }
}