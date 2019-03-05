import React, { Component } from "react";
import FormGroup from "./FormGroup"
import ReactToolTip from "react-tooltip";

class FormTextArea extends React.Component {
    shouldDisplayError = () => {
      return this.props.showError && this.props.errorText !== ""
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.showFocus) {
        this.nameInput.focus()
      }
    }
    render() {
      return (
        <div>
          <FormGroup
            id={this.props.Id + "-group"}
            errorText={this.props.errorText}
          >
            <label data-tip={this.props.description}  htmlFor={this.props.Id}>
              {this.props.label}
            </label>
            <ReactToolTip />
            <textarea
              id={this.props.Id}
              className={this.shouldDisplayError() ? "form-control is-invalid" : "form-control"}
              placeholder={this.props.placeholder}
              rows={this.props.rows} 
              value={this.props.value}
              onChange={this.props.onChange}
              ref={input => {
                this.nameInput = input
              }}
              tabIndex={this.props.tabIndex}
              autoFocus={this.props.autoFocus}
            ></textarea>
          </FormGroup>
        </div>
      )
    }
  }

  export default FormTextArea