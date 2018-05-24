import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Baton from "./Baton";

class App extends Component {
  inpval = [];
  render() {
    const {
      data,
      deleteClick,
      editClick,
      addTrack,
      saveClick = () => {},
      undoClick = () => {}
    } = this.props;
    console.log(data);
    return (
      <div>
        <input type="text" name="newTrack" ref={el => (this.input = el)} />
        <Baton
          onClick={() => {
            addTrack(this.input.value);
            this.input.value = "";
          }}
          children="Add Track"
          display={true}
        />
        <table>
          <tbody>
            <tr>
              <td>Mission</td>
              <td>Actions</td>
            </tr>
            {data.map((i, key) => {
              return (
                <tr key={key}>
                  <td>
                    <span style={{ display: i.span ? "inline-block" : "none" }}>
                      {i.text}
                    </span>
                    <input
                      style={{
                        display: i.input ? "inline-block" : "none"
                      }}
                      type="text"
                      onChange={e => {}}
                      ref={e => (this.inpval[key] = e)}
                      defaultValue={i.text}
                    />
                  </td>
                  <td>
                    <Baton
                      onClick={() => deleteClick(key)}
                      color="rgb(252, 15, 29)"
                      children="Delete"
                      display={i.delete}
                    />
                    <Baton
                      onClick={() => editClick(key)}
                      color="rgb(252, 15, 29)"
                      children="Edit"
                      display={i.edit}
                    />
                    <Baton
                      onClick={() => {
                        saveClick(key, this.inpval[key].value);
                      }}
                      color="rgb(92, 129, 199)"
                      children="Save"
                      display={i.save}
                    />
                    <Baton
                      onClick={() => undoClick(key)}
                      color="rgb(198, 167, 169)"
                      children="Undo"
                      display={i.undo}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.reducer1
});
const mapDispatchToProps = dispatch => ({
  deleteClick: key => {
    return dispatch({
      type: "DELETE_ITEM",
      key: key
    });
  },
  addTrack: value => {
    return dispatch({
      type: "ADD_TRACK",
      payload: value
    });
  },
  editClick: key => {
    return dispatch({
      type: "EDIT_TRACK",
      key: key
    });
  },
  undoClick: key => {
    return dispatch({
      type: "UNDO_EDIT",
      key: key
    });
  },
  saveClick: (key, value) => {
    return dispatch({
      type: "SAVE_CHANGES",
      key: key,
      value: value
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
