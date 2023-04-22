import { useState, useEffect, useCallback } from "react";
import {
  moveVideoBackwards,
  moveVideoForwards,
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



type moveOptions = {
  currentFilms: string[],
  forwards: boolean,
  moveBackwards: boolean
}

export const useThrottle = (
  allFilms: string[],
  clickbackwards: number,
  clickForwards: number,
  width: number
): moveOptions => {
  const [currentFilms, updateCurrentFilms] = useState<string[]>([]);
  const [moveBackwards, updateBackwards] = useState<boolean>(false);
  const [forwards, updateForwards] = useState<boolean>(false);

  const newFilmArraybackwards = useCallback(() => {
    return moveVideoBackwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  const newFilmArrayForwards = useCallback(() => {
    return moveVideoForwards(allFilms, currentFilms);
  }, [allFilms, currentFilms]);

  useEffect(() => {
    if(width === 0) {
      if(window.innerWidth <= 1400 && window.innerWidth > 1100) width = 5
      // if(window.innerWidth <= 1100 && window.innerWidth > 800) width = 4
      // if(window.innerWidth <= 1400) width = 5
      // if(window.innerWidth <= 1400) width = 5
      if(window.innerWidth > 1400) width = 6
    }
    let first = width === 5 ? 19 : 18
    let second = width === 5 ? 11 : 13
    updateCurrentFilms([[...allFilms].slice(first),[...allFilms].slice(0, second)].flat());
    return () => {
      throttleScroll(
        () => {},
        () => {},
        () => {},
        "",
        true
      );
    };
  }, [width]);

  useEffect(() => {
    if (clickbackwards > 0) {
      throttleScroll(
        () => {
          updateBackwards(true);
          updateForwards(false);
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
          updateForwards(true);
          updateBackwards(false);
        },
        () =>
          updateCurrentFilms(
         newFilmArrayForwards()
          ),
        () =>
          updateForwards(false),
        "forward",
        false
      );
    }
  }, [clickForwards]);

  return {
    currentFilms,
    moveBackwards,
    forwards,
  };
};
