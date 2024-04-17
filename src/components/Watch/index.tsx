import classNames from "classnames";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import style from "./style.module.scss";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Watch = () => {
  const [startingPosition, setStartingPosition] = useState({ x: 0, y: 0 });
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: MouseEvent) => {
    if (!(e instanceof PointerEvent)) return;
    console.log(e);
    setStartingPosition({
      x: e.clientX,
      y: e.clientY,
    });
    if (!e.target) return;
    setCenterPoint({
      x: e.offsetX + (ref.current?.clientWidth || 0) / 2,
      y: e.offsetY + (ref.current?.clientHeight || 0) / 2,
    });
  };

  const handleDragEnter = (e: PointerEvent) => {
    e.preventDefault();
    const currentPosition = {
      x: e.offsetX,
      y: e.offsetY,
    };
    const sAngle = Math.atan2(
      startingPosition.y - centerPoint.y,
      startingPosition.x - centerPoint.x
    );
    const pAngle = Math.atan2(
      currentPosition.y - centerPoint.y,
      currentPosition.x - centerPoint.x
    );

    console.log(currentPosition, startingPosition);

    setAngle((ond) => ond + ((pAngle - sAngle) * 180) / Math.PI);
    setStartingPosition(currentPosition);
  };

  return (
    <motion.div
      drag
      ref={ref}
      animate={{
        rotate: `${angle}deg`,
      }}
      onDrag={(e) => handleDragEnter(e as PointerEvent)}
      onMouseMove={(e) => handleDragStart(e as unknown as MouseEvent)}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      className={classNames(style.containerWatch)}
    >
      <CircularProgressbar value={4} maxValue={24} />
    </motion.div>
  );
};

export default Watch;
