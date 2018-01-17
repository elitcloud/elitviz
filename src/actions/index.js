import * as types from './ActionTypes'
import rp from 'request-promise'

const API_URL = "https://api.elit.cloud/public/decode/";

/****TEXT ENTRY FUNCTIONS****/
export function editText(data){
  return {
    type: types.EDIT_TEXT,
    payload: data
  }
}

//Called when analyzing any piece of text.
export function analyzeText(data){

  return (dispatch) => {

    var options = {
      method: 'POST',
      uri: API_URL,
      form: data,
      headers: {
        'Content-Type': 'application/json',
      },
      resolveWithFullResponse: true
    };

    //In progress
    dispatch(analyzeInProgress());

    return rp(options)
      .then(function (b) {

        let docs = b.body;

        //Send the request body to analyze success
        dispatch(analyzeTextSuccess(docs, data))

      })
      .catch(function (error) {

        console.log("ERROR: ", error);
        dispatch(analyzeTextFailure());
      });
    }
}

export function analyzeInProgress() {
  return {
    type: types.ANALYZE_IN_PROGRESS
  }
}

// CALLED ONCE THE API RETURNS SUCCESSFULLY
export function analyzeTextSuccess(data, request) {
  console.log("success!");

  return {
    type: types.ANALYZE_TEXT_SUCCESS,
    payload: data,
    request: request
  }
}

export function analyzeTextFailure() {
  return {
    type: types.ANALYZE_TEXT_FAILURE
  }
}

export function handleEntryFocus(data) {
  return {
    type: types.HANDLE_ENTRY_FOCUS,
    payload: data
  }
}

/********************************/
/********************************/
/********************************/

/****CONTROL PANEL FUNCTIONS****/
export function selectVisualFocus(data) {
  return {
    type: types.SELECT_VISUAL_FOCUS,
    payload: data
  }
}
export function selectNgramPosition(data) {
  return {
    type: types.SELECT_NGRAM_POSITION,
    payload: data
  }
}

export function filterSentiment(data) {
  return {
    type: types.FILTER_SENTIMENT,
    payload: data
  }
}

export function filterJSON(data) {
  return {
    type: types.FILTER_JSON,
    payload: data
  }
}


export function filterSentences(data) {
  return {
    type: types.FILTER_SENTENCES,
    payload: data
  }
}

export function selectDocument(data) {
  return {
    type: types.SELECT_DOCUMENT,
    payload: data
  }
}

/********************************/
/********************************/
/********************************/

/****VISUALIZATION FUNCTIONS****/
export function setPerspective(data) {
  return {
    type: types.SET_PERSPECTIVE,
    payload: data
  }
}

export function setHoveredSection(data) {
  return {
    type: types.SET_HOVERED_SECTION,
    payload: data
  }
}
