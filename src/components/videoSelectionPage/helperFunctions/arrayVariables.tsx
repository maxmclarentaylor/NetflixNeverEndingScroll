type backwardsVariablesObject = {
  newKeyBackPosition: number;
  removeKeyBackPosition: number;
  correctArrayLengthBack: number;
};

type forwardObjectVariables = {
  newKeyForward: number;
  removeKeyForward: number;
  correctArrayLength: number;
};

const findWidth = (width: number): number => {
  if (window.innerWidth > 1400) width = 6;
  if (window.innerWidth <= 1400 && window.innerWidth > 1100) width = 5;
  if (window.innerWidth < 1100 && window.innerWidth >= 800) width = 4;
  if (window.innerWidth < 800 && window.innerWidth >= 500) width = 3;
  if (window.innerWidth < 500) width = 2;
  return width;
};

export const forwardsVariables = (width: number): forwardObjectVariables => {
  if (width === 0) {
    width = findWidth(width);
  }
  let newKeyForward = width;
  let removeKeyForward = width + 1;
  let correctArrayLength = width * 3 + 2;

  return {
    newKeyForward,
    removeKeyForward,
    correctArrayLength,
  };
};

export const backwardsVariables = (width: number): backwardsVariablesObject => {
  if (width === 0) {
    width = findWidth(width);
  }

  let newKeyBackPosition = width;
  let removeKeyBackPosition = width * 2 + 2;
  let correctArrayLengthBack = width * 3 + 2;

  return {
    newKeyBackPosition,
    removeKeyBackPosition,
    correctArrayLengthBack,
  };
};
