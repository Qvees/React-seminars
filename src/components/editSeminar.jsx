import React, { useState } from "react";
import EditableField from "../ui/editableField";
import EditableTextArea from "../ui/editableTextArea";
import { SeminarsStore } from "../stores/AppStore/SeminarsStore";

const EditSeminar = ({ seminarId, seminarName, seminarText, onEdit, onClose }) => {
  const [name, setName] = useState(seminarName);
  const [text, setText] = useState(seminarText);
  const [isOpen, setIsOpen] = useState(onEdit);

  const editInfo = () => {
    if (name !== "" && text !== "") {
      SeminarsStore.editSeminar(seminarId, { title: name, description: text });
      setIsOpen(false);
      onClose();
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    onClose();
  };

  return isOpen ? (
    <div className="popup-overlay">
      <dialog open className="popup">
        <h2>Редактирование семинара</h2>
        <EditableField seminarName={name} onChange={setName} />
        <EditableTextArea seminarText={text} onChange={setText} />
        <div className="popup-buttons">
          <button className="save-button" onClick={editInfo}>Сохранить</button>
          <button className="cancel-button" onClick={closePopup}>Отмена</button>
        </div>
      </dialog>
    </div>
  ) : null;
};

export default EditSeminar;
