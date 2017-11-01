import React, { PropTypes } from 'react'
import './VisualFocusSelector.css'

class VisualFocusSelector extends React.Component {

  selectVisualFocus = (focus) => {
    this.props.selectVisualFocus(focus);
  }

  render () {
    return(
      <div className = "control-panel-item-container"
            style = {this.props.style} >
        <div className = "control-panel-title">Visual Focus</div>
        <div className = "visual-focus-btns">
          <button onClick = {() => this.selectVisualFocus("WORDS")}
            className = {this.props.visualFocus.words ? "control-panel-btn opacity-active" : "control-panel-btn"}>Words</button>
          <button onClick = {() => this.selectVisualFocus("OPACITY")}
            className = {this.props.visualFocus.opacity ? "control-panel-btn opacity-active" : "control-panel-btn"}>Opacity</button>
          <button onClick = {() => this.selectVisualFocus("SCALE")}
            className = {this.props.visualFocus.scale ? "control-panel-btn scale-active" : "control-panel-btn"}>Scale</button>
        </div>
      </div>
    );
  }
}

export default VisualFocusSelector;
