import React, { Component } from 'react';
import './App.css';
import { FormGroup } from 'reactstrap';

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      currentStartDate: '',
      dailyBudget: '',
      monthlyBudget: '',
      lastChanged: ''
    }
    this.fieldChange = this.fieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dailyBudgetChange = this.dailyBudgetChange.bind(this);
    this.monthlyBudgetChange = this.monthlyBudgetChange.bind(this);
  }

    componentDidMount() {
      this.setState({ currentStartDate: this.props.startDate});
  };

  fieldChange(event) {
    const newState = {};
    newState[event.currentTarget.name] = event.currentTarget.value;
    this.setState(newState);
  }

  monthlyBudgetChange(event) {
    this.setState({ monthlyBudget: event.currentTarget.value, dailyBudget: (event.currentTarget.value / 30).toFixed(2) });
  }
  dailyBudgetChange(event) {
    this.setState({ dailyBudget: event.currentTarget.value, monthlyBudget: event.currentTarget.value * 30 });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let formBudget = this.state.dailyBudget;
    let formStartDate = this.state.startDate;
    /* let currentStartDate = this.state.currentStartDate; */
    
    let formIsValid = false;
    //amount validation
    if (formBudget === '') {
      alert("A budget of some kind is needed!")
    } else {
      //tag validation
      if (formStartDate === '') {
        alert("A start date of some kind is needed!")
       /*  if (currentStartDate === '') {
          alert("A start date of some kind is needed!")
        } else {
         
          formStartDate = currentStartDate;
         
        } */
      } else {
        formIsValid = true;
      };
    }
    if (formIsValid) {

      formStartDate = formStartDate.slice(5,7)  + '/' + formStartDate.slice(8,10) + '/' + formStartDate.slice(0,4);

      this.props.handleGettingStarted({
        startDate: formStartDate,
        dailyBudget: formBudget
      });
    }
  }

  changeLastChange(name) {
    this.setState({ lastChanged: name });
  }

  render() {

    return (
      <div>
        <SetupForm
          startDate={this.state.startDate}
          dailyBudget={this.state.dailyBudget}
          monthlyBudget={this.state.monthlyBudget}
          onChange={this.fieldChange}
          handleGettingStarted={this.props.handleGettingStarted}
          dailyBudgetChange={this.dailyBudgetChange}
          monthlyBudgetChange={this.monthlyBudgetChange}
          handleSubmit={this.handleSubmit}
          currentDailyBudget={this.props.dailyBudget}
          currentStartDate={this.props.startDate}
        />
      </div>
    );
  }
}

function SetupForm(props) {

  return (
    <section>
      <form name="myForm" is="formSubmit" onSubmit={props.handleSubmit} noValidate>
        <div className="row d-flex">
          <div className="card-form bg-secondary card d-flex col-md-12 form-control-inline margin">
            <BudgetFields
              dailyBudget={props.dailyBudget}
              monthlyBudget={props.monthlyBudget}
              dailyBudgetChange={props.dailyBudgetChange}
              monthlyBudgetChange={props.monthlyBudgetChange}
              handleGettingStarted={props.handleGettingStarted}
              currentDailyBudget={props.currentDailyBudget}
            />
            <DateField
              startDate={props.startDate}
              onChange={props.onChange}
              handleGettingStarted={props.handleGettingStarted}
              currentStartDate={props.currentStartDate}
            />
          </div>

        </div>
        {/* FormSubmit */}
        <button type="submit" className="btn btn-block btn-dark margin">Update!</button>

      </form>
    </section >

  )

}





function MonthlyBudget(props) {
  return (
    <>
      <FormGroup className="form-box">
        Your current budget per month is: {props.currentMonthlyBudget}
        <input className="form-control" type="number" name="monthlyBudget" id="budgetByMonth" placeholder="change monthly budget?"
          value={props.monthlyBudget}
          onChange={props.onChange} />
      </FormGroup>
    </>
  )
}

function DailyBudget(props) {
  return (
    <>
      <FormGroup className="form-box">
        Your current budget per day is: {props.currentDailyBudget}
        <input className="form-control" type="number" name="dailyBudget" id="budgetByDay" placeholder="change daily budget??"
          value={props.dailyBudget}
          onChange={props.onChange} />
      </FormGroup>
    </>
  )
}

function BudgetFields(props) {

  return (
    <>
      <MonthlyBudget
        monthlyBudget={props.monthlyBudget}
        onChange={props.monthlyBudgetChange}
        currentMonthlyBudget={props.currentDailyBudget * 30}
      />
      <DailyBudget
        dailyBudget={props.dailyBudget}
        onChange={props.dailyBudgetChange}
        currentDailyBudget={props.currentDailyBudget}
      />
    </>
  )
}



function DateField(props) {
  return (
    <>
      <FormGroup className="form-box">
        You started on: {props.currentStartDate}
        <input className="form-control" type="date" name="startDate" id="startDate" placeholder="" value={props.startDate} onChange={props.onChange} />
      </FormGroup>
    </>
  )
}