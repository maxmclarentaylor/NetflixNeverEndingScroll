import { useState, useEffect, useCallback } from "react";
import {
  moveVideoBackwards,
  moveVideoForwards,
  moveVideoFirstClick,
} from "../helperFunctions/videoOptionsHelper";

const updateFilmSelectionThrottle = () => {
  let currentTime: number = 0;
  let currentTimeOut: ReturnType<typeof setTimeout>;
  let previousDirection = "";
  return (
    updateStyle: () => void,
    updateFilmList: () => void,
    updatelistPosition: () => void,
    currentDirection: string,
    cleanUp: boolean
  ) => {
    if (cleanUp) {
      clearTimeout(currentTimeOut);
      return;
    }
    if (currentTime === 0) {
      currentTime = Date.now();
      previousDirection = currentDirection;
    }
    if (previousDirection === currentDirection) {
      let time = Date.now();
      let timeLeft =
        currentTime + 1000 >= time ? currentTime + 1000 - time : -1;
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

type Forwards = {
  forwards: boolean;
  firstFilmList: boolean;
  throttleClick: boolean;
};

export const useThrottle = (
  allFilms: string[],
  clickbackwards: number,
  clickForwards: number
) => {
  const [currentFilms, updateCurrentFilms] = useState<string[]>([]);
  const [backwards, updateBackwards] = useState<boolean>(false);
  const [forwards, updateForwards] = useState<Forwards>({
    forwards: false,
    firstFilmList: true,
    throttleClick: true,
  });

  const newFilmArraybackwards = useCallback(() => {
    return moveVideoBackwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  const newFilmArrayForwards = useCallback(() => {
    return moveVideoForwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  const newFilmArrayFirstClick = useCallback(() => {
    return moveVideoFirstClick(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  useEffect(() => {
    updateCurrentFilms([...allFilms].slice(0, 16));
    return () => {
      throttleScroll(
        () => {},
        () => {},
        () => {},
        "",
        true
      );
    };
  }, []);

  useEffect(() => {
    if (clickbackwards > 0) {
      throttleScroll(
        () => {
          updateBackwards(true);
          updateForwards({
            forwards: false,
            firstFilmList: false,
            throttleClick: false,
          });
        },
        () => updateCurrentFilms(newFilmArraybackwards()),
        () => updateBackwards(false),
        "back",
        false
      );
    }
  }, [clickbackwards]);

  useEffect(() => {
    if (clickForwards > 0) {
      throttleScroll(
        () => {
          updateForwards({
            forwards: true,
            firstFilmList: false,
            throttleClick : clickForwards === 1 ? true : false
          });
          updateBackwards(false);
        },
        () =>
          updateCurrentFilms(
            clickForwards === 1
              ? newFilmArrayFirstClick()
              : newFilmArrayForwards()
          ),
        () =>
          updateForwards({
            forwards: false,
            firstFilmList: false,
            throttleClick : false
          }),
        clickForwards === 1 ? "first" : "forward",
        false
      );
    }
  }, [clickForwards]);

  return {
    currentFilms,
    backwards,
    forwards,
  };
};
