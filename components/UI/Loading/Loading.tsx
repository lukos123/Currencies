"use client";
import { FC } from "react";
import classes from "./Loading.module.scss";
export enum variantColor {
  red = "red",
  green = "green",
  blue = "blue",
}
interface Props {
  color?: variantColor;
}
const Loading: FC<Props> = ({}) => {
  return (
    <div className={classes.Loading}>
      <div className={classes.circle}></div>
    </div>
  );
};

export default Loading;
