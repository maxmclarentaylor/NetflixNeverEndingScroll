import { Dispatch, SetStateAction} from "react";


export type IndividualFilm = {
  title: string;
  srcUrl: string;
};

export type VideoListType = {
  offSet: string;
  currentFilms: IndividualFilm[];
  carouselItem: string;
  animation: string;
  testKey: string;
};

export type VideoOptionType = {
  width: number;
  imageArray: IndividualFilm[];
  testKey: string;
};

export type ImageArrayType = {
    key: string;
    films: IndividualFilm[];
  };

  export type VideoPositionFlowType = {
  positionArray: {
    array: number[];
    position: number;
  };
};

export type throttleNumberObject = {
    [key: string]: number;
  };
  
  export type previousDirectionThrottleType = {
    [key: string]: string;
  };
  
  export type timeOutType = {
    [key: string]: ReturnType<typeof setTimeout>;
  };
  
  
 export type moveOptions = {
    currentFilms: IndividualFilm[];
    forwards: boolean;
    moveBackwards: boolean;
  };
  
  export type backwardsVariablesObject = {
    newKeyBackPosition: number;
    removeKeyBackPosition: number;
    correctArrayLengthBack: number;
  };
  
  export type forwardObjectVariables = {
    newKeyForward: number;
    removeKeyForward: number;
    correctArrayLength: number;
  };

  export type videoPositionViewArrayType = {
    array: number[];
    position: number;
  };
  

  export type moveBack = {
    testKey: string;
    clickForwards: number;
    clickbackwards: number;
    updateClickbackwards: Dispatch<SetStateAction<number>>
  }

  export type moveForwards = {
    testKey: string;
    clickForwards: number;
    updateClickForwards: Dispatch<SetStateAction<number>>
  }