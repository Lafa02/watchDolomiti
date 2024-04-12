import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from "./style.module.scss";
import { useState } from "react";
import { ICoord } from "./interfaces";

const Watch = () => {
  const [startingPosition, setStartingPosition] = useState({ x: 0, y: 0 });
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartingPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setCenterPoint({
      x: e.currentTarget.offsetLeft + e.currentTarget.clientWidth / 2,
      y: e.currentTarget.offsetTop + e.currentTarget.clientHeight / 2,
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("test");
    const currentPosition = {
      x: e.clientX,
      y: e.clientY,
    };
    console.log(currentPosition);
    const sAngle = Math.atan2(
      startingPosition.y - centerPoint.y,
      startingPosition.x - centerPoint.x
    );
    const pAngle = Math.atan2(
      currentPosition.y - centerPoint.y,
      currentPosition.x - centerPoint.x
    );

    console.log(
      startingPosition.y - centerPoint.y,
      startingPosition.x - centerPoint.x
    );
    setAngle((oldAngle) => oldAngle + ((pAngle - sAngle) * 180) / Math.PI);
    setStartingPosition(currentPosition);
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDrag={handleDragEnter}
      draggable
      className={classNames(style.containerWatch)}
      style={{
        width: 240,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <CircularProgressbar value={4} maxValue={24} />
    </div>
  );
};

export default Watch;
