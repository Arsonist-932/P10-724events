import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Inversion en 1 -1 pour l'affichage décroissant
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  // Création d'une variable pour récupérer la longueur du tableur focus
  const ImgSlide = data?.focus.length;

  const nextCard = () => {
    setTimeout(() => setIndex(index < ImgSlide - 1 ? index + 1 : 0), 5000);
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* Ajout de focus pour créer les btn en fonction de focus dans le JSON */}
          {byDateDesc?.map((focus, radioIdx) => (
            <input
              key={`${focus.title}`}
              type="radio"
              name="radio-button"
              // Changement idx en index & ReadOnly pour gérer l'etat
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
