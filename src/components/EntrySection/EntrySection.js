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
      inputFormat: "RAW",
      model: "TWITTER",

      tokenization: true,
      segmentation: true
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  }

  getInputFormat = (state) => {
    if (state.inputFormat === "RAW") {
      return "raw";
    } else if (state.inputFormat === "LINE") {
      return "line";
    }
  }

  getSentimentModel = (state) => {
    if (state.model === "TWITTER") {
      return 'twit-att';
    } else if (state.model === "MOVIE") {
      return 'mov-att';
    }
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
        "text": this.props.currentText,
        "input_format": this.getInputFormat(this.state),
        "tokenize": this.state.tokenization,
        "segment": this.state.segmentation,
        "sentiment": this.getSentimentModel(this.state)
      };

      this.props.actions.analyzeText(dataToAnalyze);
      this.handleEntryBlur();

    } else {
      console.log("need text");
    }
  }

  //same logic for sentiment model
  toggleInputFormat = (type) => {
    this.setState({
      inputFormat: type
    });

  }

  toggleModel = (type) => {
    this.setState({
      model: type
    });

  }

  toggleTokenization = () => {

    let newFlag;

    this.state.tokenization === false ? newFlag = true: newFlag = false;

    this.setState({
      tokenization: newFlag
    }, ()=> {
      console.log(this.state);
    });
  }

  toggleSegmentation = () => {

    let newFlag;

    this.state.segmentation === false ? newFlag = true: newFlag = false;

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

    if (category === "inputFormat") {
      currentState = this.state.inputFormat;
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
                  <button onClick = {()=>this.toggleInputFormat("RAW")} className = {this.renderFlagClass("inputFormat", "RAW")}>Raw</button>
                  <button onClick={() => this.toggleInputFormat("LINE")} className={this.renderFlagClass("inputFormat", "LINE")}>LINE</button>
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
                <input className = "flag-checkbox" checked = {this.state.tokenization ? true : false} onChange = {this.toggleTokenization} type = "checkbox"></input>
              </div>

              <div className = "segmentation-section">
                <div style = {flagTitleStyle} className = "flag-title">Segmentation</div>
                  <input className = "flag-checkbox" checked = {this.state.segmentation ? true : false} onChange = {this.toggleSegmentation} type = "checkbox"></input>
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
