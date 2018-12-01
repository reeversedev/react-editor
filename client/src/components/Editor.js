import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as ReactEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDocument, postDocument } from "../actions/index";
import { connect } from "react-redux";
import SaveButton from "./SaveButton";
import PropTypes from "prop-types";

class Editor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    data: ""
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  writeData = data => {
    this.setState({
      data: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };
  componentDidMount = async () => {
    await this.props.getDocument(
      "5c021bf2342baa6a1840f9d5",
      () => {
        this.setState({
          data: this.props.document.data
        });
      },
      e => {
        console.log("there is an error", e);
      }
    );
  };
  onKeyDown = () => {
    console.log("Key Down");
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <ReactEditor
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
          onChange={() => this.onKeyDown()}
          toolbarCustomButtons={[<CustomOption />]}
        />
        <textarea
          disabled
          value={this.state.data}
          className="wrapper-class"
          onChange={e => this.writeData(e.target.value)}
        />
      </div>
    );
  }
}
class CustomOption extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div onClick={this.addStar}>
        <button className="btn btn-primary mb-2">Save</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    document: state.document.getDocument
  };
}
export default connect(
  mapStateToProps,
  { getDocument, postDocument }
)(Editor);
