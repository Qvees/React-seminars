import React, { useState } from "react";

const EditableField = ({ seminarName, onChange }) => {
  const [semiName, setSemName] = useState(seminarName);

  const handleChange = (e) => {
    setSemName(e.target.value);
    onChange(e.target.value);
  };

  return <input type="text" value={semiName} onChange={handleChange} />;
};

export default EditableField;
