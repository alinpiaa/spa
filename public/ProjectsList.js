import React from 'react'
import { render } from 'react-dom'
import { 
  Router, Route, IndexRoute, Link, IndexLink, 
  IndexRedirect, browserHistory 
} from 'react-router'
import ProjectsAddNew from './ProjectsAddNew'
import ProjectsItem from './ProjectsItem'
import ee from './EventEmitter';

class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {projects: [], isEditing: null};
    this.loadProjects = this.loadProjects.bind(this);
    this.finishChildEditing = this.finishChildEditing.bind(this);
    this.updateChild = this.updateChild.bind(this);
    this.handleChildDelete = this.handleChildDelete.bind(this);    
  }

  loadProjects() {
    let reqParams = {
      method: 'GET',
      credentials: 'include'
    }

    fetch(`/api/userdata/${this.props.params.login}`, reqParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error); // handle;
          return;
        }
        // res.projects.map(proj => {
        //   this.setState( {projects: [proj, ...this.state.projects] });
        // });
        let newProjects = res.projects.reverse();
        this.setState({projects: newProjects});
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    ee.addListener('finishEdit', this.finishChildEditing);
    ee.addListener('saveEdit', this.updateChild);
    ee.addListener('childDelete', this.handleChildDelete);
    this.loadProjects();
  }

  componentWillUnmount() { 
    ee.removeListener('finishEdit', this.finishChildEditing);
    ee.removeListener('saveEdit', this.updateChild);
    ee.removeListener('childDelete', this.handleChildDelete);
  }

  handleAddingNew(proj){
    this.setState({projects: [proj, ...this.state.projects] });
  }

  handleChildDelete(id) {
    let newProjects = this.state.projects.slice();
    newProjects = newProjects.filter(el => el._id !== id);
    this.setState({projects: newProjects});
  }

  handleChildEdit(itemID) {
    this.setState({isEditing: itemID});
  }

  updateChild(itemID, newData) {
    this.state.projects.map(el => {
      if (el._id == itemID) {
        el.name = newData.name;
        el.label = newData.label;
      }
      return el;
    });
  }

  finishChildEditing() {
    this.setState({isEditing: null});
  }

  // handleChildOpen(id) {
  //   let login = this.props.params.login;
  //   browserHistory.push(`/app/${login}/projects/p/${id}`); 
  // }

  /*removing
    onRemovePerson: function(index) {
    var newData = this.state.data.slice(); //copy array
    newData.splice(index, 1); //remove element
    this.setState({data: newData}); //update state
  },*/

  render () {
    return <div id = "projectsList">
            List Page
            <ProjectsAddNew 
              login = {this.props.params.login}
              onAddingNew = {this.handleAddingNew.bind(this)}
            />
            <div id = "projectsList">
              {
                this.state.projects.map((el,i) => {
                  let editing = (this.state.isEditing == el._id) ? true : false;
                  let cNameEdit = (editing) ? "editing" : "";
                  return <ProjectsItem key = {i} 
                    id ={el._id} 
                    name = {el.name} 
                    label = {el.label}
                    login = {this.props.params.login}
                    editing = {editing}
                    cNameEdit = {cNameEdit}
                    onEdit={this.handleChildEdit.bind(this)}
                  />
                })
              }       
            </div>
          </div>
  }
}

export default ProjectsList;
 //   onDelete={this.handleChildDelete.bind(this)} 
              //   onEdit={this.handleChildEdit.bind(this)}
              //   onOpen={this.handleChildOpen.bind(this)} 
            