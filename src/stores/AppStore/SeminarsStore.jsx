import { makeAutoObservable } from "mobx";

export const SeminarsStore = {
  seminars: [],

  // Функция для загрузки данных
  fetchSeminars() {
    fetch("http://localhost:5000/seminars")
      .then((response) => response.json())
      .then((data) => {
        this.seminars = data;
        console.log(this.seminars)
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  },


  getSeminars(){
    return this.seminars
  },

  deleteSeminar(seminarId) {
    fetch(`http://localhost:5000/seminars/${seminarId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при удалении");
        }
        this.seminars = this.seminars.filter((seminar) => seminar.id !== seminarId);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  },

// Функция редактирования семинара
editSeminar(seminarId, updatedData) {
  const existingSeminar = this.seminars.find(seminar => seminar.id === seminarId);
  if (!existingSeminar) {
    console.error("Семинар не найден");
    return;
  }

  const updatedSeminar = { ...existingSeminar, ...updatedData };

  fetch(`http://localhost:5000/seminars/${seminarId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSeminar),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при изменении");
      }
      return response.json();
    })
    .then((data) => {
      // Обновляем данные в MobX
      this.seminars = this.seminars.map((seminar) =>
        seminar.id === seminarId ? data : seminar
      );
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
},

};

makeAutoObservable(SeminarsStore); // Применяем makeAutoObservable к объекту


