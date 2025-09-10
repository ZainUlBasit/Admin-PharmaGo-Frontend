import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, setValue }) => {
  return (
    <div className="h-full overflow-hidden">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Enter description..."
        className="h-fit overflow-y-auto"
      />
    </div>
  );
};

export default TextEditor;
