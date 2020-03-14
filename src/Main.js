import React, { Component } from 'react';
//import the child classes
import EntryPage from './EntryPage'
import Status from './Status'
import Visuals from './Visuals'
import Setup from './Setup'
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import SAMPLE_DATA from './data.json'; //data with a sample list of entries (model)

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { entries: [], taglist: [], startDate: null, dailyBudget: null };; //tester code
    };

    componentDidMount() {
        //pretend we loaded external data
        this.setState({ entries: SAMPLE_DATA.entries });
        this.setState({ taglist: SAMPLE_DATA.tagList });
        this.setState({ startDate: SAMPLE_DATA.startDate});
        this.setState({ dailyBudget: SAMPLE_DATA.dailyBudget});
    };



    render() {
        return (
            
                <main>
                <Switch>
                    <Route path='/entry' render={(props) => <EntryPage {...props} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} addEntryToMain={this.addEntryToMain} unsubmitClicked={this.unsubmitClicked} toggleRadio={this.toggleRadio}/>} />
                    <Route path='/status' render={(props) => <Status {...props} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} />} />
                    <Route path='/visuals' render={(props) => <Visuals {...props} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} />} />
                    <Route path='/setup' render={(props) => <Setup {...props} entries={this.state.entries} taglist={this.state.taglist} startDate={this.state.startDate} dailyBudget={this.state.dailyBudget} handleGettingStarted={this.handleGettingStarted} />} />
                    <Redirect to='/entry' />
                </Switch>
                </main>
            
            
        )
    }

    addEntryToMain = (entry) => {
        let entries = this.state.entries;
        entries.push(entry);
        this.setState({
            entries: entries
        });
    }

    toggleRadio = (entryIndex) => {
        console.log('toggling!');
        this.setState((currState, currProps) => {
            let copyEntries = currState.entries.map((eachEntry) => {
                return Object.assign({}, eachEntry)
            })
            copyEntries[entryIndex].checked = !copyEntries[entryIndex].checked;
            return {entries: copyEntries};
        })
    }

    unsubmitClicked = () => {
        this.setState((currState, currProps) => {
            let copyEntries = [];
            let newid = 1;
            for(let eachEntry of currState.entries) {
                if(eachEntry.checked === false) {
                    eachEntry.id = newid;
                    newid++;
                    copyEntries.push(eachEntry);
                }
            }
            return {entries: copyEntries};
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

