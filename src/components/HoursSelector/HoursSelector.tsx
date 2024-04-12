import React, { Fragment } from "react";
import classNames from "classnames";
import style from "./HoursSelector.module.scss";
import { motion } from "framer-motion";

export interface HoursSelectorProps {
  threshold: number;
}

const HoursSelector: React.FC<HoursSelectorProps> = (props) => {
  const { threshold } = props;
  const HOURS = 24;

  const getLabel = (hour: number) => {
    const sHour = `${hour}`;
    return hour === 0 ? `0${sHour}` : sHour;
  };

  return (
    <div className={classNames(style.watch)}>
      <motion.div
        className={classNames(style.selector, "position-absolute")}
        style={{
          width: `${(threshold * 100) / HOURS}%`,
        }}
      ></motion.div>
      <div className={classNames(style.breakLine)}></div>
      <div className={classNames(style.emptyWatch)}></div>
      {Array.from(new Array(HOURS)).map((_, index) => (
        <span
          key={index}
          className="position-absolute"
          style={{
            left: `calc(${Math.cos(
              -(((360 / HOURS) * index - 90) * (Math.PI / 180))
            )} * 45% - 30px + 50% + 20px)`,
            bottom: `calc(${Math.sin(
              -(((360 / HOURS) * index - 90) * (Math.PI / 180))
            )} * 45% - 30px + 50% + 20px)`,
            transform: `rotate(${
              ((360 / HOURS) * index - 90) * (Math.PI / 180)
            }rad)`,
          }}
        >
          <span></span>
        </span>
      ))}
      {Array.from(new Array(HOURS)).map((_, index) => {
        if ((index + 1) % 2 === 0) return <Fragment key={index}></Fragment>;
        return (
          <div key={index}>
            <label
              style={{
                left: `calc(${Math.cos(
                  -(((360 / HOURS) * index - 90) * (Math.PI / 180))
                )} * 35% - 30px + 50% + 20px)`,
                bottom: `calc(${Math.sin(
                  -(((360 / HOURS) * index - 90) * (Math.PI / 180))
                )} * 35% - 30px + 50% + 20px)`,
              }}
            >
              {getLabel(index)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default HoursSelector;
