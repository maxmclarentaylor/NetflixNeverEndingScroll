import { useState, useEffect, useCallback, useMemo } from "react";
import {
  moveVideoBackwards,
  moveVideoForwards,
  correctArrayLength,
  updateResizeArray,
} from "../helperFunctions/videoOptionsUpdateArrayHelpers";
import {
  throttleNumberObject,
  previousDirectionThrottleType,
  timeOutType,
  IndividualFilm,
  moveOptions,
} from "../types/videoSelectionPageTypes";

const updateFilmSelectionThrottle = () => {
  let currentTime: throttleNumberObject = {};
  let currentTimeOut: timeOutType = {};
  let previousDirection: previousDirectionThrottleType = {};
  return (
    updateStyle: () => void,
    updateFilmList: () => void,
    updatelistPosition: () => void,
    currentDirection: string,
    cleanUp: boolean,
    throttleId: string,
    resizeCallBack?: (value: string) => void
  ) => {
    if (cleanUp) {
      clearTimeout(currentTimeOut[throttleId]);
      currentTime[throttleId] = 0;
      return;
    }
    if (currentDirection === "resize" && !currentTime[throttleId]) {
      return;
    }
    if (!currentTime[throttleId]) {
      currentTime[throttleId] = Date.now();
      previousDirection[throttleId] = currentDirection;
    }
    if (
      previousDirection[throttleId] === currentDirection ||
      currentDirection === "resize"
    ) {
      let time = Date.now();
      let timeLeft =
        currentTime[throttleId] + 1200 >= time
          ? currentTime[throttleId] + 1200 - time
          : -1;
      currentDirection === "resize" ? null : updateStyle();
      clearTimeout(currentTimeOut[throttleId]);
      currentTimeOut[throttleId] = setTimeout(() => {
        if (currentDirection === "resize") {
          resizeCallBack ? resizeCallBack(previousDirection[throttleId]) : null;
        } else {
          updateFilmList();
          updatelistPosition();
        }
        delete currentTime[throttleId];
      }, timeLeft);
    }
  };
};

const throttleScroll = updateFilmSelectionThrottle();

export const useThrottle = (
  allFilms: IndividualFilm[],
  clickbackwards: number,
  clickForwards: number,
  width: number,
  id: string
): moveOptions => {
  const [currentFilms, updateCurrentFilms] = useState<IndividualFilm[]>([]);
  const [moveBackwards, updateBackwards] = useState<boolean>(false);
  const [forwards, updateForwards] = useState<boolean>(false);

  const newFilmArraybackwards = useCallback(
    (newWidth?: number, newCurrentFilms?: IndividualFilm[]) => {
      return moveVideoBackwards(
        allFilms,
        newCurrentFilms ? newCurrentFilms : currentFilms,
        newWidth ? newWidth : width
      );
    },
    [allFilms, currentFilms, width]
  );

  const newFilmArrayForwards = useCallback(
    (newWidth?: number, newCurrentFilms?: IndividualFilm[]) => {
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
        true,
        id
      );
    };
  }, []);

  useEffect(() => {
    const { first, second, length } = correctArrayLength(width);
    let newArray = updateResizeArray(
      allFilms,
      first,
      second,
      currentFilms,
      length
    );
    updateCurrentFilms(newArray);

    throttleScroll(
      () => {},
      () => {},
      () => {},
      "resize",
      false,
      id,
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
        false,
        id
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
        false,
        id
      );
    }
  }, [clickForwards]);

  return {
    currentFilms,
    moveBackwards,
    forwards,
  };
};
