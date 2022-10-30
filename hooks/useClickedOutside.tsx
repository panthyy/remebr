import { useEffect } from "react";

export const useClickedOutside = (ref: any, callback: any) => {
  // implement the callback function
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      console.log("clicked outside");
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
};
