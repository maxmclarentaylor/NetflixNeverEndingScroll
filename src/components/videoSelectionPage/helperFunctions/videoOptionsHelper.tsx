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
  currentFilms: string[]
) => {
  let key = allFilms.indexOf(currentFilms[0]);
  let newArray = [
    [...allFilms].slice((key - 5 < 0 ? 0 : key - 5), key),
    ...removeFilms(12, 5, currentFilms),
  ].flat();

  if (newArray.length === 17) {
    return newArray;
  }

  let number = 17 - newArray.length;
  return [[...allFilms].slice(allFilms.length - number), ...newArray].flat();
};

export const moveVideoForwards = (
  allFilms: string[],
  currentFilms: string[]
) => {
  console.log("test 4")
  let key = allFilms.indexOf(currentFilms[currentFilms.length - 1]);
  let newArray = [
    ...removeFilms(0, 5, currentFilms),
    [...allFilms].slice(key + 1, key + 6),
  ].flat();

  if (newArray.length === 17) {
    return newArray;
  }

  let number = 17 - newArray.length;
  return [...newArray, [...allFilms].slice(0, number)].flat();
};

export const moveVideoFirstClick = (
  allFilms: string[],
  currentFilms: string[]
) => {
  console.log("test 5")
  return [allFilms[allFilms.length - 1], ...currentFilms];
};
