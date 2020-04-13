
import React, {Component} from 'react';
//import the child classes
import Nav from './Navbar' 
import Main from './Main' 
import Footer from './Footer' 
import './App.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {user: null, loading: true};
  }

  uiConfig = {
    signInOptions: [{
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
    credentialHelper: 'none',
    signInFlow: 'popup'
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( (firebaseUser) => {
      this.setState({loading: false});
      this.setState({user: firebaseUser});
    })
    
    
  }

  handleSignOut = () => {
    this.setState({errorMessage:null});
    firebase.auth().signOut();
  }

  handleNewUser(){

        let currentUser = this.state.user.displayName;
        let userRef = firebase.database().ref(currentUser);

        let tagListRef = userRef.child('tagList');
        let startDateRef = userRef.child('startDate');
        let dailyBudgetRef = userRef.child('dailyBudget');
        let firebaseEntriesRef = userRef.child('Entries');

        userRef.once("value", snapshot => {
            if (!snapshot.exists()) {
                //constructs the schema for new users
                startDateRef.set("2/1/2020");
                dailyBudgetRef.set(25);
                firebaseEntriesRef.push(
                    {
                        "id": 1,
                        "amount": 3.25,
                        "description": "Sample Transaction!",
                        "date": "2/5/2020",
                        "tag": "food",
                        "checked": false
                    })
                //future iterations will allow users to modify this list
                let defaultTagList = ["food", "fitness", "social", "hobbies", "gas", "parking"]
                tagListRef.set(defaultTagList)
            }
            else{
            }
        });

  }

  render() {
    let content = null;

    if (this.state.loading) {
      content = (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
    } else if(!this.state.user) {
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth = {firebase.auth()}/>
        </div>
      );
    } else {
      //this.handleNewUser()
      content = (
        <div>
          <Nav />
          <Main currentUser={this.state.user}/>
          <Footer />
          <button className="btn btn-warning" onClick={this.handleSignOut}>
            Log Out {this.state.user.displayName}
          </button>
        </div>
      )
    }
    return (content);
  }
}

export default App;
