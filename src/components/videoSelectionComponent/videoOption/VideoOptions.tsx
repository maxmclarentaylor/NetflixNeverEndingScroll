import { useState, useEffect, useRef, useCallback, memo } from "react";
import styles from "./videoOption.module.scss";
import { useThrottle } from "./VideoSelectionThrottle";
import { v4 as uuidv4 } from "uuid";

export const VideoOption = memo(function VideoOption() {
  const [allFilms, updateFilms] = useState<string[]>([
    "Star Wars",
    "Boogie Nights",
    "Gladiator",
    "The Dirt",
    "Lord of The Rings",
    "Drive",
    "GoldenEye",
    "Street Fighter",
    "The Bronx",
    "Rush Hour",
    "Shutter Island",
    "The run",
    "Get out",
    "Indiana Jones",
    "Safe",
    "The great escape",
    "John Wick",
    "Casablanca",
    "bRAVEHEART",
    "i a wonderful lofe",
    "ET",
    "Jaws",
    "Saving private ryan",
    "Jurrasic Park",
    "The whale",
  ]);

  const [clickbackwards, updateClickbackwards] = useState(0);
  const [clickForwards, updateClickForwardss] = useState(0);

  const { currentFilms, backwards, forwards } = useThrottle(
    allFilms,
    clickbackwards,
    clickForwards
  );

  return (
    <div>
      <div
        onClick={() => {
          updateClickbackwards(clickbackwards + 1);
        }}
      >
        back
      </div>
      <div
        style={{ marginTop: "5rem" }}
        onClick={() => {
          updateClickForwardss(clickForwards + 1);
        }}
      >
        forwards
      </div>
      <div className={`${styles.headWrap}`}>
        <div
          className={`${
            !backwards && !forwards
              ? styles.offSet
              : backwards
              ? styles.offSetTrue
              : styles.offSetForward
          } ${styles.wrapperItem} ${
            backwards || forwards ? styles.animation : ""
          }`}
        >
          {currentFilms.map((value) => {
            return (
              <div key={value} className={styles.carouselItem}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
