import classNames from "classnames";
import Link from "next/link";
import { TextGradient } from "./TextGradient";

export type TextSizes =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";
export type LogoProps = {
  headingSize?: TextSizes;
  sloganSize?: TextSizes;
  gap?: number;
};
export const Logo = ({ headingSize, sloganSize, gap = 2 }: LogoProps) => {
  return (
    <Link href="/">
      <div
        className={classNames(
          "flex flex-col items-center justify-center",
          `gap-${gap}`
        )}
      >
        <TextGradient
          className={classNames(
            "  font-raleway font-bold  ",
            headingSize ? `text-${headingSize}` : "text-5xl"
          )}
        >
          Remebr
        </TextGradient>

        <span
          className={classNames(
            "font-inter font-medium text-primaryDark",
            sloganSize ? `text-${sloganSize}` : "text-base"
          )}
        >
          SOMETHING
        </span>
      </div>
    </Link>
  );
};
