import React, { Component } from 'react';
//import the child classes
import EntryPage from './EntryPage'
import Status from './Status'
import Visuals from './Visuals'
import Setup from './Setup'
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentUser: null, entries: [], taglist: [], startDate: null, dailyBudget: null };; //tester code
    };

    componentDidMount() {
        let currentUser = this.props.currentUser.uid;
        this.setState({ currentUser: currentUser })
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

        firebaseEntriesRef.orderByChild("date").on('value', (snapshot) => {
            if (snapshot.exists()) {
            let firebaseList = snapshot.val();

            let keyArray = Object.keys(firebaseList);
            let entriesArray= keyArray.map( (theKey) => {
              let entryObj = firebaseList[theKey];
              entryObj.FBKey = theKey;
              return entryObj;
            })
            entriesArray.sort((a, b) => {
                return Date.parse(b.date) - Date.parse(a.date);
            })
            let id = 1;
            for(let entry of entriesArray) {
                entry.id = id;
                id++;
            }
            this.setState({entries: entriesArray});
        }
        });

        tagListRef.on('value', (snapshot) => {
            if (snapshot.exists()) {
            //captures the values
            let tagList = snapshot.val();
            //places the values into a local array
            let localArr = Object.values(tagList)
            this.setState({ taglist: localArr })
            }
        });

        startDateRef.on('value', (snapshot) => {
            //captures the values
            let startDate = snapshot.val();
            this.setState({ startDate: startDate })
        });

        dailyBudgetRef.on('value', (snapshot) => {
            //captures the values
            let dailyBudget = snapshot.val();
            this.setState({ dailyBudget: dailyBudget })
        });

    };

    render() {
        return (

            <main>
                <Switch>
                    <Route path='/entry' render={(props) => <EntryPage {...props} currentUser={this.props.currentUser} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} addEntryToMain={this.addEntryToMain} unsubmitClicked={this.unsubmitClicked} toggleRadio={this.toggleRadio} />} />
                    <Route path='/status' render={(props) => <Status {...props} currentUser={this.props.currentUser} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} />} />
                    <Route path='/visuals' render={(props) => <Visuals {...props} currentUser={this.props.currentUser} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} />} />
                    <Route path='/setup' render={(props) => <Setup {...props} currentUser={this.props.currentUser} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} handleGettingStarted={this.handleGettingStarted} />} />
                    <Redirect to='/entry' />
                </Switch>
            </main>


        )
    }

    addEntryToMain = (entry) => {
        let userRef = firebase.database().ref(this.state.currentUser);
        let firebase_entries = userRef.child('Entries');

        firebase_entries.push(entry);

        let entries = this.state.entries;
        entries.push(entry);
        let sorted = entries.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date);
        });
        let id = 1;
        for (let entry of sorted) {
            entry.id = id;
            id++;
        }
        this.setState({
            entries: sorted
        });
    }

    toggleRadio = (entryIndex) => {

        this.setState((currState, currProps) => {
            let copyEntries = currState.entries.map((eachEntry) => {
                return Object.assign({}, eachEntry)
            })
            copyEntries[entryIndex].checked = !copyEntries[entryIndex].checked;
            return { entries: copyEntries };
        })
    }

    unsubmitClicked = () => {
        let userRef = firebase.database().ref(this.state.currentUser);
        let firebase_entries = userRef.child('Entries');
        this.setState((currState, currProps) => {
            let copyEntries = [];
            let newid = 1;
            for (let eachEntry of currState.entries) {
                if (eachEntry.checked === false) {
                    eachEntry.id = newid;
                    newid++;
                    copyEntries.push(eachEntry);
                }
            }

            let objEntries = {};
            copyEntries.forEach((entry) => {
                let key = entry.FBKey;
                objEntries[key] = entry;
            })

            firebase_entries.set(objEntries);
            return { entries: copyEntries };
        })
        // this.setState((currState, currProps) => {
        //     let copyTasks = currState.entries.map((eachEntry) => {
        //         return Object.assign({}, eachTask);
        //     });
        //     copyTasks = copyTasks.slice(entryIndex, entryIndex + 1)
        //     let newTask = {
        //     id: copyTasks.length + 1,
        //     description: taskDescription,
        //     complete: false
        //     }
        //     copyTasks.push(newTask);
        //     return {tasks: copyTasks};
        // })
    }

    handleGettingStarted = (dataToOnboard) => {
        this.setState({
            startDate: dataToOnboard.startDate
        });
        this.setState({
            dailyBudget: dataToOnboard.dailyBudget
        })
    }

}

