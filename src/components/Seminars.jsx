import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSeminarsStore } from "../stores/AppStore/AppStoreProvider";
import PopupSeminar from "./popupSeminar";

const SeminarsList = observer(() => {
  const seminarsStore = useSeminarsStore();
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [seminarName, setSeminarName] = useState(null);
  const [seminarText, setSeminarText] = useState(null);

  const handleSeminarClick = (seminarId, seminarName, seminarText) => {
    setSelectedSeminar(seminarId);
    setSeminarName(seminarName);
    setSeminarText(seminarText);
  };

  const closePopup = () => {
    setSelectedSeminar(null);
  };

  return (
    <div className="seminars-container">
      <h1 className="seminars-title">Список семинаров</h1>
      <div className="seminars-item-container">
        {seminarsStore.getSeminars().map((seminar) => (
          <div
            className="seminars-item"
            key={seminar.id}
            onClick={() => handleSeminarClick(seminar.id, seminar.title, seminar.description)}
            style={{ backgroundImage: `url(${seminar.photo})` }}
          >
            <div>
              <p className="seminar-name">{seminar.title}</p>
              <p className="seminar-description">{seminar.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedSeminar && (
        <PopupSeminar seminarId={selectedSeminar} onClose={closePopup} seminarName={seminarName} seminarText={seminarText} />
      )}
    </div>
  );
});

export default SeminarsList;