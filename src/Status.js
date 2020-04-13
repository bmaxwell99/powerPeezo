import React, { Component } from 'react';
import './App.css';

export default class Status extends Component {

    render() {
      return (
        <div>
            <Brief />
            <Categories entries={this.props.entries} budget={this.props.dailyBudget} start={this.props.startDate}/>
            <Tips />
        </div>
      );
      }
}

class Brief extends Component {
    render() {
        return (
            <div className="text-center welcome">
                <h1><strong>Budgeter!</strong></h1>
                <p>Watch and finance the most common categories of expenses here. 
                Your totals will change the more you spend so spend carefully! 
                </p>
            </div>
        );
    }
}

function getTotals(entries) {
    let totals = new Map([["overall", 0.0], ["food", 0.0], ["fitness", 0.0], ["social", 0.0], ["hobbies", 0.0]]);
    entries.forEach(entry => {
        let category = entry.tag;
        totals.set(category, parseFloat(totals.get(category)) + parseFloat(entry.amount));
        totals.set("overall", parseFloat(totals.get("overall")) + parseFloat(entry.amount));
    });
    return totals;
}

class Categories extends Component {
    render() {
        let totals = getTotals(this.props.entries);
        return (
            <div>
                <div>
                    <h2 className="text-center">Overall Spending</h2>
                    <Overall amount={totals.get("overall")} budget={this.props.budget} start={this.props.start}/>
                </div>
                <div className="container">
                    <div className="row">
                        <CatCard category="Food" amount={totals.get("food")} pic="../food.png"/>
                        <CatCard category="Fitness" amount={totals.get("fitness")} pic="../fit.jpg"/>
                        <CatCard category="Social" amount={totals.get("social")} pic="../hands.png"/>
                        <CatCard category="Hobbies" amount={totals.get("hobbies")} pic="../hobby.jpg"/>
                    </div>
                </div>
            </div>
        );
    }
}

class CatCard extends Component {
    render() {
        let picDesc = "picture for " + this.props.category;
        let cat = this.props.category;
        let purch1 = "$10 Lunch";
        let purch2 = "$42 Date Night";
        let purch3 = "$7 McDonald's";
        if (cat === "Fitness") {
            purch1 = "$25 Gym Fee";
            purch2 = "$7 Workout Smoothie";
            purch3 = "$32 Supplements"
        }
         else if (cat === "Social") {
            purch1 = "$22 Drinks";
            purch2 = "$15 Movie Night";
            purch3 = "$5 Gift Card"
        }
        else {
            purch1 = "$15 Painter Canvas";
            purch2 = "$4 Another Mug";
            purch3 = "$6 Puzzle"
        }
        return (
            <div className="col-md-6 col-xl-3 d-flex">
                <div className="card mb-4 border-secondary">
                    <div className="card-body bg-secondary ">
                        <div className="text-center">
                            <h2>{this.props.category}</h2>
                            <h3 className="budg_left1 pb-3">You have spent: ${this.props.amount}</h3>
                        </div>
                        <div className="picwrap">
                            <img src={this.props.pic} alt={picDesc} className="pics"></img>
                        </div>
                        Typical Purchases
                        <ul>
                            <li>{purch1}</li>
                            <li>{purch2}</li>
                            <li>{purch3}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function daysBetween(start) {
    let present = new Date();
    let startDate = new Date(start);
    let days = (present.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return days;
}

class Overall extends Component {
    render() {
        let budget = this.props.budget;
        let amount = this.props.amount;
        let start = this.props.start;
        let daysSince = daysBetween(start).toFixed(0);
        let total = (budget * daysSince - amount).toFixed(2);
        return (
            <div>
                <Totals budget={budget} amount={amount} start={start}/>
                <Result total={total}/>
            </div>
        );
    }
}

class Totals extends Component {
    render() {
        let budget = this.props.budget;
        let amount = this.props.amount;
        let start = this.props.start;
        let daysSince = daysBetween(start).toFixed(0);
        let total = (budget * daysSince - amount).toFixed(2);
        return (
            <div className="totals-content">
                <div>
                    <img className="money" src="../dollar.jpeg" alt="dollar sign"></img>
                </div>
                <div className="total">
                    <h2>${budget}</h2>
                    <p className="label">Daily Budget</p>
                </div>
                <div className="total">
                    <h2>{daysSince}</h2>
                    <p className="label">Days Since Start</p>
                </div>
                <div className="total">
                    <h2><strong>${total}</strong></h2>
                    <p className="label"><strong>Budget - Amount</strong></p>
                </div>
                <div className="total">
                    <h2>${(budget * daysSince).toFixed(0)}</h2>
                    <p className="label">Expected Spending</p>
                </div>
                <div className="total">
                    <h2>${amount.toFixed(2)}</h2>
                    <p className="label">Money Spent</p>
                </div>
                <div>
                    <img className="money" src="../dollar.jpeg" alt="dollar sign"></img>
                </div>
            </div>
        );
    }
}

class Result extends Component {
    render() {
        let total = this.props.total;
        let mess = "You're Under-Budget!"
        let desc = "Keep doing you, and if you feel comfortable, be " +
            "sure to update your daily budget so you are only buying " +
            "what you need to guarantee financial comfort."
        if (total < 0) {
            mess = "You're Over-Budget!"
            desc = "That's not good... Make sure you are focusing on your " +
                "budget and our provided tips at the bottom of the page " +
                "for more help sticking to your goals. If you feel like " +
                "your budget is unmanageable, be sure to adjust it. "
        }
        return(
            <div className="text-center results">
                <h3>{mess}</h3>
                <p>{desc}</p>
            </div>
        );
    }
}

class Tips extends Component {
    render() {
        return(
            <div className="tips">
                <h2>Tips for the Future</h2>
                <p>Look at the above categories and see where you are struggling.
                    Then, take the advice of <em>Mint from Intuit</em> in the following to make sure you keep your 
                    budget manageable and up to date with your spending. Hover over the 
                    category of your choice.
                </p>
                <div className="tip">
                    <h3>Food</h3>
                    <div className="fooddesc desc">
                        <p>Before you figure out what you should be spending on food,
                            it’s important to figure out what you are spending on food. 
                            Keep grocery store receipts to get a realistic picture of 
                            your current spending habits. If you feel inclined, create
                            a spreadsheet to break down your spending by category, 
                            including beverages, produce, etc. Once you’ve done this,
                            you can get an idea of where to trim down spending.</p>
                        <p>Eating out is a quick and easy way to ruin your food budget.
                            If you’re actively dating or enjoy going out to eat with 
                            friends, be sure to factor restaurants into your food budget
                            — and strictly adhere to your limit. Coffee drinkers, consider
                            making your favorite concoctions at home.</p>
                    </div>
                </div>
                <div className="tip">
                    <h3 className="title">Fitness</h3>
                    <p className="fitnessdesc desc">Hover to open Fitness tips.
                        Whether your goal is to get swole or simply shed that muffin top,
                        there are more affordable options than ever when it comes to 
                        living a healthy, active lifestyle. And while running, hiking
                        or exercising on your own doesn’t cost a dime, many of us need
                        some extra motivation, instruction and equipment to get the
                        workouts we want. But, if you’re not careful, the cost of such
                        things can add up faster than Michael Phelps swims freestyle.
                        to help you get in shape without going broke, make sure to 
                        invest in only what you need to remain healthy.</p>
                </div>
                <div className="tip">
                    <h3 className="title">Social</h3>
                    <div className="socialdesc desc">
                    Some tips from Mint Inuit about being social on a budget:
                        <ol>
                            <li>Cable can be expensive, and so is purchasing a TV. 
                                Having a joint account on a streaming service like Netflix
                                or Hulu with family or friends is an inexpensive route. </li>
                            <li>When your birthday rolls around, make sure to tell your
                                family and friends to get you a present you can use for
                                anything, like an Amazon or Target gift card. </li>
                            <li>Hiking and exploring the city is a great free activity. 
                                If you look up hiking near you, chances are you’ll find a hidden gem! </li>
                        </ol>
                    </div>
                </div>
                <div className="tip">
                    <h3 className="title">Hobbies</h3>
                    <div className="hobbiesdesc desc">
                        <p>It isn’t always easy or immediately gratifying, but adopting
                            an only-if-you-have-the-cash lifestyle can save you from falling
                            into a debt trap.</p>
                        <p>If you can’t afford to buy something now, don’t reflexively pull
                            out the plastic. Instead, save up be sure that you can afford it
                            in cash — it’s a huge part of being financially independent. </p>
                        <p>The trick? Substituting imagination for money. Think about what you
                            really enjoy — then find a way to get it for less.</p>
                    </div>
                </div>
            </div>
        );
    }
}