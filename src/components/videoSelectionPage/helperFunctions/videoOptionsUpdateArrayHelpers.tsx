import { forwardsVariables, backwardsVariables } from "./arrayVariables";

const removeFilms = (
  value1: number,
  value2: number,
  currentFilms: string[]
) => {
  let updateArray = [...currentFilms];
  updateArray.splice(value1, value2);
  return updateArray;
};

const newArrayMoveBackwards = (
  allFilms: string[],
  key: number,
  newKeyBackPosition: number,
  removeKeyBackPosition: number,
  currentFilms: string[]
) => {
  return [
    [...allFilms].slice(
      key - newKeyBackPosition < 0 ? 0 : key - newKeyBackPosition,
      key
    ),
    ...removeFilms(removeKeyBackPosition, newKeyBackPosition, currentFilms),
  ].flat();
};

export const moveVideoBackwards = (
  allFilms: string[],
  currentFilms: string[],
  width: number
): string[] => {
  const { newKeyBackPosition, removeKeyBackPosition, correctArrayLengthBack } =
    backwardsVariables(width);

  let key = allFilms.indexOf(currentFilms[0]);

  let newArray = newArrayMoveBackwards(
    allFilms,
    key,
    newKeyBackPosition,
    removeKeyBackPosition,
    currentFilms
  );

  if (newArray.length === correctArrayLengthBack) {
    return newArray;
  }

  let number = correctArrayLengthBack - newArray.length;
  return [[...allFilms].slice(allFilms.length - number), ...newArray].flat();
};

const newArrayMoveForwards = (
  allFilms: string[],
  key: number,
  newKeyForward: number,
  removeKeyForward: number,
  currentFilms: string[]
) => {
  return [
    ...removeFilms(0, newKeyForward, currentFilms),
    [...allFilms].slice(key + 1, key + removeKeyForward),
  ].flat();
};

export const moveVideoForwards = (
  allFilms: string[],
  currentFilms: string[],
  width: number
): string[] => {
  const { newKeyForward, removeKeyForward, correctArrayLength } =
    forwardsVariables(width);

  let key = allFilms.indexOf(currentFilms[currentFilms.length - 1]);

  let newArray = newArrayMoveForwards(
    allFilms,
    key,
    newKeyForward,
    removeKeyForward,
    currentFilms
  );

  if (newArray.length === correctArrayLength) {
    return newArray;
  }

  let number = correctArrayLength - newArray.length;
  return [...newArray, [...allFilms].slice(0, number)].flat();
};

export const correctArrayLength = (width: number) => {
  let first = 0;
  let second = 0;
  let length = 0;

  if (width === 0) {
    if (window.innerWidth > 1400) (first = 7), (second = 13), (length = 6);
    if (window.innerWidth <= 1400 && window.innerWidth > 1100)
      (first = 6), (second = 11), (length = 5);
    if (window.innerWidth < 1100 && window.innerWidth >= 800)
      (first = 5), (second = 9), (length = 4);
    if (window.innerWidth < 800 && window.innerWidth >= 500)
      (first = 4), (second = 7), (length = 3);
    if (window.innerWidth < 500) (first = 3), (second = 5), (length = 2);
  }

  if (width === 6) (first = 7), (second = 13), (length = 6);
  if (width === 5) (first = 6), (second = 11), (length = 5);
  if (width === 4) (first = 5), (second = 9), (length = 4);
  if (width === 3) (first = 4), (second = 7), (length = 3);
  if (width === 2) (first = 3), (second = 5), (length = 2);

  return {
    first,
    second,
    length,
  };
};

const getArray1 = (
  allFilms: string[],
  arrayStartingPosition: number,
  length: number
): string[] => {
  let startIndex = length + 1 - arrayStartingPosition;

  return arrayStartingPosition - (length + 1) < 0
    ? [
        [...allFilms].slice(allFilms.length - startIndex),
        [...allFilms].slice(0, arrayStartingPosition),
      ].flat()
    : [...allFilms].slice(
        arrayStartingPosition - (length + 1),
        arrayStartingPosition
      );
};

const getArray2 = (
  allFilms: string[],
  arrayStartingPosition: number,
  length: number
): string[] => {
  return arrayStartingPosition + (length * 2 + 1) > allFilms.length - 1
    ? [
        [...allFilms].slice(arrayStartingPosition),
        [...allFilms].slice(
          0,
          arrayStartingPosition + (length * 2 + 1) - allFilms.length
        ),
      ].flat()
    : [...allFilms].slice(
        arrayStartingPosition,
        arrayStartingPosition + (length * 2 + 1)
      );
};

export const updateResizeArray = (
  allFilms: string[],
  first: number,
  second: number,
  currentFilms: string[],
  length: number
) => {
  let startFilm = currentFilms[(currentFilms.length - 2) / 3 + 1];
  if (startFilm === undefined) {
    return [
      [...allFilms].slice(allFilms.length - first),
      [...allFilms].slice(0, second),
    ].flat();
  }
  let arrayStartingPosition = allFilms.indexOf(startFilm);

  let array1 = getArray1(allFilms, arrayStartingPosition, length);

  let array2 = getArray2(allFilms, arrayStartingPosition, length);

  return [...array1, ...array2].flat();
};
