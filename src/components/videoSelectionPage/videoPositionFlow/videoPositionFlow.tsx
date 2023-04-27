import styles from "../styles/videoPositionFlow.module.scss";

type VideoPositionFlow = {
  positionArray: {
    array: number[];
    position: number;
  };
};

export const VideoPositionFlow = ({ positionArray }: VideoPositionFlow) => {
  return (
    <div className={`${styles.positionArray}`}>
      {positionArray.array.map((value, index) => {
        return (
          <div
            key={value}
            className={`${
              index === positionArray?.position
                ? styles.videoOptionSelection
                : styles.videoOption
            }`}
          ></div>
        );
      })}
    </div>
  );
};
