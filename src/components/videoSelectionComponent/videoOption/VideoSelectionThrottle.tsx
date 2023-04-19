import { useState, useEffect, useCallback } from "react";
import { moveVideoBackwards, moveVideoForwards } from "./videoOptionsHelper";

const updateFilmSelectionThrottle = () => {
  let currentTime: number = 0;
  let currentTimeOut: ReturnType<typeof setTimeout>;
  let previousDirection = "";
  return (
    updateStyle: () => void,
    updateFilmList: () => void,
    updatelistPosition: () => void,
    currentDirection: string
  ) => {
    if (currentTime === 0) {
      currentTime = Date.now();
      previousDirection = currentDirection;
    }
    if (previousDirection === currentDirection) {
      let time = Date.now();
      let timeLeft = currentTime + 900 >= time ? currentTime + 900 - time : -1;
      updateStyle();
      clearTimeout(currentTimeOut);
      currentTimeOut = setTimeout(() => {
        updateFilmList();
        updatelistPosition();
        currentTime = 0;
      }, timeLeft);
    }
  };
};

const throttleScroll = updateFilmSelectionThrottle();

export const useThrottle = (
  allFilms: string[],
  clickbackwards: number,
  clickForwards: number
) => {
  const [currentFilms, updateCurrentFilms] = useState<string[]>([]);
  const [backwards, updateBackwards] = useState<boolean>(false);
  const [forwards, updateForwards] = useState<boolean>(false);

  const newFilmArraybackwards = useCallback(() => {
    return moveVideoBackwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  const newFilmArrayForwards = useCallback(() => {
    return moveVideoForwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  useEffect(() => {
    updateCurrentFilms([...allFilms].slice(0, 17));
  }, []);

  useEffect(() => {
    if (clickbackwards > 0) {
      throttleScroll(
        () => {
          updateBackwards(true);
          updateForwards(false);
        },
        () => updateCurrentFilms(newFilmArraybackwards()),
        () => updateBackwards(false),
        "back"
      );
    }
  }, [clickbackwards]);

  useEffect(() => {
    if (clickForwards > 0) {
      throttleScroll(
        () => {
          updateForwards(true);
          updateBackwards(false);
        },
        () => updateCurrentFilms(newFilmArrayForwards()),
        () => updateForwards(false),
        "forward"
      );
    }
  }, [clickForwards]);

  return {
    currentFilms,
    backwards,
    forwards,
  };
};
