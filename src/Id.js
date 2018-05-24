import React, { Component } from "react";

class Id extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return <div>{this.props.match.params.number}</div>;
  }
}
export default Id;
