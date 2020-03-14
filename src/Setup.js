import React, { Component } from 'react';
import './App.css';
import { FormGroup, Input } from 'reactstrap';

export default class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      dailyBudget: '',
      monthlyBudget: ''
    }
    this.fieldChange = this.fieldChange.bind(this);
    /*     this.handleSubmit = this.handleSubmit.bind(this); */
  }

  fieldChange(elem) {
    const newState = {};
    newState[elem.currentTarget.name] = elem.currentTarget.value;
    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let formBudget = this.state.dailyBudget;
    let formStartDate = this.state.startDate;
    if (true) {
      this.props.handleGettingStarted({
        startDate: formStartDate,
        dailyBudget: formBudget
      });
    }
  }

  render() {
    return (
      <div>
        <SetupForm
          startDate={this.state.startDate}
          dailyBudget={this.state.dailyBudget}
          monthlyBudget={this.state.monthlyBudget}
          onChange={this.state.fieldChange}
          handleGettingStarted={this.props.handleGettingStarted}
        />
      </div>
    );
  }
}

export class SetupForm extends Component {
  render() {
    return (
      <section>
        <form name="myForm" is="formSubmit" onSubmit={this.handleSubmit} noValidate>
          <div className="row d-flex">
            <div className="card-form bg-secondary card d-flex col-md-12 form-control-inline margin">
              <BudgetFields
                dailyBudget={this.props.dailyBudget}
                monthlyBudget={this.props.monthlyBudget}
                onChange={this.props.fieldChange}
                handleGettingStarted={this.props.handleGettingStarted}
              />
              <DateField
                startDate={this.props.startDate}
                onChange={this.props.fieldChange}
                handleGettingStarted={this.props.handleGettingStarted}
              />
            </div>

          </div>
          {/* FormSubmit */}
          <button type="submit" className="btn btn-block btn-dark margin">Submit!</button>

        </form>
      </section >

    )
  }
}

export class BudgetFields extends Component {
  render() {
    return (
      <>
        <FormGroup className="form-box">
          How much would like to budget...
          <Input className="form-control" type="number" name="budgetByMonth" id="budgetByMonth" placeholder="per month?" value={this.props.monthlyBudget} onChange={this.props.fieldChange} />
        </FormGroup>
        <FormGroup className="form-box">
          Or set a goal...
          <Input className="form-control" type="number" name="budgetByDay" id="budgetByDay" placeholder="per day?" value={this.props.dailyBudget} onChange={this.props.fieldChange} />
        </FormGroup>
      </>
    )
  }
}

export class DateField extends Component {
  render() {
    return (
      <>
        <FormGroup className="form-box">
          When did/do we begin?
          <Input className="form-control" type="date" name="date" id="startDate" placeholder="" value={this.props.startDate} onChange={this.props.fieldChange} />
        </FormGroup>
      </>
    )
  }
}