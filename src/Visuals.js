import React, { Component } from 'react';
import './App.css';
import './Visual.css';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Slider extends Component {
  render() {
    return(
      <div className="slidecontainer">
        <input type="range" min="2" max="10" defaultValue="7" onChange={this.props.slideChange}/>
      </div>
    );
  }
}
class TagList extends Component {
  render() {

    if(this.props.tagList) {
      let radioButtons = this.props.tagList.map((tag, index) => {
        return(
          <div key={index} className="eachTag">
            <input type="radio" id={tag} name="tag" value={tag} onClick={this.props.changeTag}/>
            <label htmlFor={tag}>{tag}</label>
          </div> 
        );
      })
      return(
        <div className="tags">
          <div className="eachTag">
            <input type="radio" id="overall" name="tag" value="overall" onClick={this.props.changeTag} defaultChecked />
            <label htmlFor="overall">overall</label>
          </div>

          {radioButtons}
        </div>
      );
    }



  }
}
export default class Visuals extends Component {
  constructor(props) {
    super(props);

    this.state = {tag: "overall", days: 7};
  }   

  changeTag = (evt) => {
    this.setState({tag: evt.target.id});
  }

  slideChange = (evt) => {
    this.setState({days: evt.target.value});
  }
  render() {

    if(this.props.entries.length !== 0 && this.props.taglist.length !== 0) {
      let runMax = 0;
      let filteredEntries = this.props.entries.filter((entry) => {
        return this.state.tag === "overall" || entry.tag === this.state.tag;
      });

      if(filteredEntries.length === 0) {
        return(
          <div>
            <h2>There are no recent expenses in this category!</h2>
            <TagList tagList={this.props.taglist} changeTag={this.changeTag}/>
            <h2>Recent days: {this.state.days}</h2>
            <Slider slideChange={this.slideChange}/>
          </div>
        )
      } 
      
      let mostRecentDate = filteredEntries[0].date;
      //let dayDifference = (Date.parse(recentEntries[0].date) - Date.parse(recentEntries[1].date))/8.64e7;
      let recentEntries = filteredEntries.filter((entry) => {
        let dayDifference = (Date.parse(mostRecentDate) - Date.parse(entry.date))/8.64e7;
        return this.state.days >= dayDifference;
      });
      let simplifiedEntries = [];
      for(let entry in recentEntries) {
        let flag = true;
        for(let simpEntry in simplifiedEntries) {
          if(recentEntries[entry].date === simplifiedEntries[simpEntry].date) {
            simplifiedEntries[simpEntry].amount += parseFloat(recentEntries[entry].amount);
            flag = !flag;
            break;
          } 
        }
        if(flag) {
          simplifiedEntries.push({amount: parseFloat(recentEntries[entry].amount), date: recentEntries[entry].date}); 
        }
      }
      let points = simplifiedEntries.map((entry) => {
        let dateObj = new Date(entry.date);
        let amount = parseFloat(entry.amount);
        runMax = runMax + amount;
        return {x: dateObj, y: amount};
      });
      const options = {
        title: {text:"Expenses"},
        theme: "light2",
        axisY: {
          title: "Price",
          includeZero: false,
          prefix: "$",
          
        },
        axisX: {
          title: "Recent Days",
          valueFormatString: "MM/DD" ,
          labelAngle: -50
        },
        data: [
          {
            type: "line",
            dataPoints: points
          }
        ],   
        animationEnabled: true,  
      };
      return (
        <div>
          <CanvasJSChart options={options} />
          <TagList tagList={this.props.taglist} changeTag={this.changeTag}/>
          <h2>Recent days: {this.state.days}</h2>
          <Slider slideChange={this.slideChange}/>
        </div>
      );
    } else {
      return null;
    }
  }
}