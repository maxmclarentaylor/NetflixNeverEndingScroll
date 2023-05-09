import {
  IndividualFilm,
  videoPositionViewArrayType,
} from "../types/videoSelectionPageTypes";
import styles from "../styles/offsetValues.module.scss";

export const correctAnimationStyle = (
  moveBackwards: boolean,
  forwards: boolean,
  currentFilms: IndividualFilm[]
): string => {
  if (currentFilms.length === 20) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault6Items
      : moveBackwards
      ? styles.offSetBackwards6Items
      : styles.offSetForward6Items;
  }
  if (currentFilms.length === 17) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault5Items
      : moveBackwards
      ? styles.offSetBackwards5Items
      : styles.offSetForward5Items;
  }
  if (currentFilms.length === 14) {
    return !moveBackwards && !forwards
      ? styles.offSetDefaul4Items
      : moveBackwards
      ? styles.offSetBackwards4Items
      : styles.offSetForward4Items;
  }
  if (currentFilms.length === 11) {
    return !moveBackwards && !forwards
      ? styles.offSetDefault3Items
      : moveBackwards
      ? styles.offSetBackwards3Items
      : styles.offSetForward3Items;
  }
  return !moveBackwards && !forwards
    ? styles.offSetDefault2Items
    : moveBackwards
    ? styles.offSetBackwards2Items
    : styles.offSetForward2Items;
};

export const selectCarouseWidth = (currentFilms: IndividualFilm[]): string => {
  if (currentFilms.length === 20) {
    return styles.carouselItem6;
  }
  if (currentFilms.length === 17) {
    return styles.carouselItem5;
  }
  if (currentFilms.length === 14) {
    return styles.carouselItem4;
  }
  if (currentFilms.length === 11) {
    return styles.carouselItem3;
  }
  if (currentFilms.length === 8) {
    return styles.carouselItem2;
  }
  return "";
};

type positionObjectType = {
  [key: string]: number;
};

type currentLengthType = {
  [key: string]: number;
};

let currentLength: currentLengthType = {};
let positionObject: positionObjectType = {};

const lengthAndArray = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[]
) => {
  let length: number = (currentFilms.length - 2) / 3;
  let array = new Array(Math.round(allFilms.length / length))
    .fill(1)
    .map((value, index) => index + 1);

  return {
    length,
    array,
  };
};

const newArrayLength = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[],
  id: string
) => {
  const { length, array } = lengthAndArray(currentFilms, allFilms);
  let key = allFilms.indexOf(currentFilms[length + 1]);
  let position = Math.round(allFilms.slice(0, key).length / length);
  currentLength[id] = currentFilms.length;
  positionObject[id] = position;
  return {
    array,
    position,
  };
};

const updateCurrentArrayPosition = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[],
  id: string,
  forwards: boolean,
  moveBackwards: boolean
) => {
  const { array } = lengthAndArray(currentFilms, allFilms);
  if (forwards) {
    positionObject[id] + 1 > array.length - 1
      ? (positionObject[id] = 0)
      : (positionObject[id] += 1);
  } else if (moveBackwards) {
    positionObject[id] - 1 < 0
      ? (positionObject[id] = array.length - 1)
      : (positionObject[id] -= 1);
  }
  return {
    array,
    position: positionObject[id],
  };
};

export const videoPositionViewArray = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[],
  forwards: boolean,
  moveBackwards: boolean,
  id: string
): videoPositionViewArrayType => {
  if (currentFilms.length === 0) {
    return {
      array: [],
      position: 0,
    };
  }
  if (currentFilms.length !== currentLength[id]) {
    return newArrayLength(currentFilms, allFilms, id);
  } else {
    return updateCurrentArrayPosition(
      currentFilms,
      allFilms,
      id,
      forwards,
      moveBackwards
    );
  }
};
