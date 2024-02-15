import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export * from "./comment";
export * from "./event";
export * from "./post";
export * from "./user";
