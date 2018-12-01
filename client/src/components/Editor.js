import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as ReactEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getDocument, postDocument, saveDocument } from "../actions/index";
import { connect } from "react-redux";
import SaveButton from "./SaveButton";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Editor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    data: "",
    updatedData: ""
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  writeData = () => {
    this.setState({
      data: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      )
    });
  };
  componentDidMount = async () => {
    document.addEventListener("keydown", this.saveFunction, false);
    await this.getUpdatedDocument();
  };
  componentWillUnmount() {
    document.removeEventListener("keydown", this.saveFunction, false);
  }
  saveFunction = async event => {
    // if (event.keyCode === 27) {
    //   //Do whatever when esc is pressed
    //   console.log('papapapappapa')
    // }
    if ((event.ctrlKey || event.metaKey) && event.which == 83) {
      // Save Function
      // event.preventDefault();
      // return false;
      // console.log("That's a save button");
      await this.child.saveData();
    }
  };
  getUpdatedDocument = async () => {
    await this.props.getDocument(
      "5c021bf2342baa6a1840f9d5",
      () => {
        this.setState({
          updatedData: this.props.document.data
        });
      },
      e => {
        console.log("there is an error", e);
      }
    );
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
          onChange={() => this.writeData()}
          onKeyDown={event => this.onKeyDown(event)}
          toolbarCustomButtons={[
            <CustomOption
              {...this.state}
              {...this.props}
              updated={this.getUpdatedDocument}
              onRef={ref => (this.child = ref)}
            />
          ]}
        />

        <div dangerouslySetInnerHTML={{ __html: this.state.updatedData }} />
      </div>
    );
  }
}
class CustomOption extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  saveData = async () => {
    const data = await {
      id: "5c021bf2342baa6a1840f9d5",
      date: Date.now(),
      data: this.props.data
    };
    await this.props.saveDocument(
      data,
      () => {
        toast.success("Document is saved", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.updated();
      },
      () => {
        console.log("Error! something went wrong.");
      }
    );
  };

  render() {
    return (
      <div onClick={this.saveData}>
        <button className="btn btn-primary mb-2">Save</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    document: state.document.getDocument
  };
}
export default connect(
  mapStateToProps,
  { getDocument, postDocument, saveDocument }
)(Editor);
