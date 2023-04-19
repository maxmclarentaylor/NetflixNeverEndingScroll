import { useState, useEffect, useCallback } from "react";
import { moveVideoBackwards, moveVideoForwards } from "./videoOptionsHelper";

const updateFilmSelectionThrottle = () => {
  let currentTime: number = 0;
  let currentTimeOut: ReturnType<typeof setTimeout>;
  let currentDirection = "";
  return (
    updateFilmList: () => void,
    updatelistPosition: () => void,
    direction: string,
    oppositeClose: () => void
  ) => {
    if (currentTime === 0) {
      currentTime = Date.now();
      // currentDirection = direction;
    }
    let time = Date.now();
    let timeLeft = currentTime + 1000 >= time ? currentTime + 1000 - time : -1;
    clearTimeout(currentTimeOut);
    // currentDirection !== direction
    //   ? (oppositeClose(), (currentDirection = direction))
    //   : null;
    currentTimeOut = setTimeout(() => {
      updateFilmList();
      updatelistPosition();
      currentTime = 0;
    }, timeLeft);
  };
};

const throttleScroll = updateFilmSelectionThrottle();

export const useThrottle = (
  allFilms: string[],
  clickbackwards: number,
  clickForwards: number
) => {
  const [currentFilms, updateCurrentFilms] = useState<string[]>([]);
  const [backwards, updateBackwards] = useState(false);
  const [forwards, updateForwards] = useState(false);

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
      updateBackwards(true);
      throttleScroll(
        () => updateCurrentFilms(newFilmArraybackwards()),
        () => updateBackwards(false),
        "back",
        () => updateForwards(false)
      );
    }
  }, [clickbackwards]);

  // useEffect(() => {
  //   if (clickForwards > 0) {
  //     updateForwards(true);
  //     throttleScroll(
  //       () => updateCurrentFilms(newFilmArrayForwards()),
  //       () => updateForwards(false),
  //       "forward",
  //       () => updateBackwards(false),
  //     );
  //   }
  // }, [clickForwards]);

  return {
    currentFilms,
    backwards,
    forwards,
  };
};
