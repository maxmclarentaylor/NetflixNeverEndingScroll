import {
  IndividualFilm,
  videoPositionViewArrayType,
} from "../types/videoSelectionPageTypes";
import styles from "../styles/offsetValues.module.scss";

const correctOffset = (
  moveBackwards: boolean,
  forwards: boolean,
  length: number
) => {
  return !moveBackwards && !forwards
    ? Math.round((100 / length) * (length + 1))
    : moveBackwards
    ? Math.round(100 / length)
    : Math.round((100 / length) * (length * 2 + 1));
};

export const correctAnimationStyle = (
  moveBackwards: boolean,
  forwards: boolean,
  currentFilms: IndividualFilm[]
): number => {
  if (currentFilms.length === 20) {
    return correctOffset(moveBackwards, forwards, 6);
  }
  if (currentFilms.length === 17) {
    return correctOffset(moveBackwards, forwards, 5);
  }
  if (currentFilms.length === 14) {
    return correctOffset(moveBackwards, forwards, 4);
  }
  if (currentFilms.length === 11) {
    return correctOffset(moveBackwards, forwards, 3);
  }
  return correctOffset(moveBackwards, forwards, 2);
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

export const videoPositionViewArray = (
  currentFilms: IndividualFilm[],
  allFilms: IndividualFilm[]
): videoPositionViewArrayType => {
  if (currentFilms.length === 0) {
    return {
      array: [],
      position: 0,
    };
  }
  let length: number = (currentFilms.length - 2) / 3;
  let array = new Array(Math.round(allFilms.length / length))
    .fill(1)
    .map((value, index) => index + 1);

  let key = allFilms.indexOf(currentFilms[length + 1]);
  key = key - (key % length) + 1;
  let position = Math.floor(allFilms.slice(0, key).length / length);

  // if (position < 1) {
  //   position = 0;
  //   console.log("test 1" + " " + position);
  // } else {
  //   let test = Math.round(position);
  //   if (test > array.length - 1) {
  //     console.log(test)
  //     position = Math.floor(position);
  //     console.log("test 2" + " " + position);
  //   } else {
  //     position = test;
  //     console.log("test 3" + " " + position);
  //   }
  // }

  return {
    array,
    position,
  };
};
