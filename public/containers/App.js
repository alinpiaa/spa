import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTask, addRule, addProject, addReward, deleteProject, 
  updateTask, receiveData, updatePoints, countRewardPercentage, 
  setTopRewardsVisibility,
  fetchUserdata } from '../actions'
import TestTopRewardsFilter from './TestTopRewardsFilter'
import RuleItem from '../components/RuleItem'

let App = () => (
  <div>
    <TestTopRewardsFilter />
    <RuleItem
    	name="fdgfdgfd"
    	label="red"
      fine={50}
    />
  </div>
)


//<button onClick = {onClick}> TOP: show / do not show </button>
// export default App
// Testing
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.fetchData = this.fetchData.bind(this);
//     this.setTopVisivility = this.setTopVisivility.bind(this);
//   }

//   fetchData() {
//     const { dispatch, projects, rules, rewards, points } =  this.props;
//     // dispatch(countRewardPercentage(2, 100, points));
//     dispatch(fetchUserdata("Rumata"));
//   }

//   setTopVisivility() {
//     const { dispatch, projects, rules, rewards, points } =  this.props;
//     dispatch(setTopRewardsVisibility(false));
//   }

//   componentDidMount() {
//     const { dispatch, projects, rules, rewards, points } =  this.props;
//     // dispatch(receiveData([{_id: 1, name: "Programming", label: "red", tasks: []}]));
//     // dispatch(addProject(1, "Programming", "red"));
//     // dispatch(updatePoints(10));
//     // dispatch(addReward(1, "Concert", 20, false, 15, true));
//     // dispatch(addReward(2, "Burger", 100, false, 90, true));
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.points !== this.props.points) {
//       const { dispatch, projects, rules, rewards, points } = nextProps
//     }
//   }

//   render(){
//   	return <div>
//   					It works!
//             <button onClick = {this.fetchData}>fetch data</button>
//             <button onClick = {this.setTopVisivility}>setTopVisivility</button>
//   				</div>
//   }
// }

// function mapStateToProps(state) {
//   const { projects, rules, rewards, points } = state.userdata;

//   return {
//     projects,
//     rules,
//     rewards,
//     points
//   }
// }

// function mapStateToProps(state) {
//   const shouldShowTop = state.visibilityFilter.shouldShowTopRewards

//   return {
//     shouldShowTop
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onClick: () => {
//       dispatch(setTopRewardsVisibility(false));
//     }
//   }
// }

// App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;