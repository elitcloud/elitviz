import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Toggle from './../common/Toggle/Toggle'
import './EntrySection.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


//Make FlagButton component
class FlagButton extends Component {
  render () {
    return(
      <div></div>
    )
  }
}

class EntrySection extends Component {
  constructor(props){
    super(props);
    this.state = {
      focused: false,

      //Flags for axios
      input: "RAW",
      model: "TWITTER",

      tokenization: 1,
      segmentation: 1
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  }

  mapStateToFlag = (state) => {
    let flag;
    let first;
    let second;
    let third;
    let fourth;

    if(state.input === "RAW"){
      first = 0;
    } else if (state.input === "LIVE") {
      first = 1;
    }

    if(state.tokenization === 0) {
      second = 0;
    } else if (state.tokenization === 1) {
      second = 1;
    }

    if(state.segmentation === 0) {
      third = 0;
    } else if (state.segmentation === 1) {
      third = 1;
    }

    if (state.model === "TWITTER") {
      fourth = 3;
    } else if(state.model === "MOVIE") {
      fourth = 4;
    }

    flag = "" + first + second + third + fourth;

    return flag;
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }


  editText = (e) => {
    this.props.actions.editText(e.target.value);
  }

  analyzeText = () => {
    if(this.props.currentText !== "") {

      let dataToAnalyze = {
        "input": this.props.currentText,
        "flag": this.mapStateToFlag(this.state)
      };

      this.props.actions.analyzeText(dataToAnalyze);
      this.handleEntryBlur();

    } else {
      console.log("need text");
    }
  }

  //same logic for sentiment model
  toggleInput = (type) => {

    this.setState({
      input: type
    });

  }

  toggleModel = (type) => {

    this.setState({
      model: type
    });

  }

  toggleTokenization = () => {
    let newFlag;

    this.state.tokenization === 0 ? newFlag = 1: newFlag = 0;

    this.setState({
      tokenization: newFlag
    }, ()=> {
      console.log(this.state);
    });
  }

  toggleSegmentation = () => {
    let newFlag;

    this.state.segmentation === 0 ? newFlag = 1: newFlag = 0;

    this.setState({
      segmentation: newFlag
    }, ()=> {
      console.log(this.state);
    });
  }




  handleEntryFocus = () => {
    //only if the text area is focused…add local state
    this.props.actions.handleEntryFocus(true)
  }

  handleEntryBlur = () => {
    this.props.actions.handleEntryFocus(false)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        if(this.props.entryIsFocused) {
          this.handleEntryBlur();
        }
      }
  }

  renderFlagClass = (category, buttonType) => {

    let currentState;

    if(category === "input") {
      currentState = this.state.input;
    } else {
      currentState = this.state.model;
    }

    let className = (currentState === buttonType) ? "flag-btn active" : this.renderPassiveClassName();
    return className;
  }

  renderPassiveClassName = () => {
    let className;

    if(this.props.entryIsFocused) {
      className = "flag-btn entry-focused";
    } else {
      className = "flag-btn";
    }

    return className;
  }

  render() {

    let entryStyle = {};
    let textAreaStyle = {};
    let buttonStyle = {};
    let flagStyle = {};
    let flagTitleStyle = {};

    if(this.props.entryIsFocused) {

      entryStyle = {
        zIndex: 999,
        flexDirection: "column",
      };

      textAreaStyle = {
        minHeight: "40vh",
        width: "75vw",
        maxWidth: "1000px",
        marginBottom: "20px"
      }

      buttonStyle = {
        backgroundColor: "lightblue",
        color: "white",
        fontSize: "0.75em",
        // marginTop: "25px",
        maxWidth: "100%",
        minHeight: "50px",
        width: "25%"
      }

      flagStyle = {
        backgroundColor: "white"
      }

      flagTitleStyle = {
        color: "white"
      }
    }

    if(this.props.currentText === "") {
      buttonStyle.opacity = "0.5";
      buttonStyle.backgroundColor = "lightgrey";
      buttonStyle.border = "none";
      buttonStyle.color = "white";
      buttonStyle.userSelect = "none";
    }

    return(
      <div className = "entry-section-container"
        style = {entryStyle}
        ref={this.setWrapperRef}>

          <textarea
            value = {this.props.currentText}
            onChange = {this.editText}
            style = {textAreaStyle}
            onFocus = {this.handleEntryFocus}
            className = "entry-textarea"
            placeholder = "Enter any text to analyze its sentiment.">
          </textarea>

          <div className = "input-options">

            <div className = "input-options-top">
              <div className = "input-format-section">
                <div style = {flagTitleStyle} className = "flag-title">Input format</div>
                <div style = {{display: "flex", flexDirection: "row"}}>
                  <button onClick = {()=>this.toggleInput("RAW")} className = {this.renderFlagClass("input", "RAW")}>Raw</button>
                  <button onClick = {()=>this.toggleInput("LIVE")} className = {this.renderFlagClass("input", "LIVE")}>Live</button>
                </div>
              </div>

              <div className = "sentiment-model-section">
                <div style = {flagTitleStyle} className = "flag-title">Sentiment model</div>
                <div style = {{display: "flex", flexDirection: "row"}}>
                  <button onClick = {()=>this.toggleModel("TWITTER")} className = {this.renderFlagClass("model", "TWITTER")}>Twitter</button>
                  <button onClick = {()=>this.toggleModel("MOVIE")} className = {this.renderFlagClass("model", "MOVIE")}>Movie</button>
                </div>
              </div>
            </div>


            <div className = "input-options-bottom">
              <div className = "tokenization-section">
                <div style = {flagTitleStyle} className = "flag-title">Tokenization</div>
                <input className = "flag-checkbox" checked = {this.state.tokenization === 1 ? true : false} onChange = {this.toggleTokenization} type = "checkbox"></input>
              </div>

              <div className = "segmentation-section">
                <div style = {flagTitleStyle} className = "flag-title">Segmentation</div>
                  <input className = "flag-checkbox" checked = {this.state.segmentation === 1 ? true : false} onChange = {this.toggleSegmentation} type = "checkbox"></input>
              </div>
            </div>

            <button style = {buttonStyle} onClick = {this.analyzeText} className = "analyze-text-btn">Analyze</button>

          </div>


      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    analyzedText: state.EntrySection.analyzedText,
    currentText: state.EntrySection.currentText,
    currentNgram: state.ControlPanel.currentNgram,
    phraseData: state.EntrySection.phrase,
    entryIsFocused: state.EntrySection.entryIsFocused
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(EntrySection)
