import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const EditableTextArea = ({ seminarText, onChange }) => {
  const [text, setText] = useState(seminarText);

  const handleChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  return (
    <TextareaAutosize
      value={text}
      minRows={3}
      maxRows={10}
      onChange={handleChange}
    />
  );
};

export default EditableTextArea;
