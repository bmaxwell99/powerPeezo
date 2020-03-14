import React, { Component } from 'react';

import {FormGroup, Label, Input } from 'reactstrap';
import './App.css';

export default class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      date: '',
      tag: ''
    }
    this.fieldChange = this.fieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fieldChange(elem) {
    const newState = {};
    newState[elem.currentTarget.name] = elem.currentTarget.value;
    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let formAmount = this.state.amount;
    let formTag = this.state.tag;
    let formDesc = this.state.description;
    let formDate = this.state.date;
    let formIsValid = false;
    //amount validation
    if (formAmount === '') {
      alert("Amount is a required field!")
    } else {
      //tag validation
      if (formTag === '') {
        alert("A tag is required!")
      } else {
        formIsValid = true;
      };
    }
    //date validation
    if (formIsValid) {
      if (formDate === '') {
        formDate = new Date();
      } else {
        formDate = new Date(formDate);
      };
      formDate = (formDate.getMonth() + 1) + '/' + formDate.getDate() + '/' + formDate.getFullYear();
      this.props.addEntryToMain({
        id: this.props.entries.length + 1,
        amount: formAmount,
        description: formDesc,
        date: formDate,
        tag: formTag,
        checked: false
      });
      this.setState({
        amount: '',
        description: '',
        date: '',
      })
    }
  }

  toggleModal = () => {
    this.setState({ modelOpen: false })
  }

  helpRenderTags() {
    let taglist = this.props.taglist;
    let renderedTags = taglist.map((tagString) => {
      return (
        <div key={tagString} className="form-check">
          <FormGroup className="form-check" check>
            <Label check>
              <Input className="form-check-input" type="radio" name="tag" value={tagString} onChange={this.fieldChange} /> {tagString}
            </Label>
          </FormGroup>
        </div>

      )
    });
    return renderedTags
  }

  render() {
    let renderedTags = this.helpRenderTags()
    return (
      <div>
        <section>
          <form name="myForm" is="formSubmit" onSubmit={this.handleSubmit} noValidate>
            <div className="row d-flex">

              {/* FormFields */}
              <div className="card-form bg-secondary card d-flex col-6 col-md-12 form-control-inline margin">
                <FormGroup className="form-box">
                  <Input className="form-control" type="number" name="amount" id="AmountInput" placeholder="Amount*" value={this.state.amount} onChange={this.fieldChange} />
                </FormGroup>
                <FormGroup className="form-box">
                  <Input className="form-control" type="text" name="description" id="DescInput" placeholder="Description" value={this.state.description} onChange={this.fieldChange} />
                </FormGroup>
                <FormGroup className="form-box">
                  <Input className="form-control" type="date" name="date" id="DateInput" placeholder="asd" value={this.state.date} onChange={this.fieldChange} />
                </FormGroup>
              </div>

              {/* FormRadios */}
              <div className="card-form card text-light bg-secondary d-flex border-secondary col-4 col-md-12 margin">
                <legend className="col-form-label pt-0">Tag*</legend>
                <div className="col-sm-10 form-control-inline radios">
                  {renderedTags}
                </div>
              </div>

            </div>

            {/* FormSubmit */}
            <button type="submit" className="btn btn-block btn-dark margin">Submit!</button>

          </form>
        </section>
      </div>
    )
  }
}