import React, { Component } from 'react';
import './Ngram.css';

class Ngram extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHovered: false,
    };

  }

  renderColor = (weight) => {
    let color = {
      r: weight[0]*255,
      g: weight[1]*255,
      b: weight[2]*255
    };

    return color;
  }

  handle_mouse_enter = (e) => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  handle_mouse_leave = (e) => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  render () {
    //renders the style based on whether or not it's actually activated.
    let opacity;

    if(this.props.visible) {
      opacity = 1;
    } else {
      opacity = 0.1;
    }


    let color = this.renderColor(this.props.sentenceSentiment);

    let scaleFactor = this.props.weight;
    let logSentenceScale;

    if(this.props.sentenceCount < 75) {
      logSentenceScale = Math.log10(this.props.sentenceCount)*1.1;
    } else {
      logSentenceScale = Math.log10(75)*1.1;
    }

    let heightRatio = 75 * ( 1 /  logSentenceScale );
    let fontSize = scaleFactor * ( 1 / logSentenceScale );

    let baseColor = "rgba(" +
    Math.round(color.r) + "," +
    Math.round(color.g) + "," +
    Math.round(color.b) +",";


    let SCALE_ON = this.props.visualFocus.scale;
    let OPACITY_ON = this.props.visualFocus.opacity;
    let WORDS_ON = this.props.visualFocus.words;

    let containerStyle = {};
    let contentStyle = {};


    if(WORDS_ON) {

      if(OPACITY_ON) {

        //WORDS, SCALE, OPACITY
        if (SCALE_ON) {

          console.log("WORDS, SCALE, OPACITY: ", this.props.visualFocus);

            containerStyle = {
              transition: "0.2s",
              backgroundColor: baseColor + this.props.weight + ")",
              height: scaleFactor*heightRatio,
              width: scaleFactor*heightRatio,
              borderRadius: "50%",

              marginLeft: "5px",
              marginRight: "5px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              opacity: opacity
            };


            contentStyle = {
              fontSize: fontSize + "em",
              color: "white",
              backgroundColor: "transparent",
              transition: "0.2s ease-in",
              opacity: opacity
            };

        }

        //WORDS, OPACITY
        else {

          console.log("WORDS, OPACITY: ", this.props.visualFocus);

          contentStyle = {
              transition: "0.2s",
              backgroundColor: "white",
              color: baseColor + this.props.weight + "1)",
              margin: "2.5px",
              fontSize: "1.2em",
              transition: "0.2s",
              opacity: opacity
            };

        }
    }

    //
    else {

      //WORDS, SCALE
      if(SCALE_ON) {
        console.log("WORDS, SCALE: ", this.props.visualFocus);

        containerStyle = {
          transition: "0.2s",
          backgroundColor: baseColor + "1)",
          height: scaleFactor*heightRatio,
          width: scaleFactor*heightRatio,
          borderRadius: "50%",

          marginLeft: "5px",
          marginRight: "5px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: opacity
        };


        contentStyle = {
          fontSize: fontSize + "em",
          color: "white",
          backgroundColor: "transparent",
          transition: "0.2s ease-in",
          opacity: opacity
        };

      }

      //WORDS
      else {

        console.log("WORDS: ", this.props.visualFocus);

            containerStyle = {
                transition: "0.2s",
                height: "auto",
                width: "auto",
                opacity: opacity,
              };

            contentStyle = {
                backgroundColor: "transparent",
                color: baseColor + "1)",
                margin: "2.5px",
                borderRadius: "2.5px",
                fontSize: "1.2em",
                transition: "0.2s"
              };
      }

    }

  } else {


    if(OPACITY_ON) {

      //SCALE, OPACITY
      if(SCALE_ON) {

        console.log("SCALE, OPACITY: ", this.props.visualFocus);

        containerStyle = {
          transition: "0.2s",
          backgroundColor: baseColor + this.props.weight + ")",
          height: scaleFactor*heightRatio,
          width: scaleFactor*heightRatio,
          borderRadius: "50%",

          marginLeft: "5px",
          marginRight: "5px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: opacity
        };


        contentStyle = {
          transition: "0.2s",
          color: "transparent"
        };

      }

      //OPACITY
      else {
        console.log("OPACITY: ", this.props.visualFocus);

        containerStyle = {
            transition: "0.2s",
            height: "auto",
            width: "auto",
            opacity: opacity,
            transition: "0.2s"
          };

        contentStyle = {
            backgroundColor: baseColor + this.props.weight + ")",
            color: "transparent",
            margin: 0,
            borderRadius: 0,
            fontSize: "1.2em",
            transition: "0.2s"
          };
      }
    }

    else {

      //SCALE
      if(SCALE_ON) {
        console.log("SCALE: ", this.props.visualFocus);

        containerStyle = {
          transition: "0.2s",
          backgroundColor: baseColor + "1)",
          height: scaleFactor*heightRatio,
          width: scaleFactor*heightRatio,
          borderRadius: "50%",

          marginLeft: "5px",
          marginRight: "5px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: opacity
        };


        contentStyle = {
          transition: "0.2s",
          color: "transparent"
        };


      }

      //NOTHING
      //Solid blocks of color
      else {
        console.log("NOTHING: ", this.props.visualFocus);

        containerStyle = {
            transition: "0.2s",
            height: "auto",
            width: "auto",
            opacity: opacity,
            transition: "0.2s"
          };

        contentStyle = {
            backgroundColor: baseColor + "1)",
            color: "transparent",
            margin: 0,
            borderRadius: 0,
            fontSize: "1.2em",
            transition: "0.2s"
          };

      }
    }

  }


    return(
      <div className = "n_gram-container" style = {containerStyle}>
            <div
              className = {"ngram-content" + (this.state.isClicked ? " clicked" : "")}
              onClick = {this.handle_on_click}
              style = {contentStyle}
              >
              {this.props.token}
            </div>
      </div>
    );
  }
}

export default Ngram;
