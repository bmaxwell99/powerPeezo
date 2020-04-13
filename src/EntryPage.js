import React, { Component } from 'react';
//import the child classes
import EntryForm from './EntryForm'
import RecentHistory from './RecentHistory'
import './App.css';

export default class EntryPage extends Component {
    render() {
      return (
        <div>
            <EntryForm  currentUser={this.props.currentUser} entries={this.props.entries} taglist={this.props.taglist} startDate={this.props.startDate} dailyBudget={this.props.dailyBudget} addEntryToMain={this.props.addEntryToMain}/>
            <RecentHistory currentUser={this.props.currentUser} entries={this.props.entries} taglist={this.props.taglist} startDate={this.props.startDate} dailyBudget={this.props.dailyBudget} unsubmitClicked={this.props.unsubmitClicked} toggleRadio={this.props.toggleRadio}/>
        </div>
      )
      }
  }