import Image from "next/image";
import chevLeft from "../assets/chevron-left.png";
import styles from "../styles/videoOption.module.scss";
import { moveBack } from '../types/videoSelectionPageTypes'


export const MoveBack = ({testKey, clickForwards, clickbackwards, updateClickbackwards}: moveBack) => {
  return (
    <div
      data-testid={testKey + " " + "back"}
      onClick={() => {
        clickForwards > 0 ? updateClickbackwards(clickbackwards + 1) : null;
      }}
      className={`${styles.moveBackChevron}`}
    >
      <Image
        src={chevLeft}
        alt="Click back"
        fill={true}
        style={{ objectFit: "contain", opacity: clickForwards < 1 ? 0 : 1 }}
      />
    </div>
  );
};
