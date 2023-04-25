import { useState, useEffect, useCallback, useMemo } from "react";
import {
  moveVideoBackwards,
  moveVideoForwards,
  correctArrayLength,
  updateResizeArray,
} from "../helperFunctions/videoOptionsUpdateArrayHelpers";

const updateFilmSelectionThrottle = () => {
  let currentTime: number = 0;
  let currentTimeOut: ReturnType<typeof setTimeout>;
  let previousDirection = "";
  return (
    updateStyle: () => void,
    updateFilmList: () => void,
    updatelistPosition: () => void,
    currentDirection: string,
    cleanUp: boolean,
    resizeCallBack?: (value: string) => void
  ) => {
    if (cleanUp) {
      clearTimeout(currentTimeOut);
      currentTime = 0;
      return;
    }
    if (currentDirection === "resize" && currentTime === 0) {
      return;
    }
    if (currentTime === 0) {
      currentTime = Date.now();
      previousDirection = currentDirection;
    }
    if (
      previousDirection === currentDirection ||
      currentDirection === "resize"
    ) {
      let time = Date.now();
      let timeLeft =
        currentTime + 1000 >= time ? currentTime + 1000 - time : -1;
      currentDirection === "resize" ? null : updateStyle();
      clearTimeout(currentTimeOut);
      currentTimeOut = setTimeout(() => {
        if (currentDirection === "resize") {
          resizeCallBack ? resizeCallBack(previousDirection) : null;
        } else {
          updateFilmList();
          updatelistPosition();
        }
        currentTime = 0;
      }, timeLeft);
    }
  };
};

const throttleScroll = updateFilmSelectionThrottle();

type moveOptions = {
  currentFilms: string[];
  forwards: boolean;
  moveBackwards: boolean;
};

export const useThrottle = (
  allFilms: string[],
  clickbackwards: number,
  clickForwards: number,
  width: number
): moveOptions => {
  const [currentFilms, updateCurrentFilms] = useState<string[]>([]);
  const [moveBackwards, updateBackwards] = useState<boolean>(false);
  const [forwards, updateForwards] = useState<boolean>(false);

  const newFilmArraybackwards = useCallback(
    (newWidth?: number, newCurrentFilms?: string[]) => {
      return moveVideoBackwards(
        allFilms,
        newCurrentFilms ? newCurrentFilms : currentFilms,
        newWidth ? newWidth : width
      );
    },
    [allFilms, currentFilms, width]
  );

  const newFilmArrayForwards = useCallback(
    (newWidth?: number, newCurrentFilms?: string[]) => {
      return moveVideoForwards(
        allFilms,
        newCurrentFilms ? newCurrentFilms : currentFilms,
        newWidth ? newWidth : width
      );
    },
    [allFilms, currentFilms, width]
  );

  // used to clean up the throttle
  useEffect(() => {
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
    const { first, second } = correctArrayLength(width);
    let newArray = updateResizeArray(allFilms, first, second);
    updateCurrentFilms(newArray);

    throttleScroll(
      () => {},
      () => {},
      () => {},
      "resize",
      false,
      (value: string) => {
        if (value === "back") {
          updateCurrentFilms(newFilmArraybackwards(width, newArray));
          updateBackwards(false);
        } else {
          updateCurrentFilms(newFilmArrayForwards(width, newArray));
          updateForwards(false);
        }
      }
    );
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
        () => updateCurrentFilms(newFilmArrayForwards()),
        () => updateForwards(false),
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
