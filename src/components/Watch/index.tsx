import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from "./style.module.scss";
import { useMemo, useState } from "react";

const Watch = () => {
  const [startingPosition, setStartingPosition] = useState({ x: 0, y: 0 });
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const actualAngle = useMemo(() => Math.round(angle / 15) * 15, [angle]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const emptyImg = new Image();
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
    e.dataTransfer.dropEffect = "move";
    setIsDragging(true);
    setStartingPosition({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
    if (!e.currentTarget) return;
    setCenterPoint({
      x: e.currentTarget.offsetLeft + (e.currentTarget.clientWidth || 0) / 2,
      y: e.currentTarget.offsetTop + (e.currentTarget?.clientHeight || 0) / 2,
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.dropEffect = "move";
    if (
      isDragging &&
      e.nativeEvent.clientX !== 0 &&
      e.nativeEvent.clientY !== 0
    ) {
      const currentPosition = {
        x: e.nativeEvent.clientX,
        y: e.nativeEvent.clientY,
      };
      const sAngle = Math.atan2(
        startingPosition.y - centerPoint.y,
        startingPosition.x - centerPoint.x
      );
      const pAngle = Math.atan2(
        currentPosition.y - centerPoint.y,
        currentPosition.x - centerPoint.x
      );

      console.log(currentPosition);

      setAngle((ond) => ond + ((pAngle - sAngle) * 180) / Math.PI);
      setStartingPosition(currentPosition);
    }
  };

  return (
    <div
      draggable
      onDrag={(e) => handleDragEnter(e)}
      style={{
        transform: `rotate(${actualAngle}deg)`,
      }}
      onDragStart={(e) => handleDragStart(e as React.DragEvent<HTMLDivElement>)}
      className={classNames(style.containerWatch)}
    >
      <CircularProgressbar strokeWidth={13} value={4} maxValue={24} />
    </div>
  );
};

export default Watch;
