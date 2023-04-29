import { VideoPositionFlowType } from "../types/videoSelectionPageTypes";
import styles from "../styles/videoPositionFlow.module.scss";

export const VideoPositionFlow = ({ positionArray }: VideoPositionFlowType) => {
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
