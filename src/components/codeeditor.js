import React, { Component } from "react";
import "./style/codeeditor.css";
import Editor from "./editor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlCode: "",
      cssCode: "",
      jsCode: "",
      isLocked: false,
    };
    this.outputIframe = React.createRef();
  }

  handleCodeChange = (language, code) => {
    this.setState({ [language]: code });
  };

  handleRunCode = () => {
    if (!this.state.isLocked) {
      const { htmlCode, cssCode, jsCode } = this.state;
      const iframe = this.outputIframe.current.contentWindow.document;

      iframe.open();
      iframe.write(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `);
      iframe.close();
    }
  };

  handleToggleLock = () => {
    this.setState((prevState) => ({
      isLocked: !prevState.isLocked,
    }));
  };

  render() {
    return (
      <div className="container-fluid body">
        <div className="header">
          <img src="logo1.gif" className="logo" alt="logo" />
          <h2 className="head">
            Code
            <span>
              <img
                src="brand.png"
                className="brand "
                data-aos="flip-up"
                alt="brand"
              />
            </span>
          </h2>
        </div>

        <div className="row">
          <div className="col-md-4 text-center">
            <Editor
              title="HTML"
              language="htmlCode"
              code={this.state.htmlCode}
              onChange={this.handleCodeChange}
              isLocked={this.state.isLocked}
              onToggleLock={this.handleToggleLock}
            />
          </div>
          <div className="col-md-4 text-center">
            <Editor
              title="CSS"
              language="cssCode"
              code={this.state.cssCode}
              onChange={this.handleCodeChange}
              isLocked={this.state.isLocked}
              onToggleLock={this.handleToggleLock}
            />
          </div>
          <div className="col-md-4 text-center">
            <Editor
              title="JavaScript"
              language="jsCode"
              code={this.state.jsCode}
              onChange={this.handleCodeChange}
              isLocked={this.state.isLocked}
              onToggleLock={this.handleToggleLock}
            />
          </div>
        </div>
        <hr className="line"></hr>
        <div className="run mb-3">
          <button
            className="run-button"
            data-aos="zoom-in"
            onClick={this.handleRunCode}
          >
            Run
          </button>
        </div>
        <hr className="line1"></hr>
        <div className="row">
          <div className="col-md-12">
            <div className="output-container">
              <h3 className="text-center">Output</h3>
              <iframe
                ref={this.outputIframe}
                title="Output"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
