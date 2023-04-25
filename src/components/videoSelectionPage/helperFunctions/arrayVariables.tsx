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
  if (window.innerWidth <= 1400 && window.innerWidth > 1100)
    width = 5;
  if (window.innerWidth < 1100 && window.innerWidth >= 800)
    width = 4;
  if (window.innerWidth < 800 && window.innerWidth >= 500)
    width = 3;
  if (window.innerWidth < 500) width = 2;
  return width
}

export const forwardsVariables = (width: number): forwardObjectVariables => {
  let newKeyForward = 0;
  let removeKeyForward = 0;
  let correctArrayLength = 0;
  if(width === 0){
    width = findWidth(width)
  }
  if (width === 6 || width === 0) {
    newKeyForward = 6;
    removeKeyForward = 7;
    correctArrayLength = 20;
  }
  if (width === 5) {
    newKeyForward = 5;
    removeKeyForward = 6;
    correctArrayLength = 17;
  }
  if (width === 4) {
    newKeyForward = 4;
    removeKeyForward = 5;
    correctArrayLength = 17;
  }

  return {
    newKeyForward,
    removeKeyForward,
    correctArrayLength,
  };
};

export const backwardsVariables = (width: number): backwardsVariablesObject => {
  let newKeyBackPosition = 0;
  let removeKeyBackPosition = 0;
  let correctArrayLengthBack = 0;
  if (width === 6 || width === 0) {
    newKeyBackPosition = 6;
    removeKeyBackPosition = 14;
    correctArrayLengthBack = 20;
  }
  if (width === 5) {
    newKeyBackPosition = 5;
    removeKeyBackPosition = 12;
    correctArrayLengthBack = 17;
  }

  return {
    newKeyBackPosition,
    removeKeyBackPosition,
    correctArrayLengthBack,
  };
};

