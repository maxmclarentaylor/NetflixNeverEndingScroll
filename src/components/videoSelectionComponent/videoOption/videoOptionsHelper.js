const removeFilms = (value1, value2, currentFilms) => {
  let updateArray = [...currentFilms];
  updateArray.splice(value1, value2);
  return updateArray;
};

export const moveVideoBackwards = (allFilms, currentFilms) => {
  let key = allFilms.indexOf(currentFilms[0]);
  let newArray = [
    [...allFilms].slice(key - 5, key),
    ...removeFilms(12, 5, currentFilms),
  ].flat();
  if (newArray.length === 17) {
    return newArray;
  }

  let number = 17 - newArray.length;
  return [[...allFilms].slice(allFilms.length - number), ...newArray].flat();
};

export const moveVideoForwards = (allFilms, currentFilms) => {
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
