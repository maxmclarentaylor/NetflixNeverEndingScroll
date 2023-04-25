import {
  forwardsVariables,
  backwardsVariables,
} from "./arrayVariables";


const removeFilms = (
  value1: number,
  value2: number,
  currentFilms: string[]
) => {
  let updateArray = [...currentFilms];
  updateArray.splice(value1, value2);
  return updateArray;
};

export const moveVideoBackwards = (
  allFilms: string[],
  currentFilms: string[],
  width: number
): string[] => {
  const { newKeyBackPosition, removeKeyBackPosition, correctArrayLengthBack } =
    backwardsVariables(width);
  let key = allFilms.indexOf(currentFilms[0]);
  let newArray = [
    [...allFilms].slice(
      key - newKeyBackPosition < 0 ? 0 : key - newKeyBackPosition,
      key
    ),
    ...removeFilms(removeKeyBackPosition, newKeyBackPosition, currentFilms),
  ].flat();

  if (newArray.length === correctArrayLengthBack) {
    return newArray;
  }

  let number = correctArrayLengthBack - newArray.length;
  return [[...allFilms].slice(allFilms.length - number), ...newArray].flat();
};

export const moveVideoForwards = (
  allFilms: string[],
  currentFilms: string[],
  width: number
): string[] => {
  const { newKeyForward, removeKeyForward, correctArrayLength } =
    forwardsVariables(width);
  let key = allFilms.indexOf(currentFilms[currentFilms.length - 1]);
  let newArray = [
    ...removeFilms(0, newKeyForward, currentFilms),
    [...allFilms].slice(key + 1, key + removeKeyForward),
  ].flat();

  if (newArray.length === correctArrayLength) {
    return newArray;
  }

  let number = correctArrayLength - newArray.length;
  return [...newArray, [...allFilms].slice(0, number)].flat();
};

export const correctArrayLength = (width: number) => {
  let first = 0;
  let second = 0;

  if (width === 0) {
    if (window.innerWidth > 1400) (first = 7), (second = 13);
    if (window.innerWidth <= 1400 && window.innerWidth > 1100)
      (first = 6), (second = 11);
    if (window.innerWidth < 1100 && window.innerWidth >= 800)
      (first = 5), (second = 9);
    if (window.innerWidth < 800 && window.innerWidth >= 500)
      (first = 4), (second = 7);
    if (window.innerWidth < 500) (first = 3), (second = 5);
  }

  if (width === 6) (first = 7), (second = 13);
  if (width === 5) (first = 6), (second = 11);
  if (width === 4) (first = 5), (second = 9);
  if (width === 3) (first = 4), (second = 7);
  if (width === 2) (first = 3), (second = 5);

  return {
    first,
    second,
  };
};

export const updateResizeArray = (
  allFilms: string[],
  first: number,
  second: number
) => {
  return [
    [...allFilms].slice(allFilms.length - first),
    [...allFilms].slice(0, second),
  ].flat();
};


