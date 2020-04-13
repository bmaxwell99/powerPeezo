import React, { Component } from 'react';
import './App.css';
import './RecentHistory.css';

export default class RecentHistory extends Component {

  render() {
    return (
      <div className='container'>
        <h2>Recent Expense History</h2>
        <HistoryTable entries={this.props.entries} toggleRadio={this.props.toggleRadio} unsubmitClicked={this.props.unsubmitClicked}/>
      </div>  
    )
  };
}


export class HistoryTable extends Component {
  unsubmitEntry = (evt) => {
    evt.preventDefault();
    this.props.unsubmitClicked();
  }
  render() {
    // let sortedRow  = this.props.entries.sort((a, b) => {
    //   return Date.parse(b.date) - Date.parse(a.date);
    // });
    
    let rows = this.props.entries.map((eachEntry) => {
      let row = <HistoryRow key={eachEntry.id} entry={eachEntry} toggleRadio={this.props.toggleRadio}/>;
      return row;
    });
    return (
    <section className="">
      <div className="container bg-secondary card margin history ">
        <HistoryHeader/>
        {rows}
        

      </div> 

      <button type="submit" className="btn btn-block btn-dark margin" onClick={this.unsubmitEntry}>Remove</button>     
 
      
    </section>
    
    );
  }
}

export class HistoryHeader extends Component {
  render() {
    let header = (
      <div className="row history-header">
        <div className="col-sm">
          Date
        </div>
        <div className="col-sm">
          Amount
        </div>
        <div className="col-sm mobile-view">
          Tag
        </div>
        <div className="col-sm mobile-view">
          Description
        </div>
      </div>
    )
    return header;
  }
}


export class HistoryRow extends Component {
  handleRadioClick = () => {
    this.props.toggleRadio(this.props.entry.id - 1);
  }
  

  render() {
    let row = (

      <div className="row first-entry" onClick={this.handleRadioClick}>
        <input type="radio" checked={this.props.entry.checked} onChange={()=>{}} />
        <div className="col-sm date-history">
          {this.props.entry.date}
        </div>
        <div className="col-sm date-amount">
          {this.props.entry.amount}
        </div>
        <div className="col-sm date-tag mobile-view">
          {this.props.entry.tag}
        </div>
        <div className="col-sm date-description mobile-view">
          {this.props.entry.description}
        </div>
      </div>
    );
    return row;
  }

}