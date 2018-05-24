import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./App";
import Id from "./Id";
import { BrowserRouter as Router, Route } from "react-router-dom";

const initial = [
  {
    text: "this",
    span: true,
    delete: true,
    edit: true,
    save: false,
    undo: false,
    input: false
  },
  {
    text: "this2",
    span: true,
    delete: true,
    edit: true,
    save: false,
    undo: false,
    input: false
  }
];

function reducer1(state = initial, action) {
  switch (action.type) {
    case "DELETE_ITEM":
      state.splice(action.key, 1);
      return [...state];
    case "ADD_TRACK":
      return [
        ...state,
        {
          text: action.payload,
          span: true,
          delete: true,
          edit: true,
          save: false,
          undo: false,
          input: false
        }
      ];
    case "EDIT_TRACK":
      Object.assign(state[action.key], {
        text: state[action.key].text,
        span: false,
        delete: false,
        edit: false,
        save: true,
        undo: true,
        input: true
      });
      return [...state];
    case "UNDO_EDIT":
      Object.assign(state[action.key], {
        text: state[action.key].text,
        span: true,
        delete: true,
        edit: true,
        save: false,
        undo: false,
        input: false
      });
      return [...state];
    case "SAVE_CHANGES":
      Object.assign(state[action.key], {
        text: action.value,
        span: true,
        delete: true,
        edit: true,
        save: false,
        undo: false,
        input: false
      });
      return [...state];
    default:
      return state;
  }
}

function reducer2(state = [], action) {
  switch (action.type) {
    case "CLICK_2":
      return [...state, action.text];
    default:
      return state;
  }
}

const reducers = combineReducers({ reducer1, reducer2 });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div style={{ font: "15px/20px Arial,sans-serif" }}>
        <Route exact path="/" component={App} />
        <Route path="/id/:number" component={Id} />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
