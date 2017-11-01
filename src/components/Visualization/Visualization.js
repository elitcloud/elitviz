import React, { Component } from 'react'
import Ngram from './Ngram/Ngram'
import JSONTree from 'react-json-tree'
import './Visualization.css'

//Redux
import * as Actions from './../../actions/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Visualization extends Component {

  mapPosToWeights = (pos, sentence, request) => {
    let attention;
    if(request.sentiment === "mov-att") {
      attention = sentence["sentiment-mov-att"];
    } else if (request.sentiment === "twit-att") {
      attention = sentence["sentiment-twit-att"];
    }

    return attention[pos];
  }

  filterNGrams = (filters, maxSent, negScore, neutScore, posScore) => {

    let filterValue = true;

    if(maxSent  === negScore) {
      filters.negative ? filterValue = true : filterValue = false;

    } else if (maxSent === neutScore) {
      filters.neutral ? filterValue = true : filterValue = false;

    } else {
      filters.positive ? filterValue = true : filterValue = false;
    }

    return filterValue;
  }

  renderNgrams = (documents, selectedDocument) => {

    let currentDocument = documents[selectedDocument];

    //Guards
    if(!this.props.analyzedSuccess) {
      return [];
    }

    if(currentDocument == undefined || this.props.entryIsFocused) {
      return [];
    }

    let Ngrams = [];
    let visibleSentences = this.props.visibleSentences;

    //Sentence start/end
    let start;
    let end;

    //Calculating the start/end of the visible sentences
    if(visibleSentences.length > 0 && currentDocument.length > 1) {
      start = visibleSentences[0];
      end = visibleSentences[1] + 1;
    } else {
      start = 0;
      end = currentDocument.length;
    }

    let sentenceCount = end-start;

    //Create the ngrams in a loop based on the start/end indices.
    for(let sentenceIndex = start; sentenceIndex < end; sentenceIndex++) {

      let sentence = currentDocument[sentenceIndex];
      let sentiment;

      //GUARDS
      if(sentence === undefined) {
        return [];
      }

      if (sentence["sentiment-twit"] !== undefined ||
          sentence["sentiment-mov"] !== undefined) {

            // console.log("PROPS: ", this.props);

            if(this.props.request.sentiment === "mov-att") {
              sentiment = sentence["sentiment-mov"];
            } else if (this.props.request.sentiment === "twit-att") {
              sentiment = sentence["sentiment-twit"];
            }

      } else {
        return [];
      }

      let weights = this.mapPosToWeights(this.props.ngramPos, sentence, this.props.request);

      // console.log("WEIGHTS!!!!: ", weights);

      let isVisible;
      let filters = this.props.sentimentFilters;

      //Predominant sentiment in the sentence for filtering purposes.
      let maxSent = 0;

        for(var i = 0; i < sentiment.length; i++) {
          if (sentiment[i] > maxSent) {
            maxSent = sentiment[i];
          }
        }

        let negScore = sentiment[0];
        let neutScore = sentiment[1];
        let posScore = sentiment[2];


        for(let tokenIndex = 0; tokenIndex < weights.length; tokenIndex++) {

          isVisible = this.filterNGrams(filters, maxSent, negScore, neutScore, posScore);

          Ngrams.push(
            <Ngram
              token = {sentence.tokens[tokenIndex]}
              key = {sentence.tokens[tokenIndex] + sentenceIndex + tokenIndex}
              sentenceCount = { sentenceCount > 1 ? sentenceCount : 2}
              sentenceSentiment = {sentiment}
              weight = {weights[tokenIndex]}

              visualFocus = {this.props.visualFocus}
              visible = {isVisible}
              />
          );
        }
    }

    return Ngrams;
  }

  render () {

    let maxNodeHeight;
    let sentenceCount;

    //JSON theme
    const theme = {
      scheme: 'monokai',
      author: 'wimer hazenberg (http://www.monokai.nl)',
      base00: '#272822',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633'
    };

    //This is to help out the minheiht of the container.
    let currDoc = this.props.documents[this.props.selectedDocument];

    if(currDoc !== undefined) {
      maxNodeHeight = Math.max(...currDoc.map((sentence) => {
        return sentence.tokens.length;
      }));

      if(this.props.visibleSentences.length > 0) {
        sentenceCount = this.props.visibleSentences[1] - this.props.visibleSentences[0];
      } else {
        sentenceCount = currDoc.length;
      }
    } else {
      maxNodeHeight = 100;
      sentenceCount = 5;
    }

    let jsonContainer;
    if(this.props.jsonOn) {
      jsonContainer = (
        <div className = "json-container" style = {{flex: 1}}>
          <JSONTree data = {this.props.documents}  theme = {theme} invertTheme/>
        </div>
      )
    }

    let entryFocusStyle;
    if(this.props.entryIsFocused) {
      entryFocusStyle = {
        zIndex: -999,
        opacity: 0.2
      }
    }

    return(
      <div
        className = "visualization-container"
        style = { this.props.visualFocus.scale ? {minHeight: sentenceCount/2 * maxNodeHeight } : {} }>

        <div className = "ngrams-container" style = {entryFocusStyle}>
          { this.renderNgrams(this.props.documents, this.props.selectedDocument) }
        </div>

        {jsonContainer}

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
    sentimentFilters: state.ControlPanel.sentimentFilters,
    jsonOn: state.ControlPanel.jsonOn,
    ngramPos: state.ControlPanel.currentNgramPosition,
    visualFocus: state.ControlPanel.visualFocus,
    entryIsFocused: state.EntrySection.entryIsFocused,

    documents: state.EntrySection.documents,
    request: state.EntrySection.request,
    selectedDocument: state.ControlPanel.selectedDocument,
    visibleSentences: state.ControlPanel.visibleSentences,
    analyzedSuccess: state.EntrySection.analyzedSuccess
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
