import Image from "next/image";
import chev from "../assets/chevron.png";
import styles from "../styles/videoOption.module.scss";
import { moveForwards } from "../types/videoSelectionPageTypes";

export const MoveForwards = ({
  testKey,
  clickForwards,
  updateClickForwards,
}: moveForwards) => {
  return (
    <div
      data-testid={testKey + " " + "forward"}
      className={`${styles.moveForwardsChevron}`}
      onClick={() => {
        updateClickForwards(clickForwards + 1);
      }}
    >
      <Image
        src={chev}
        alt="Click forward"
        fill={true}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};
