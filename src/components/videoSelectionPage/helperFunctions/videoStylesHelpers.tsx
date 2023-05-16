import {
  IndividualFilm,
  videoPositionViewArrayType,
} from "../types/videoSelectionPageTypes";
import styles from "../styles/offsetValues.module.scss";

const correctForwardAmount = (length: number, marginToStart: number) => {
  if (marginToStart < 1) {
    return length * 2 + 1;
  }
  return length + 1 + marginToStart;
};

const correctOffset = (
  moveBackwards: boolean,
  forwards: boolean,
  length: number,
  marginToStart: number
) => {
  return !moveBackwards && !forwards
    ? Math.round((100 / length) * (length + 1))
    : moveBackwards
    ? Math.round(100 / length)
    : Math.round((100 / length) * correctForwardAmount(length, marginToStart));
};

export const smallerArrayReturn = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[],
  length: number
) => {
  let startKey = currentFilms.length - 1 - length;
  let newArray = currentFilms.slice(startKey, currentFilms.length - 1);
  return newArray.indexOf(allFilms[0]);
};

export const correctAnimationStyle = (
  moveBackwards: boolean,
  forwards: boolean,
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[]
): number => {
  if (currentFilms.length === 20) {
    let marginToStart = smallerArrayReturn(currentFilms, allFilms, 6);
    return correctOffset(moveBackwards, forwards, 6, marginToStart);
  }
  if (currentFilms.length === 17) {
    let marginToStart = smallerArrayReturn(currentFilms, allFilms, 5);
    return correctOffset(moveBackwards, forwards, 5, marginToStart);
  }
  if (currentFilms.length === 14) {
    let marginToStart = smallerArrayReturn(currentFilms, allFilms, 4);
    return correctOffset(moveBackwards, forwards, 4, marginToStart);
  }
  if (currentFilms.length === 11) {
    let marginToStart = smallerArrayReturn(currentFilms, allFilms, 3);

    return correctOffset(moveBackwards, forwards, 3, marginToStart);
  }
  let marginToStart = smallerArrayReturn(currentFilms, allFilms, 3);

  return correctOffset(moveBackwards, forwards, 2, marginToStart);
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
  let length: number = (currentFilms.length - 2) / 3;
  let array = new Array(Math.floor(allFilms.length / length))
    .fill(1)
    .map((value, index) => index + 1);

  let key = allFilms.indexOf(currentFilms[length + 1]);
  key = key - (key % length);
  let position = Math.floor(allFilms.slice(0, key).length / length);

  return {
    array,
    position,
  };
};
