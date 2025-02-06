import React, { useState } from "react";
import { SeminarsStore } from "../stores/AppStore/SeminarsStore";
import EditSeminar from "./editSeminar";

const PopupSeminar = ({ seminarId, onClose, seminarName, seminarText }) => {
  const [edit, setEdit] = useState(false);

  const handleDelete = () => {
    SeminarsStore.deleteSeminar(seminarId);
    onClose();
  };

  const openEditDialog = () => {
    setEdit(true);
  };

  return (
    <>
      {!edit ? (
        <div className="popup-overlay" onClick={onClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={onClose}>✖</button>
            <h2>{seminarName}</h2>
            <div>
              <button onClick={openEditDialog}>Редактировать</button>
              <button onClick={handleDelete}>Удалить</button>
            </div>
          </div>
        </div>
      ) : (
        <EditSeminar
          seminarId={seminarId}
          seminarName={seminarName}
          seminarText={seminarText}
          onEdit={edit}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default PopupSeminar;
