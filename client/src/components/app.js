import React, { Component } from "react";
import ReactEditor from "components/Editor";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt-4">
        <ReactEditor {...this.state} />
      </div>
    );
  }
}
