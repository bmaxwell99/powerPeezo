import React, { Component } from 'react';
import './App.css';

export default class Status extends Component {

    render() {
      return (
        <div>
            <Brief />
            <Categories entries={this.props.entries} budget={this.props.dailyBudget}/>
        </div>
      );
      }
}

class Brief extends Component {
    render() {
        return (
            <div className="title_mess">
                <h1><strong>Welcome to Budgeter!</strong></h1>
                <p>Watch and finance the most common categories of expenses here. 
                Your totals will change the more you spend so spend carefully! 
                </p>
            </div>
        );
    }
}

function getTotals(entries) {
    let totals = new Map([["overall", 0], ["food", 0], ["fitness", 0], ["social", 0], ["hobbies", 0]]);
    entries.forEach(entry => {
        let category = entry.tag;
        totals.set(category, totals.get(category) + entry.amount);
        totals.set("overall", totals.get("overall") + entry.amount);
    });
    return totals;
}

class Categories extends Component {
    render() {
        let totals = getTotals(this.props.entries);
        return (
            <div>
                <Overall amount={totals.get("overall")} budget={this.props.budget}/>
                <div className="container">
                    <div className="row ">
                        <CatCard category="Food" amount={totals.get("food")}/>
                        <CatCard category="Fitness" amount={totals.get("fitness")}/>
                        <CatCard category="Social" amount={totals.get("social")}/>
                        <CatCard category="Hobbies" amount={totals.get("hobbies")}/>
                    </div>
                </div>
            </div>
        );
    }
}

class CatCard extends Component {
    render() {
        return (
            <div className="col-md-6 col-xl-3 d-flex">
                <div className="card mb-4 border-secondary">
                    <div className="card-body bg-secondary ">
                        <h2 className="card-title">{this.props.category}</h2>
                        <img src="./img/gas.png" className="image" alt="gas container"/>
                        <h3 className="budg_left1 pb-3">You have spent: ${this.props.amount}</h3>
                        {/* <p class="card-text"><em>Our Tip: </em>This should be a consistent category 
                            with the exception of a long trip every so often. Make sure you
                            aren't consistently going over budget (if you are... maybe buy a bike)
                        </p>
                        Typical Purchases    
                        <ul>
                            <li>$12 <em>"Shell"</em></li>
                            <li>$26 <em>"Before commute"</em></li>
                            <li>$14 <em>"Topped it off"</em></li>
                        </ul>
                        <div class="budget_fix">
                            $ <input id="budget_change1" placeholder="0.00" name="budget"/>
                            <a href="#" class="update1 btn btn-dark">Update budget</a>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

class Overall extends Component {
    render() {
        let budget = this.props.budget;
        let amount = this.props.amount;
        return (
            <div className="info">
                <h1>Overall Spending</h1>
                <h2>Daily Budget: ${budget}</h2>
                <h2>You have spent: ${amount.toFixed(2)}</h2>
                <h2><strong>Total: ${(budget - amount).toFixed(2)}</strong></h2>
            </div>        
        );
    }
}