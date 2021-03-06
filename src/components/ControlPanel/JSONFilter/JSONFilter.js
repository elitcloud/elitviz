import React, { Component } from 'react'
import Toggle from './../../common/Toggle/Toggle'
import './JSONFilter.css'

class JSONFilter extends Component {

  toggle = () => {
    this.props.filterJSON(!this.props.jsonOn);
  }

  render () {
    return(
      <div className = "control-panel-item-container"
        style = {this.props.style} >
        <div className = "control-panel-title">JSON</div>
        <Toggle on = {this.props.jsonOn} onClick = {this.toggle}/>
      </div>
    );
  }
}

export default JSONFilter;
