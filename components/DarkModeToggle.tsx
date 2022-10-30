import { useDarkMode } from "../hooks/useDarkMode";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
export const DarkModeToggle = () => {
  const { theme, toggle } = useDarkMode();
  return (
    <div onClick={toggle} className=" hover:cursor-pointer p-4 group">
      {theme === "light" ? (
        <BsMoonFill className=" text-primaryDarker group-hover:text-primaryDark" />
      ) : (
        <BsSunFill className=" text-primaryLightest group-hover:text-primaryDarkest" />
      )}
    </div>
  );
};
