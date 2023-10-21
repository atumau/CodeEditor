import React from "react";
import { saveAs } from "file-saver";
import clipboard from "clipboard-copy";
import beautify from "js-beautify";
import {
  AiFillCopy,
  AiFillSave,
  AiFillUnlock,
} from "react-icons/ai";
import { FaIndent } from "react-icons/fa";
import {BsFileEarmarkLock2Fill} from 'react-icons/bs'

const Editor = ({
  title,
  language,
  code,
  onChange,
  isLocked,
  onToggleLock,
}) => {
  const handleLockUnlock = () => {
    onToggleLock();
  };

  const handleCopy = () => {
    clipboard(code)
      .then(() => alert("Code copied to clipboard"))
      .catch((err) => console.error("Copy failed: ", err));
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/plain" });
    saveAs(blob, `${title.toLowerCase()}_code.txt`);
  };

  const handleIndent = () => {
    let beautifiedCode = code;
    if (language === "htmlCode") {
      beautifiedCode = beautify.html(code, { indent_size: 2 });
    } else if (language === "cssCode") {
      beautifiedCode = beautify.css(code, { indent_size: 2 });
    } else if (language === "jsCode") {
      beautifiedCode = beautify.js(code, { indent_size: 2 });
    }

    onChange(language, beautifiedCode);
  };

  return (
    <div className="code-editor">
      <h4>{title}</h4>
      <textarea
        value={code}
        onChange={(e) => onChange(language, e.target.value)}
        disabled={isLocked}
      />
      <br />
      <div className="butto" data-aos="flip-up">
        <button className="btn btn-primary" onClick={handleCopy}>
          <AiFillCopy />
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          <AiFillSave />
        </button>
        <button
          className={`btn btn-${isLocked ? "success" : "danger"}`}
          onClick={handleLockUnlock}
        >
          {isLocked ? <AiFillUnlock /> : <BsFileEarmarkLock2Fill className="ico"/>}
        </button>
        <button className="btn btn-secondary" onClick={handleIndent}>
          <FaIndent />
        </button>
      </div>
    </div>
  );
};

export default Editor;
